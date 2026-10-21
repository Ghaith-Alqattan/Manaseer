"""Portrait start canvases for the mobile chain (pipeline §6b).
Each still's background is a soft navy gradient, not a flat colour, so pasting the still
onto a flat canvas would leave a visible rectangle. Instead: knock out the still's
border-connected background (the island and its contact shadow survive), then composite
the RGBA island onto a 1080x1920 canvas with a matching vertical gradient, island at
94% width, visual centre at 45% height. Output: world/stills/canvas_<id>.png
Run: python -I world/scripts/make_canvases.py
"""
import os
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
os.environ.setdefault("TOL", "60")  # gradient background needs a wider match than flat
import knockout  # noqa: E402  (vendored from the scroll-world skill)

STILLS = HERE.parent / "stills"
W, H = 1080, 1920
TOP, BOTTOM = (2, 12, 36), (6, 27, 60)  # sampled from the stills' top and bottom edges


def gradient():
    im = Image.new("RGB", (W, H))
    px = im.load()
    for y in range(H):
        t = y / (H - 1)
        c = tuple(round(TOP[i] + (BOTTOM[i] - TOP[i]) * t) for i in range(3))
        for x in range(W):
            px[x, y] = c
    return im


for n in ["rock", "mix", "field", "flow", "future"]:
    src = STILLS / f"still_{n}.png"
    rgba_path = STILLS / f"still_{n}.rgba.png"
    if not rgba_path.exists():
        knockout.knock(str(src), str(rgba_path))
    island = Image.open(rgba_path).convert("RGBA")
    scale = (W * 0.94) / island.width
    island = island.resize((round(island.width * scale), round(island.height * scale)), Image.LANCZOS)
    canvas = gradient().convert("RGBA")
    x = (W - island.width) // 2
    y = round(H * 0.45 - island.height / 2)
    canvas.alpha_composite(island, (x, y))
    out = STILLS / f"canvas_{n}.png"
    canvas.convert("RGB").save(out, optimize=True)
    print(n, island.size, "at", (x, y), "->", out.name, out.stat().st_size)

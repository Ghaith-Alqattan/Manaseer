"""Square material swatches for the sectors ledger, cropped from the rendered scene stills
so the sections below the world reuse the world's own imagery. Output: public/world/crops/.
Run: python -I world/scripts/make_crops.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "world" / "stills"
OUT = ROOT / "public" / "world" / "crops"
OUT.mkdir(parents=True, exist_ok=True)

# (sector slug, source still, crop box on the 2048x1360 still)
CROPS = [
    ("building-materials", "mix", (1380, 290, 1900, 810)),    # silos and preheater
    ("industrial-minerals", "rock", (1400, 180, 1900, 680)),  # furnace hall and stack
    ("life-sciences", "field", (520, 300, 1020, 800)),        # storage tanks
    ("energy-mobility", "flow", (800, 480, 1300, 980)),       # station canopy
    ("commercial-services", "flow", (330, 680, 830, 1180)),   # data centre and depot
    ("vision", "future", (820, 90, 1320, 590)),               # tower top and flag
]

for slug, still, box in CROPS:
    im = Image.open(SRC / f"still_{still}.png").convert("RGB").crop(box)
    im = im.resize((800, 800), Image.LANCZOS)
    im.save(OUT / f"{slug}.webp", "WEBP", quality=86, method=6)
    print(slug, im.size, (OUT / f"{slug}.webp").stat().st_size)

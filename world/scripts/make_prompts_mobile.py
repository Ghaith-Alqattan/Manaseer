"""Portrait (9:16) prompt variants for the mobile chain. Same scenes, same style tail, with
the portrait clause up front so the camera composes for a phone. Writes world/prompts/
dive_m_<id>.txt and conn_m_<i>.txt. Run: python -I world/scripts/make_prompts_mobile.py
"""
import importlib.util
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("mp", HERE / "make_prompts.py")
mp = importlib.util.module_from_spec(spec)
# make_prompts writes the landscape files on import; that is idempotent and harmless.
spec.loader.exec_module(mp)

OUT = HERE.parent / "prompts"
PORTRAIT = (
    "Vertical portrait composition, the scale-model island centered with generous deep navy "
    "space above and below it. "
)

for s in mp.SCENES:
    (OUT / f"dive_m_{s['id']}.txt").write_text(
        PORTRAIT
        + "Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole "
        f"scale model of {s['subject']} from outside like a tiny model. The camera slowly glides forward and "
        f"descends toward it, sweeping in toward {s['focal']}, as if flying inside. As the camera pushes in, "
        f"{s['open']}. {mp.STYLE_TAIL}. Smooth, graceful, slow motion, subtle parallax. "
        "No text, no captions.\n",
        encoding="utf-8",
    )

for i in range(len(mp.SCENES) - 1):
    a, b = mp.SCENES[i], mp.SCENES[i + 1]
    (OUT / f"conn_m_{i + 1}.txt").write_text(
        PORTRAIT
        + "Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of "
        f"the scale model of {a['subject'].split(',')[0]}, rising into the dark navy sky, then glides forward "
        f"across the connected miniature world of scale-model islands and arrives above the scale model of "
        f"{b['subject'].split(',')[0]}, beginning to descend toward it. One connected miniature model world, "
        f"seamless flowing aerial transition. {mp.STYLE_TAIL}. Smooth graceful slow motion. "
        "No text, no captions.\n",
        encoding="utf-8",
    )

print("wrote", sorted(p.name for p in OUT.glob("*_m_*.txt")))

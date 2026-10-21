"""Writes every scroll-world prompt file for the Manaseer build into world/prompts/.
The STYLE preamble is byte-identical across all stills: that is what makes one world.
Run: python -I world/scripts/make_prompts.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "prompts"
OUT.mkdir(parents=True, exist_ok=True)

PALETTE = (
    "limestone #E8E2D4, concrete #B8B4AC, brushed steel #9AA3AD, "
    "navy #2A3886, deep navy #00216A, cyan #00B7E5"
)

STYLE = (
    "Ultra-detailed architectural scale model of a single compact industrial site, a precision "
    "corporate maquette presented as a small floating island with a cleanly cut earth base, on a "
    "plain solid deep navy #03102E background with a soft contact shadow beneath it. High "
    "three-quarter aerial view, tilt-shift miniature depth of field. Materials: pale Jordanian "
    "limestone, raw concrete, brushed steel, matte navy and deep navy structures, thin cyan light "
    "accents, warm late-afternoon key light from the left, long soft shadows, faint volumetric "
    f"haze. Physically based studio render, cohesive color palette of {PALETTE}. Tiny scale-model "
    "figures and vehicles allowed. Highly detailed, centered composition with headroom, absolutely "
    "no text, no letters, no numbers, no logos, no signage."
)

STYLE_TAIL = (
    "Precision architectural scale model, tilt-shift miniature, warm late-afternoon light, "
    f"{PALETTE}, deep navy #03102E background"
)

SCENES = [
    {
        "id": "rock",
        "subject": (
            "a limestone quarry cut into terraced hills, white benches stepping down to a working floor, "
            "a crushing plant with hoppers and long conveyor belts feeding stockpiles of white aggregate, "
            "yellow haul trucks and an excavator on the ramps, a marble and granite stone yard with "
            "stacked slabs at one edge, and a small furnace hall with a tall stack where ore becomes steel"
        ),
        "focal": "the crushing plant and its conveyors at the quarry floor",
        "open": "the camera flies low across the quarry terraces toward the crushers",
    },
    {
        "id": "mix",
        "subject": (
            "a cement plant with a long horizontal rotary kiln, a cluster of tall concrete silos, a preheater "
            "tower, a ready-mix yard with a row of concrete mixer trucks queued under a loading hopper, "
            "and a precast hall with stacked concrete panels and beams in the foreground"
        ),
        "focal": "the mixer trucks loading under the hopper beside the silos",
        "open": "the roof of the precast hall gently lifts and opens away to reveal the casting floor inside",
    },
    {
        "id": "field",
        "subject": (
            "a fertilizer and chemicals plant with round storage tanks, pipework and a bagging warehouse, "
            "set beside neat irrigated green fields in long rows, two greenhouses with glass roofs, a "
            "distribution depot with a truck being loaded with white sacks, and a small canal with pivot irrigation"
        ),
        "focal": "the bagging warehouse where sacks are loaded onto the truck",
        "open": "the roof of the warehouse gently lifts and opens away to reveal the bagging line inside",
    },
    {
        "id": "flow",
        "subject": (
            "a highway interchange with sweeping ramps, a modern fuel station with a wide flat canopy over "
            "pumps and a convenience store beside it, tanker trucks and cars on the road, a machinery yard "
            "with wheel loaders and cranes, a logistics depot with parked trucks, and a small data centre "
            "block with cooling units on the roof"
        ),
        "focal": "the fuel station canopy and store at the heart of the interchange",
        "open": "the camera flies low along the highway toward the station canopy as the store roof gently lifts away to reveal the lit interior",
    },
    {
        "id": "future",
        "subject": (
            "a modern corporate headquarters tower in Amman: a tall glass office building wrapped in a white "
            "diagonal lattice of concrete braces forming a diamond grid across its facade, blue reflective "
            "glass behind the lattice, a landscaped plaza with a fountain and palm trees at its base, low "
            "limestone city buildings and a hill of the Amman skyline behind it, a flag on a tall pole"
        ),
        "focal": "the lattice facade and the entrance plaza of the tower",
        "open": "the camera glides up along the white lattice facade toward the entrance, rising past the braces as the glass reflects the sky",
    },
]

for s in SCENES:
    (OUT / f"still_{s['id']}.txt").write_text(
        f"{STYLE}\nSubject: {s['subject']}.\n", encoding="utf-8"
    )
    (OUT / f"dive_{s['id']}.txt").write_text(
        "Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole "
        f"scale model of {s['subject']} from outside like a tiny model. The camera slowly glides forward and "
        f"descends toward it, sweeping in toward {s['focal']}, as if flying inside. As the camera pushes in, "
        f"{s['open']}. {STYLE_TAIL}. Smooth, graceful, slow motion, subtle parallax. "
        "No text, no captions.\n",
        encoding="utf-8",
    )

for i in range(len(SCENES) - 1):
    a, b = SCENES[i], SCENES[i + 1]
    (OUT / f"conn_{i + 1}.txt").write_text(
        "Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of "
        f"the scale model of {a['subject'].split(',')[0]}, rising into the dark navy sky, then glides forward "
        f"across the connected miniature world of scale-model islands and arrives above the scale model of "
        f"{b['subject'].split(',')[0]}, beginning to descend toward it. One connected miniature model world, "
        f"seamless flowing aerial transition. {STYLE_TAIL}. Smooth graceful slow motion. "
        "No text, no captions.\n",
        encoding="utf-8",
    )

print("wrote", sorted(p.name for p in OUT.glob("*.txt")))

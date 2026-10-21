# Scroll-World Scenario — "Building the Future, from the ground up"

Status: RENDERED 2026-10-22 (five scenes, Kling 3.0 std, 1176x780 at 24 fps). Live at `/`.
Assets: `public/world/*.webp` (posters = each dive's frame 0) and `public/world/vid/*.mp4`
(5 dives of 10 s, 4 connectors of 5 s, crf 20, GOP 8, 46 MB total). Raw renders and seam
frames in `world/video/` (git-ignored). Seam QA: all four seams 26.7 to 37.9 dB (frame-locked).
Known character: Kling renders the connectors as the island transforming in place rather than
an aerial hop between two islands. Re-roll cost 7.5 credits each if a literal fly-over is wanted.

## The idea in one line
The visitor flies over a hyper-detailed **architectural scale model of Manaseer's Jordan**,
diving into one island per sector, from raw rock to the HQ in Amman. Scroll is the only
control. Six scenes, one continuous flight, no cuts.

## Why this art direction (3D Web Designer)
A $3B industrial group should not look like a toy. A clay diorama is charming but light;
pure photoreal makes the aerial "pull up and hop" camera read as a stutter. The middle
ground is the **corporate scale model**: the kind of precision maquette that sits in an HQ
lobby, in limestone, concrete, brushed steel and brand navy, lit like a product shot.
It is grounded in their world (engineers, master plans, construction), it hides AI
imperfections, it keeps all six scenes cohesive, and it justifies the god's-eye camera.

## Style preamble (reused verbatim in every prompt)
> Ultra-detailed architectural scale model, precision corporate maquette, viewed from a high
> three-quarter aerial angle with tilt-shift miniature depth of field. Materials: pale
> Jordanian limestone, raw concrete, brushed steel, matte navy (#2A3886) and deep navy
> (#00216A) structures, thin cyan (#00B7E5) light accents, warm late-afternoon key light from
> the left, long soft shadows, faint volumetric haze. Physically based studio rendering. On a
> plain solid deep-navy (#03102E) background with a soft contact shadow. No text, no letters,
> no logos, centered, 3:2.

## Camera (interview answer: "Fly through the world", architecture B)
Each scene: the camera starts high and outside the island, descends and flies inside toward
the focal point while the structure opens. Each connector: pull up and back out, rise, glide
over the model table, arrive above the next island and begin to descend. Seams are locked by
handing the actual rendered frames between clips.

## The journey (6 scenes = 6 dives + 5 connectors = 11 clips)

| # | Scene | What is in the model | Eyebrow | Headline | Body | Tags |
|---|---|---|---|---|---|---|
| 1 | **The Rock** | A limestone quarry cut into terraced hills, crushers, conveyor lines, haul trucks, white dust, a marble and granite yard at the edge | From the ground up | It starts in the rock. | Quarries, crushers and calcium carbonate: the raw material under every road and wall in Jordan. | Crushers, Marble & Granite, Calcium Carbonate |
| 2 | **The Mix** | A cement plant with a rotary kiln and tall silos, a ready-mix yard with mixer trucks lined up, a precast concrete hall | Building Materials | Cement, concrete, and the roads between. | The country's largest building-materials network, from kiln to pour. | Cement, ReadyMix, Concrete Products, Trust |
| 3 | **The Core** | A steel mill and magnesia works: glowing furnace hall, rolled coils, a copper mine terrace, rail sidings | Industrial Minerals | Minerals that move industry. | Steel, magnesia and copper: the heavy core of the group. | Steel, Magnesia, Copper Project, Afra Mining |
| 4 | **The Field** | A fertilizer and chemicals plant beside irrigated green fields, greenhouses, a distribution depot | Life Sciences | Feeding the land. | Where the group began in 1999: fertilizers and chemicals for Jordan's farms. | Fertilizers & Chemicals, Trade Supplier, MNS |
| 5 | **The Flow** | A highway interchange with a Manaseer fuel station canopy, a Lumi Market, tanker trucks, machinery yard, a small data centre block | Energy & Mobility | Keeping Jordan moving. | Fuel, retail, transport and IT: the services that connect every sector. | Oil & Gas, Lumi Market, Transport, IT |
| 6 | **The Future** | The HQ tower in Amman with its white diagonal-braced facade and blue glass (from their real photo), the 8th Circle skyline, a flag on the roofline | Vision | Building the Future. | 20+ companies, 10,000 people, USD 3 billion invested. "Our community deserves the best services and the highest quality of products." Eng. Ziad Al Manaseer, Chairman | CTA: Talk to us |

Scene 1 greets on landing; scene 6 holds the chairman quote and the CTA. Scenes 1 and 6
get extra scroll distance and a mid-scene linger; 2 to 5 stay brisk.

## Page chrome (UI/UX Designer)
- Dark page (`#03102E`) so the model islands float on the same navy as their background.
- Copy pinned bottom-left in Nexa, eyebrow in cyan, one line of Helvetica body, 3 tags.
- A thin route rail on the right: six dots, current scene highlighted, click to jump.
- Skip control and reduced-motion fallback: the six stills with the same copy.
- Header: white logo, "Sectors / At a glance / Contact". Persistent quiet "Order now" entry.

## Mobile
Rendered 2026-10-22 as a **native 9:16 chain** (`world/scripts/mobile.sh`): each still was
knocked out and recomposed on a 1080x1920 navy-gradient canvas (`make_canvases.py`), five
portrait dives at 5 s (7.5 credits each, to fit the balance) and four portrait connectors at
5 s, all Kling 3.0 std at 720x1280. Seam frames come from the portrait renders only. Encoded
720 wide, GOP 4, crf 23 as `public/world/vid/<scene>-m.mp4` with posters `<scene>-m.webp`
(each portrait dive's frame 0). The engine serves them on coarse-pointer or <=860 px viewports.

## Render plan and budget (Front-end Artist)

**Decision 2026-10-22: five scenes (rock, mix, field, flow, future), chain on Kling 3.0 std.**
Verified with `higgsfield generate cost` on the starter workspace (free estimates):

| Model | Clip | Credits | Note |
|---|---|---|---|
| gpt_image_2, 3:2, 2k, high | still | 6.5 | measured on the real job too |
| seedance_2_0_mini | any | not available | "Not found" on this account |
| seedance_2_0, 720p / 1080p, 8s | dive | 36 / 96 | too expensive here |
| kling3_0 std, 10s / 8s / 5s | dive / connector | 15 / 12 / 7.5 | 720p native, start+end image OK |
| kling3_0 pro / 4k | | 17.5 / 60 | rejected: needs a Pro plan |

Plan: 5 stills (32.5) + 5 dives at 10s (75) + 4 connectors at 5s (30) = **137.5 credits**,
leaving about 73 for re-rolls out of the 210.5 available after calibration.

1. Calibrate: the quarry still (done, 6.5) and one Kling std dive.
2. Stills: remaining four in parallel. Review for cohesion.
3. Dives: all five in parallel, extract first/last frames.
4. Connectors: four, from the rendered frames.
5. Encode (720p native, crf 20, GOP 8), QA seams, ship at `/world`.

## Open decisions
- Art direction: corporate scale model (recommended) vs photoreal cinematic vs clay diorama.
- Scene list and order above: edit freely.
- Desktop-only vs desktop + mobile.
- Previz on mini first (recommended) vs straight to 1080p.

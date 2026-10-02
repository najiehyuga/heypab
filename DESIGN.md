# Design Direction: HeyPab Streamer Hub (Spider-Man Edition)

## Identity & Concept
- **Product**: Single-page streamer hub and high-impact Saweria gateway for "HeyPab".
- **Audience**: Gaming community, live stream viewers, and comic/gaming fans.
- **Personality**: High-energy, cybernetic gaming aesthetic with an interactive playful Spider-Man web-swinging overlay.
- **Design Dials**:
  - `ENERGY`: 3 (Bold, vibrant esport atmosphere with comic cameo)
  - `RHYTHM`: 2 (Single-screen focal composition, zero unnecessary vertical sprawl)
  - `MOTION`: 3 (Active interactive canvas particles, pulsing cyber borders, physics-based swinging Spider-Man)

## Color System
- **Core Dark Neutral**: `#070a10` (Obsidian Void)
- **Card / Surface Dark**: `#0e1524` (Cyber Slate Surface)
- **Primary Gaming Accent**: `#00f2fe` / `#00c6ff` (High-voltage Cyan)
- **Secondary Gaming Accent**: `#7928ca` / `#ff0080` (Cyber Neon Violet & Pink accents)
- **Spider-Man Accents**: `#ef4444` (Hero Crimson), `#2563eb` (Web Blue), `#ffffff` (Web Line Glow)
- **Text Primary (Dark)**: `#f8fafc` (Ultra high contrast 14:1)
- **Text Secondary (Dark)**: `#94a3b8` (Muted cyan/slate 6.5:1)

## Purpose Test Justifications (antislop R-31)
- **Why borderless transparent PNG for profileku.png?** Respects the user's authentic character illustration, preserving full silhouette and transparent sticker aesthetics without artificial circular borders or clipping.
- **Why interactive logo toggle and effects on click?** Fulfills the user request for an interactive easter egg: visitors can click the mascot logo to swap between classic and Spider-Gamer expressions, accompanied by pop physics, sci-fi aura burst, comic badges, and synthesizer power-up audio.
- **Why assets/ folder for profile & logo?** Enables the owner to drop their own image files directly (`profileku.png`, `profile-alt.png`, and `saweria-logo.png`) without modifying any code, with instant preloading.
- **Why interactive Spider-Man overlay?** Explicitly requested by the user to bring playful, interactive life to the screen without obstructing the primary Saweria CTA.
- **Why direct Saweria button only?** Streamlines the user flow so visitors enter the Saweria page immediately in a single click to `https://saweria.co/heypablo`.
- **Why audio feedback?** Synthesizer web-shooter click and UI sounds provide tactile feedback.
- **Why no em dashes?** Strict R-02 compliance; all text utilizes commas, colons, or parentheses.

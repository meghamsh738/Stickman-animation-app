# Stickmotion Studio

Stickmotion Studio is a single-page stick figure animation lab built with vanilla JS, Canvas 2D, and hand-authored motion solvers. Mix curated character kits with easing-driven action templates, sculpt poses frame-by-frame, layer overlays, and export transparent PNG sequences for compositing.

## Features
- **Rig presets:** Seven figure kits (`figurePresets` in `app.js`) pair contrasting palettes with face sets, accessories, and staging defaults.
- **Motion library:** Action templates (walk, run, hero burst, stealth, etc.) procedurally solve joint motion using sinusoidal solvers for hips, limbs, and expressions.
- **Custom animator:** Enable the Stick Animator tab to scrub 48 frames, capture poses per joint, and blend manual keyframes with the active template.
- **Overlay lab:** Upload PNG/WEBP props, animate scale/position/rotation/opacity with optional keyframes, and keep everything wired into exports.
- **One-click export:** `Export PNG Sequence` renders 48 frames off-screen and zips them for downstream use in AE, Blender, or Unreal.

## Quick Start
1. Clone the repo and change into it.
   ```bash
   git clone git@github.com:meghamsh738/Stickman-animation-app.git
   cd Stickman-animation-app
   ```
2. Serve the static files (browsers block some APIs over `file://`):
   ```bash
   npx serve .
   # or: python -m http.server 4173
   ```
3. Open the served URL (default `http://localhost:3000` or `http://localhost:4173`) in a modern browser.

No build step is required; edits to `index.html`, `styles.css`, or `app.js` hot-reload as soon as you refresh the page.

## Using the App
- **Character Rig tab:** Choose a preset, switch expressions, recolor primary/accent channels, and tune speed, scale, and stroke thickness. Toggles enable glow, drop shadows, and accessories, while the backdrop selector swaps between grid, dusk gradient, void black, or storyboard paper.
- **Stick Animator tab:** Turn on manual framing to drag joints on the canvas, scrub frames, capture/clear keyframes, and play back custom motion on top of the solver output.
- **Overlay Lab tab:** Upload an image, adjust transform sliders, toggle per-parameter keyframes, and control overlay playback separate from the character animation.
- **Reset Scene / Export PNG Sequence:** Reset re-applies the default preset; export batches a transparent PNG stack (48 frames) and prompts for download. Ensure you run from a local server so the export is permitted.

## Project Layout
- `index.html` – Document skeleton, layout for the three control tabs, and export/reset buttons.
- `styles.css` – Visual system (Inter font, panel layout, tabs, badges, canvas stage styling).
- `app.js` – All application logic: presets, action solvers, custom animator state machine, overlay tooling, drawing + export pipeline.
- `AGENTS.md` – Repo guidelines and project conventions for future expansion to a larger TS-based stack.

## Next Steps
- Port the runtime into a TypeScript/Vite setup that mirrors the structure defined in `AGENTS.md`.
- Add tests around the motion solvers once the project adopts a bundler/test runner (`npm run test` scaffolding).
- Explore WebGL rendering for glow/shadow efficiency if export performance becomes a bottleneck.

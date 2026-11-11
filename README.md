# Alpine Ascents

A responsive single-page mountaineering information site built with React, Vite, CSS, and JavaScript.

The visual design uses a cinematic alpine photo opening, a deep evergreen/glacier palette with warm summit accents, grouped responsive navigation, refined section cards, and animated page details. Visitors can switch between dark and light themes; their selection is remembered in the browser.

## Install and run

1. Install Node.js 20 or newer.
2. Open a terminal in this project folder.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL shown in the terminal.
5. Run `npm run build` to create the production files in `dist/`.

The interactive map uses Leaflet and OpenStreetMap tiles, so it needs an internet connection. The browser asks for location permission only after a visitor presses **Show my location**. The visitor counter is stored in this browser and increases on every page load, including reloads.

See [Project_Report.md](docs/Project_Report.md), [test cases](docs/test-cases.csv), and the flow diagrams in `docs/` for the design, test data, and project notes.

## Assignment hand-in files

- `docs/Project_Report.md` — problem definition, design/implementation notes, requirement coverage, installation, assumptions, and limitations.
- `docs/user-flow.svg` and `docs/data-flow.svg` — project diagrams.
- `docs/test-cases.csv` — manual test data and expected results.
- `docs/DEMO-RECORDING.md` — short walkthrough and steps to record the required video clip.

The project was verified with a production build. The ZIP does not contain a demo recording; record it locally using the included guide. The visitor count is per browser and does not show a shared total across all visitors.

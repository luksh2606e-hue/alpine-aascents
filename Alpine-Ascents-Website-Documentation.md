# Alpine Ascents — Website Documentation

**Project:** Alpine Ascents mountaineering information website  
**Application type:** Responsive single-page React website  
**Last updated:** 11 November 2026

## 1. Overview

Alpine Ascents is an educational website introducing mountaineering, mountain environments, expedition history, climbing styles, preparation, hazards, and responsible travel. Visitors can explore the site through the navigation, browse an interactive map and photo gallery, and use a pre-trip checklist.

The design uses a cinematic mountain landing page, a deep evergreen default theme with warm summit accents, and a matching light theme. It adapts its navigation and content grids to smaller screens.

## 2. Visitor guide

### Navigation

- Use the visible header links to move to the home, learning, map, gallery, and guidelines sections.
- Choose **Explore** to access the other topics, including history, styles, techniques, shelter, safety, records, clubs, and expedition stories.
- Choose **Light mode** or **Dark mode** to change the theme. The site remembers the selection in that browser.
- On a narrow screen, open the menu button to see the navigation links.

### Main sections and features

- **Learning and history:** introductory mountaineering information and its development.
- **Styles and techniques:** hiking, trekking, alpine climbing, rock climbing, expedition climbing, planning, equipment, communication, and weather awareness.
- **Shelter and safety:** mountain shelter types and common hazards.
- **Map:** interactive map markers for notable peaks and mountaineering organizations. Select a peak marker or peak button to focus the map and see its details.
- **Share my location:** the map requests the browser’s location only after the visitor presses **Show my location**. If permission is granted, the map marks the location and the ticker shows approximate coordinates. The application does not save those coordinates.
- **Records and expedition stories:** selected mountaineering milestones and historical camp-based expeditions.
- **Gallery:** select a photograph to open it in a lightbox. Close it with the close button; the page behind the image remains fixed while it is open.
- **Video resource:** opens an external YouTube search for mountaineering documentaries. It requires internet access.
- **Updates and guidelines:** links to organizations for current information and a checklist visitors can tick while planning.
- **Moving ticker:** displays the device’s local date and time, location after consent, and a mountain-safety reminder.
- **Visitor count:** counts page loads in the current browser using local storage. It increases after each reload and is not a shared total across all visitors or devices. Clearing the browser’s site data resets it.

## 3. Technical overview

| Area | Implementation |
|---|---|
| UI | React components and JavaScript (ES modules) |
| Development server and production build | Vite |
| Styling | CSS, responsive media queries, CSS transitions and animations |
| Scroll effects | GSAP and ScrollTrigger |
| Interactive map | Leaflet with OpenStreetMap tiles and attribution |
| Visitor count and theme preference | Browser `localStorage` |
| Location | Browser Geolocation API, invoked after user action |
| Images and fonts | Remote Unsplash photography and Google Fonts |

The project has no server-side database, authentication, or private account data. Internet access is needed for map tiles, remote photos, and remote fonts. Geolocation generally requires HTTPS or localhost and the visitor’s permission.

## 4. Project structure

```text
alpine-ascents-react-gsap/
├── index.html
├── package.json
├── package-lock.json
├── src/
│   ├── main.jsx                   # React entry point
│   ├── App.jsx                    # Page composition and shared state
│   ├── data.js                    # Navigation, photography, and checklist data
│   ├── styles.css                 # Themes, layout, responsive styling
│   └── components/
│       ├── SiteHeader.jsx         # Navigation, theme control, visitor count
│       ├── Hero.jsx               # Landing section
│       ├── LearningSections.jsx   # Overview, history, styles
│       ├── MountainSkillsSections.jsx # Techniques, shelter, hazards
│       ├── MountainMap.jsx        # Peak/org map and location control
│       ├── CommunitySections.jsx  # Records, clubs, stories, gallery
│       ├── GuidelineSections.jsx  # Updates, checklist, closing section
│       ├── SiteFooter.jsx         # Footer, gallery lightbox, ticker
│       ├── LocalClock.jsx         # Local time display
│       ├── CurrentDate.jsx        # Local date display
│       └── VisitorCounter.jsx    # Browser-local page-load count
└── docs/                          # Reports, diagrams, test cases, guides
```

## 5. Install and run

### Requirements

- Node.js 20 or newer
- npm (included with Node.js)
- Internet connection for remote map tiles, images, and fonts

### Development mode

1. Extract the project archive and open the `alpine-ascents-react-gsap` folder in a terminal.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the local server:

   ```sh
   npm run dev
   ```

4. Open the local address printed by Vite, usually `http://localhost:5173/`.

Stop the local server with **Ctrl+C** in that terminal.

### Production build

Create an optimized production site:

```sh
npm run build
```

Vite writes the output to `dist/`. To preview that output locally:

```sh
npm run preview
```

For hosting services that build from the source repository, use `npm run build` as the build command and `dist` as the output/publish directory. Exact settings can vary by host. If publishing under a repository subpath, configure Vite’s `base` path for that subpath before building.

## 6. Maintenance notes

- Update text in the corresponding component under `src/components/`.
- Update navigation labels and destinations in `src/data.js` and `src/components/SiteHeader.jsx` together.
- Update peak markers in `src/components/MountainMap.jsx`; check coordinates and elevations against reliable sources before publishing.
- Keep map tile attribution visible when changing the map.
- The “latest developments” cards point to external organizations; they are not a live news feed. Review their information before presenting it as current.
- After changing source files, run `npm run build` before deploying.

## 7. Limitations

- The visitor counter is local to a browser, not a global audience counter.
- Map markers for organizations show city or regional locations, not verified street addresses.
- The displayed visitor location is approximate coordinates, not a place name.
- Remote imagery, map tiles, fonts, and the external video search may be unavailable offline.
- The site provides introductory information, not professional mountaineering, medical, weather, permit, or rescue advice.
- The build targets modern browsers; Internet Explorer is not supported.

## 8. Related project documents

- [Project report](Project_Report.md)
- [User-flow diagram](user-flow.svg)
- [Data-flow diagram](data-flow.svg)
- [Manual test cases](test-cases.csv)
- [Demo recording guide](DEMO-RECORDING.md)

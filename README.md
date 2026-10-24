# Santiago Jerald / 0xsan7

A static portfolio with a pitch-black default theme, warm light theme, an autumn animation, a native Mac-style dock, project folders, a contribution skyline and the `0xsan7` halftone footer. Project, research, leadership and contact content lives in `index.html`.

## Develop

Use Node.js 24 and Python 3:

```sh
npm ci
npm run build
npm run dev
```

Open the local HTTP preview at http://127.0.0.1:4174/. Use the local server for ES-module enhancements. Native content and normal links remain available without React. `npm test` runs the dock geometry and contribution calendar checks.

## Build and delivery

`scripts/build-skyline.mjs` checks in browser-ready ES modules, prerenders the dock SVGs and native button markup, and inlines primary CSS into `index.html`. Run `npm run build` after editing HTML, styles, TypeScript components or contribution data. Repeated builds do not duplicate markup.

- `css/style.css`, `styles/flow-button.css`, `styles/mac-os-dock.css`, `styles/glass-folder-cards.css` and `styles/fonts.css` provide primary styles.
- `styles/skyline.css` compiles the skyline's Tailwind styles into `css/skyline.generated.css`; this stylesheet loads near Activity.
- `js/main.js` handles the theme, clock, command menu, native buttons and banner playback.
- `js/portfolio-ui.tsx` is the small enhancement loader. `js/dock-native.ts` animates the already-rendered dock without React.
- `js/projects-entry.tsx`, `js/skyline-entry.tsx` and `js/footer-entry.tsx` load as their sections approach the viewport. Shared hashed chunks in `js/chunks/` keep one React runtime.
- `scripts/build.py` copies public HTML, compiled JS/CSS, assets and the frozen classic site into `dist/`.

The project already supports TypeScript, Tailwind with `sky:` utilities, shadcn-compatible aliases in `components.json`, and the `components/ui` directory. No replacement app or provider is required.

## Media and fonts

The banner uses the user-supplied autumn GIF converted to high-quality WebM/MP4, with a small WebP poster painted first. Playback starts after critical loading and pauses offscreen or in hidden tabs. Reduced-motion and save-data preferences retain the poster. The logo uses responsive 96/192px WebP files. No generative image assets are used.

The same Manrope, Sora and JetBrains Mono faces are self-hosted as Latin WOFF2 variable fonts in `assets/fonts/`, alongside their licenses. The heading and body faces are preloaded. No external font stylesheet or runtime font service is needed.

## Interactions

The dock reveals at the bottom desktop edge and remains visible on touchscreens. It supports Tab, Left/Right, Home/End, Escape and reduced motion. Native icon markup is rendered with the official `lucide-react` library at build time; reference links are in `design/dock-icons.md`. The original React dock component remains in `components/ui/mac-os-dock.tsx` for reuse.

Cmd/Ctrl+K opens the command menu. Arrow keys navigate, Enter selects, and Escape closes it. The theme button remembers the selected theme locally. The India clock pauses while the tab is hidden.

`components/ui/glass-folder-cards.tsx` adapts the supplied folder shape, hinge and file fan using existing project diagrams and real links. Descriptions, stacks and normal links remain visible. Closed folder links are inert; keyboard opening, Escape/outside close, touch and reduced motion are supported. Sample artwork generation, upload/add controls and sample menus are omitted.

`components/ui/halftone-wordmark-footer.tsx` sets the wordmark to `0xsan7`, retains the existing identity, copyright and back-to-top action, and follows the active theme. The full wordmark fits within the canvas. The canvas sleeps when idle, offscreen or hidden and respects reduced motion.

## Contributions and deployment

`data/github-contributions.json` is a validated snapshot of the public GitHub calendar. `npm run refresh:activity` fetches and rebuilds it manually. A failed or incomplete response does not publish fabricated data.

`.github/workflows/deploy.yml` fetches the calendar, builds, checks and deploys `dist/` on pushes to `main`, every hour at minute 17 UTC, and on manual dispatch. It creates no automated commits. GitHub may delay scheduled runs and disables public-repository schedules after 60 days without repository activity; re-enable the workflow in Actions if necessary. Failed refreshes or builds leave the last successful deployment live.

- Current portfolio: https://0xsan7.in/
- Original terminal portfolio: https://0xsan7.in/classic/
- Original source: branch `archive/portfolio-before-redesign-2026-10-23`, commit `b47d185`.

Keep `CNAME` set to `0xsan7.in`. GitHub Pages controls response cache lifetimes; hashed lazy chunks prevent mixing versions across deployments. The GitHub profile README is maintained separately in `0xsan7/0xsan7`.

Design reference and adaptation notes: `design/reference-adaptation.md`. Performance measurements: `design/performance-2026-10-25.md`.

# Santiago Jerald / 0xsan7

A static HTML portfolio with vanilla JavaScript controls and isolated React dock and contribution skyline components. A compact night-city masthead, framed cat avatar, dotted blueprint guides and a narrow reading column introduce the existing projects, research and leadership experience.

## Local preview

Run `python3 scripts/serve.py --port 4174`, then open http://127.0.0.1:4174/. Committed browser bundles also let the root page work directly from `index.html` or GitHub Pages. To edit the React component, run `npm ci` and `npm run build` first. `npm run dev` starts the same local server.

## Interface

The section navigation is a bottom Mac-style dock with eight monochrome Lucide icon tiles, cosine hover magnification, click bounce, tooltips and a scroll-synchronized active indicator. On desktop the dock stays hidden until the cursor reaches the bottom 12px of the viewport, and hides when the cursor leaves. Keyboard focus reveals it too; Escape releases focus and hides it. Touch devices keep the compact dock visible at the bottom, with safe-area spacing and room below the footer. The dock fits phones without magnification and respects reduced motion. Projects use two columns on desktop and one on mobile; all six project descriptions and links remain visible. Research and leadership use native expandable records, with the first entry in each section open initially. No portfolio content was removed or rewritten.

Use the command button or Cmd/Ctrl+K to search sections and copy the contact email. Arrow keys navigate the menu, Enter selects, and Escape closes it. The theme button switches between dark and light colors and remembers the choice locally. The banner clock displays the current time in India; it pauses while the tab is hidden. Reduced motion disables decorative hover movement. All content and normal links work without JavaScript.

`index.html` contains content, `css/style.css` contains the portfolio presentation, and `js/main.js` contains navigation and utility controls. The dock and skyline share one React runtime through `js/portfolio-ui.tsx`; the canvas initializes only when its section approaches the viewport. Its data is bundled locally; visitors make no contribution API requests. Google Fonts supplies Space Grotesk and JetBrains Mono, with system fallbacks. Photos use the supplied city and cat images; no generative image assets are used.

## Contribution skyline

The supplied component lives in `components/ui/contribution-skyline.tsx`; its example is in `components/ui/demo.tsx`, and the portfolio entry is `js/skyline-entry.tsx`. React and React DOM render the feature, with Lucide icons for its shared FlowButton component. No provider, image asset or Next.js installation is needed. The UI supports 2D/3D views, drag-to-orbit, double-click reset, day tooltips, arrow-key exploration, legend filters, the existing theme toggle and reduced motion. The extra statistic tiles are disabled to keep the section compact.

## Flow buttons

`components/ui/flow-button.tsx` provides the supplied arrow exchange and expanding circular fill, with default, compact, icon and color-swatch variants. `styles/flow-button.css` adapts it to the site's existing dark/light tokens and reduced-motion preference. Static buttons and action links get matching markup from `js/main.js`; native links, event handlers, IDs and accessible labels remain intact, without mounting a React root for each native control. The skyline uses the React component directly. Text, destinations and project data remain in the existing HTML. `components/ui/flow-button-demo.tsx` is the standalone example. No photo assets are required.

`data/github-contributions.json` is a dated snapshot parsed from the account's public GitHub calendar. No synthetic activity is shown. Run `npm run refresh:activity` to download a fresh public calendar, update its visible snapshot labels and rebuild. A failed or incomplete response leaves the existing data in place. This refresh needs network access but no GitHub token.

The TypeScript configuration supports the `@/` alias. `components.json` defines shadcn-compatible aliases and uses the standard `components/ui` directory so registry component imports have a consistent location. Tailwind CSS is configured in `styles/skyline.css`; utilities use the `sky:` prefix, and global preflight is excluded so the existing site styles stay intact. `lib/utils.ts` supplies the standard `cn` helper for future shadcn components. There is no need to scaffold a replacement app or run shadcn initialization over the existing site.

`npm run build:skyline` compiles the island with esbuild and Tailwind's direct compiler. Browser output is `js/portfolio-ui.generated.js` and `css/skyline.generated.css`. Regenerate these files after editing the TSX, stylesheet or data. `npm run check` checks TypeScript; `npm test` verifies calendar totals, date handling and the heatmap-to-skyline projection. React's partial-page mounting pattern is documented at https://react.dev/reference/react-dom/client/createRoot.

Design reference and reuse notes: `design/reference-adaptation.md`.

Run `npm run build` to check TypeScript, compile the skyline and refresh `dist/`. `python3 scripts/build.py` only copies already-built browser files. The root index and assets can also be served directly for local previews; production deployment uses the scheduled Pages workflow. The profile README in `github-profile/` is separate from this portfolio.

## Mac-style section dock

The component is `components/ui/mac-os-dock.tsx`, with pure sizing/magnification helpers in `lib/dock-math.ts`. `styles/mac-os-dock.css` uses the existing theme variables for a monochrome palette and amber active indicator. The `apps` prop supplies section IDs, labels and icon nodes; optional `onAppClick` and `openApps` props handle actions and active status. The portfolio keeps native anchor destinations and supports Tab, Left/Right, Home/End and Enter. Animations use an on-demand frame loop and stop when settled. Both dock and skyline share the compiled React bundle. No new dependency or image download is needed.

Icons were selected from the official Lucide catalog and imported from `lucide-react`. Source references are in `design/dock-icons.md`. No generated icons or stock photos are used.


## Published versions

- Current portfolio: https://0xsan7.in/
- Original terminal portfolio: https://0xsan7.in/classic/
- Original source snapshot: branch `archive/portfolio-before-redesign-2026-10-23` (commit `b47d185`).

GitHub Pages publishes the `dist/` artifact from `.github/workflows/deploy.yml` on each push to `main` and every hour (at minute 17 UTC). The workflow fetches the current public GitHub calendar before building, so the live graph updates without manual commits. GitHub may delay scheduled runs, and contributions must first appear in the public GitHub calendar. Scheduled workflows in public repositories can be disabled after 60 days without repository activity; re-enable this workflow in Actions if needed. Keep `CNAME` set to `0xsan7.in`. After editing the site, run `npm ci` if dependencies changed, then `npm run build`, and commit the source plus generated CSS/JS before pushing to `main`. Pages automatically republishes the domain after a successful deployment. The `classic/` directory is the frozen original portfolio.

The GitHub profile README is maintained separately in `0xsan7/0xsan7`.

The scheduled refresh does not create commits or inflate contribution counts. If fetching or validating GitHub data fails, deployment stops and the last successful website stays live. Run the workflow manually from Actions to request an immediate refresh.

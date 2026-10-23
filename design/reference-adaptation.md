# Blueprint portfolio adaptation

Reference reviewed: https://github.com/Ashutoshx7/Portfolio-v2- and https://www.ashutoshx7.me/ on 21 October 2026.

The source is a Next.js / React / Tailwind portfolio. Reviewed the main page, right navigation, command palette, project tiles, experience list, theme controls, banner particles and footer treatment. No license file was present in the reference checkout. No source components, images, personal content, audio or assets were copied.

The local implementation independently recreates the useful design patterns: a narrow reading column, photographic masthead, framed identity, dotted blueprint guides, desktop side index, compact project previews, collapsible experience records, keyboard navigation and light/dark colors. It uses the existing HTML/CSS/vanilla JS architecture and the user's existing city photo, cat logo and SVG diagrams.

Vengeance UI references reviewed:
- https://www.vengenceui.com/docs/cli
- https://www.vengenceui.com/docs/theming
- https://www.vengenceui.com/components/search-modal
- https://www.vengenceui.com/components/line-hover-link
- https://www.vengenceui.com/components/my-animated-button

Its CLI assumes a shadcn/React project. The search and theme patterns are implemented locally with a native dialog and CSS variables, without adding a runtime library. No CLI was installed.

All six project records, their order, descriptions, stacks, statuses and links are preserved. Research and leadership sentences are retained in native details elements. The NIT Goa and ACM records start expanded; every record can be opened by mouse, touch or keyboard. No social metrics, live GitHub feeds, analytics, sound engine, infinite particles, blog content or unverified claims were added.

The previous interface is backed up at `/private/tmp/portfolio-before-blueprint/` for this session.

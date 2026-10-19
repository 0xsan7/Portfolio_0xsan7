# 0xsan7 / Santiago Jerald

Local, buildless portfolio index. Semantic HTML, vanilla CSS and JavaScript.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory. Open http://127.0.0.1:4173.

## Interface

A 960px frame with a 260px sticky identity pane and a document-scroll specification pane. The sidebar scrolls independently if it exceeds the viewport. Mobile uses a single column. Project specifications are native HTML details elements and work without JavaScript. All seven specifications start open. Each row folds individually; the global control folds or unfolds all rows.

- `1`-`5`: jump to public repos, hardware, research, leadership, log
- `j` / `k`: next / previous section
- `e`: expand / collapse specifications
- `t`: dark / light theme, persisted in local storage
- `Tab`, `Enter`, `Space`: native link, button and disclosure controls

Edit `index.html` for content, `css/style.css` for layout, and `js/main.js` for controls. `projects.html` is a reference fragment; the live page is self-contained. Run `python3 scripts/build.py` to refresh `dist/`. No package installation required. Google Fonts supplies Silkscreen and IBM Plex Mono; monospace fallback works offline.

The repository contains the source files. The generated `dist/` folder is local build output and is not committed.

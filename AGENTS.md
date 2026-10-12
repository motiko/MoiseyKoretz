# Repository Guidelines

## Project Structure & Module Organization

This repository contains a Russian-language static site about Moisey Abramovich Koretz.

- `index.html`: biography, section navigation, and embedded homepage styles.
- `pages/`: individual letters, poems, historical documents, and collection indexes.
- `site.css`: shared styling for pages under `pages/`.
- `images/moisey.jpg` and `images/site/`: portrait and archival photographs or scans.
- `.nojekyll`: marker for serving static files without Jekyll processing.

There is no application framework, package manifest, build pipeline, or test directory.

## Build, Test, and Development Commands

Run commands from the repository root:

- `python3 -m http.server 8000 --bind 127.0.0.1`: serve the site locally; visit `http://127.0.0.1:8000/`. Stop with Ctrl+C.
- `git diff --check`: check pending changes for whitespace errors.
- `git diff --stat`: review the scope of changes before committing.

HTML and CSS are served directly; no compilation or dependency installation is required.

## Coding Style & Naming Conventions

Use UTF-8, HTML5, and `lang="ru"` for Russian pages. Follow the existing two-space indentation in HTML scaffolding and CSS declarations; avoid reformatting unrelated historical text. Keep semantic headings, descriptive titles, navigation labels, skip links, and visible keyboard focus.

Reuse existing classes and CSS custom properties. Homepage styles are embedded in `index.html`; interior pages link to `../site.css`. No formatter or linter is configured.

Preserve existing Cyrillic filenames and numbered series such as `pisma1.html` and `ufti1.html`. Use relative links appropriate to the current directory.

## Testing Guidelines

No automated test framework or coverage threshold is configured. Preview every changed page at desktop and mobile widths. Verify images, section navigation, footnote anchors and return links, and sequential letter or poem links. Check keyboard navigation and overflow, particularly for long text and scans.

## Commit & Pull Request Guidelines

Recent commits use short, imperative English descriptions, such as “Link each letter and each poem to the next one.” Keep commits focused on one content or presentation change.

In pull requests, describe the change, list affected pages, and report manual checks. Link an issue when applicable and include screenshots for visual changes.

## Historical Content

Preserve quotations, poem line breaks, names, dates, and source attribution. Support factual corrections with a source, and retain existing provenance links when editing transcriptions.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, hand-written HTML family archive about the physicist Моисей Абрамович Корец (1908–1984): biography, the 1935 and 1938 NKVD cases, letters from the camps, poems and the photographs. All content is in Russian (`lang="ru"`). The text was moved here from the family Google Site `sites.google.com/site/michaelkjerusalem`. The pages no longer carry a footer linking back to it.

The upstream repo is `michaelko58/MoiseyKoretz` (the family, who edit captions and text directly on GitHub); `origin` is the fork `motiko/MoiseyKoretz`. Sync with `gh repo sync motiko/MoiseyKoretz --branch main`, then send changes upstream as PRs from a branch on the fork.

There is no build step, package manager, linter or test suite. `.nojekyll` means GitHub Pages serves the files as they are. To preview locally:

```sh
python3 -m http.server 8000   # then open http://localhost:8000/
```

## Structure

- `index.html` is the biography page. It loads `site.css` and keeps only its own home-page rules in an inline `<style>`. Its biography text cites sources with `sup.fn` / `ol.refs` notes (`#ref-N` ↔ `#fn-N`). A note cited more than once gets extra back-links named `#ref-Nb`, `#ref-Nc`, labelled `*` and `**`.
- `pages/*.html` (about 130 files) all use one template: a `<meta name="description">`, `../site.css`, the same `<header>` with the brand and a ten-link `<nav>` (Жизнь, Дело 1935, Дело 1938, Письма, Хагода, Лирика, Фотографии, Воспоминания, Публикации, Документы) where the current section gets `aria-current="page"`, followed by a small inline script that keeps that link in view on phones; then `<main id="text" class="prose">` (`prose wide` on the photo page). There is no footer. The nav is copied into every page, so changing it means editing all of them (plus `index.html`).
- File names follow the old Google Sites slugs and are often Cyrillic (`дело1938года.html`, `письмовнуку.html`). Keep the existing names, including odd ones like `pisnma10.html` and `ugti*.html`, because other pages link to them.
- Section index pages: `1935.html` (lists `ufti*.html`), `дело1938года.html`, `письма.html` / `pisma_main.html` (list `pisma*.html`), `хагада.html`, `стихиразныхлет.html` (Лирика), `воспоминания.html`, `статьи.html` (Публикации), `документы.html`, `фотографии.html`. `стихи.html` still exists but is no longer in the menu.
- `images/site/` holds archive scans, numbered `0002.jpg`… for document pages plus named photographs. `images/moisey.jpg` is the portrait on the home page. Images carry `width`/`height` and `loading="lazy"`.

## Content conventions (classes in `site.css`)

- The "Дальше: …" links between letters and poems were removed on purpose; don't add them back. `p.continue` is now used only for a few "К оглавлению" / "К письмам" links at the end of a series.
- Scanned documents use `<article class="doc">` (an `h2` page label, a `figure` with the scan, and a `div.transcript` with `white-space: pre-wrap`). Add `p.shaky` above a transcript when the reading of the scan is uncertain.
- Other classes: `.verse` for poem lines, `p.item` / `p.toc` / `p.year` for lists and indexes, `p.intro` for italic editorial prefaces, and `a.fn` + `ol.footnotes` (with `a.back`) for footnotes on inner pages.
- Keep the original wording, spelling and punctuation of the transcribed texts. Edits are about structure, links and short editorial notes, not about correcting the sources.

## Commits

Commit messages are one plain English sentence ending in a period, describing the visible change (e.g. "Name Esther in the 1933 photograph caption.").

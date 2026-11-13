# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Russian-language family memorial site about Моисей Абрамович Корец (1908–1984): his life, letters, poems, case files and photos. It is built with Eleventy (11ty) into plain static HTML.

- `npm ci`: install.
- `npm run serve`: dev server with live reload at http://localhost:8080.
- `npm run build`: build into `_site/`.
- `npm test`: build, then run `scripts/check.mjs`. The check fails on:
  - a broken local link, image, `srcset` entry or `#anchor`;
  - an empty title or description;
  - a page not reachable by links from the home page (except `404.html`);
  - an inline `<script>` whose sha256 hash is missing from the Content-Security-Policy in `vercel.json`. If you edit the nav script in `base.njk`, put the new hash (printed by the failure) into `vercel.json`.

Deployment and previews:
- **Production and previews:** Vercel (`vercel.json`), connected to `motiko/MoiseyKoretz`. Vercel deploys `main` to production and builds a preview of every other branch and PR. `vercel.json` also sets the security headers (CSP and others) and cache headers. The dev server ignores them, so CSP problems only show on a Vercel deployment.
- **GitHub Pages (not in use yet):** `.github/workflows/deploy.yml` publishes to GitHub Pages, but only when it runs in `michaelko58/MoiseyKoretz`. That repo still serves the old hand-written site at https://michaelko58.github.io/MoiseyKoretz/.
- **PR checks:** `.github/workflows/build.yml` runs `npm test` on every PR.

## Structure

- `src/index.html` is the home page. `src/pages/*.html` holds every other page, flat. Each page is published at the same path without `src/`, e.g. `src/pages/камера104.html` → `pages/камера104.html`.
  - Filenames are Cyrillic titles with spaces and punctuation removed. Older ones are transliterated (`pisma1.html`, `ufti3.html`).
  - These filenames are public URLs: don't rename them.
- `src/_includes/base.njk` is the single layout. It holds:
  - the head, with the font preload, the canonical link, Open Graph tags and the home page's JSON-LD;
  - the skip link, header and nav;
  - the inline nav script.
- `src/_data/site.json` holds the production URL, used for canonical, Open Graph and sitemap URLs. `src/sitemap.njk` and `src/robots.njk` generate `sitemap.xml` and `robots.txt`.
- `src/404.html` is served by Vercel for unknown URLs. It is the only page with root-absolute links (`/pages/…`), because it can be served at any depth.
- `lib/` holds Eleventy plugins:
  - `responsive-images.js` turns the `<img>` tags on the home page and `фотографии.html` into resized WebP/JPEG copies in `_site/img/`, with `srcset`. Their links still point at the full scans in `images/`.
  - `site-urls.js` provides the `absoluteUrl` filter.
- `src/_data/nav.json` lists the six menu sections. A page's `section` key decides which menu item gets `aria-current="page"`.
- `src/pages/pages.11tydata.js` holds the defaults for every page under `pages/` (layout, relative paths, permalink).
- `src/_includes/styles/*.css` holds per-page CSS that is inlined into the page's `<style>` (`home.css`, `life.css`), selected by front matter `headStyle`.
- `site.css`, `favicon.svg`, `images/`, `fonts/` and `.nojekyll` stay at the repo root and are copied into `_site/` unchanged. `site.css` is the shared stylesheet, with colours as CSS variables on `:root`. Archive scans are numbered `images/site/NNNN.jpg`.
- Fonts are self-hosted: Literata and Cormorant Garamond, Cyrillic + Latin woff2 subsets in `fonts/`. Their `@font-face` rules are at the top of `site.css`, together with metric-matched fallback faces ("Literata Fallback", "Cormorant Garamond Fallback") that prevent layout shift when the fonts swap in. Every `font-family` stack names the fallback face right after the web font.

All links except those on the 404 page are relative (`../site.css`, `камера104.html`), so the site works both at a Vercel root and under `/MoiseyKoretz/` on GitHub Pages. Keep them relative. External links open in the same tab (no `target="_blank"`).

## A page

```html
---
title: "Камера 104"
description: "…"
section: "works"          # key from nav.json; leave out for pages not in a section (e.g. the 1935/1938 case files)
mainClass: "verse"        # verse | prose | prose wide
---

      <h1>Камера 104</h1>
<p class="verse">…</p>
```

- The body is the exact inner HTML of `<main>`. Title and description are stored already HTML-escaped and output as-is.
- **Page bodies are never run through a template engine** (`htmlTemplateEngine: false` in `eleventy.config.js`), so archive text containing `{{` or `{%` is safe. Template logic belongs in `.njk` layouts and includes.

Body conventions by `mainClass`:
- `verse` (poems): each line is its own `<p class="verse">`. A stanza break is `<p class="verse stanza">` or the separator `<p class="item" aria-hidden="true">-----</p>`. Optional lines are `p.dedicate` (dedication), `p.desc` (e.g. a «Музыкальное исполнение» YouTube link) and `p.year` (the date, at the bottom).
- `prose` (letters, essays, documents): `p.intro`, `p.toc`, footnotes (`a.fn` → `ol.footnotes` with `a.back`).
- Archive document pages (interrogations, case files) use `p.jump` page anchors, then one `<article class="doc" id="pNN">` per scanned page. Each article holds an `<h2>`, a `<figure>` with the scan and a `<div class="transcript">` with the verbatim typed transcription (`white-space: pre-wrap`). `.shaky` marks uncertain readings.

## Neighbour links

Pages in a sequence (poems in Творчество, letters, chapters) end with `<p class="continue neighbors"><a href="prev.html">Prev</a><a class="next" href="next.html">Next</a></p>`, written by hand in the body. When you remove, add or reorder a page, also fix the neighbour links on the pages before and after it. Also update the index page that lists it: `стихиразныхлет.html` (years as `h2.year`, poems in `ul.toc`), `pisma_main.html` for the letters, or `документы.html`. Letters also carry an «К оглавлению» link between prev and next.

The first image on a page should not be `loading="lazy"` and should have `fetchpriority="high"`. Later images stay lazy. Run `npm test` to catch broken or orphaned links.

## Content conventions

- The text is historical source material. Keep the original spelling, punctuation and typos in poems, letters and transcripts unless asked to correct them. Edits are usually small and targeted.
- Commit messages are one plain English sentence describing the content change, with Russian titles in «guillemets». For example: `Remove the stanza number from «Из Гейне».`

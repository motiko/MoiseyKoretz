# UX/UI Baseline Review — 2026-10-12

Reviewed commit `a3f1e45772b4a70c10a6cd0530a59886dd02c776`. At review start, `.codex/` and `AGENTS.md` were untracked; no tracked site changes were present. This is a sampled baseline, not a WCAG conformance audit. HTML, CSS, archival content, and AGENTS.md were left unchanged.

## Scope and methods

Used the Python local preview and a real Playwright browser: accessibility snapshot, actual Tab/Enter and link clicks, screenshots inspected visually, computed styles, element bounds, image loading, and color calculations. Sampled homepage, `pages/письма.html`, `pisma1.html`, long letter `pisma12.html`, collection `хагада.html`, poem `главаii.html`, gallery `фотографии.html`, document `ufti1.html`, and scan/transcription `допрос15июня1938года.html`.

All nine samples were measured at 1440×900, 768×900, 390×900, 320×900, and landscape 844×390 CSS viewports. Six representative samples additionally passed 720×450 reflow, equivalent to the CSS viewport of 1440×900 at 200% zoom. This is viewport simulation, not native browser zoom or real-device testing. Visual screenshots covered homepage desktop/mobile, long-letter desktop/mobile, poem mobile, gallery mobile, and scan mobile.

## Findings, in priority order

### 1. High — focused skip link obscured on narrow layouts

**Evidence:** `site.css:41`, `site.css:60`; duplicated in `index.html:52` and `index.html:71`. Load homepage at 320px and press Tab once. The focused skip link occupies y≈9.6–50.4px beneath the sticky header (y=0–51.6px, z-index 2). Its text/background are unreadable in the inspected screenshot; only the lower outline is apparent. Shared interior pages use the same stacking arrangement. At 1440px the skip link appears in the outer margin and is visible.

**Impact/correction:** Keyboard users cannot discover the shortcut reliably. Put the focused skip link above the header with an explicit higher stacking level, preferably fixed positioning; recheck mobile, tablet, scrolling, and enlarged views. [WCAG 2.2 focus-not-obscured guidance](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) is relevant. The translucent header complicates a categorical criterion-failure claim; the observed usability barrier is confirmed.

### 2. Medium — mobile navigation hides the focused final item

**Evidence:** `site.css:300`, `index.html:373`. At 320px on `pisma12.html`, Tab through the header to “Документы”. Its bounds are x≈299–384px while the navigation ends at x=304px. Scroll position remains 148.5px of a possible 248px; the remaining sliver falls inside the fade mask. The screenshot shows no readable focused label. Earlier items become visible as focus advances.

**Impact/correction:** Keyboard users lose their current location; touch users also have little indication that later sections exist. Prefer wrapping or a compact accessible menu. If retaining the strip, expose scrolling affordances, remove the fade while focus is inside, and ensure each focused item scrolls completely into view. Retest the first/last item and reverse Tab. Visible navigation targets measured 24.28px high, so small-looking links alone do not establish a [WCAG 2.5.8 failure](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html); roughly 40–44px touch targets remain a useful comfort improvement.

### 3. Medium — scans have no direct enlargement action

**Evidence:** `pages/допрос15июня1938года.html:34`, `pages/фотографии.html:46`. A 720px-wide document scan renders at 280px on the 320px viewport. It is not linked; the screenshot confirms tiny source text. Gallery document images are likewise plain images. Transcriptions help on the interrogation page, but the gallery’s leaflet/letter captions are not substitutes for their contents.

**Correction:** Link scans to their existing full-size image with a descriptive “Open full-size scan” action. Preserve transcriptions and source captions. Improve meaningful image descriptions where verified context is available; avoid inventing identities. This is a usability/content-access concern, not an asserted site-wide accessibility failure.

### 4. Low — symbolic footnote names in poem

**Evidence:** `pages/главаii.html:347` and `:449` expose `*)` as both the reference and return-link name, unlike the homepage’s descriptive labels.

**Correction:** Add names such as “Примечание 1” and “Вернуться к строке с примечанием 1”, preserving displayed archival marks. The round trip works: return reference lands at y≈71.8px below the 51.6px header with reduced motion enabled. This is a clarity improvement; assistive-technology behavior was not tested.

## Strengths and optional refinements

- No horizontal document overflow or measured content clipping across sampled sizes; all sampled images loaded and had alt attributes. Single main landmarks, Russian document language, and sensible heading structure were present.
- Cyrillic rendering and loaded Literata/Cormorant fonts look coherent with the archival tone. Body text is 17px with 1.65 leading; desktop prose width is comfortable. Retain these fonts and the paper/ink palette. For dense explanatory footnotes, optionally compare regular Literata with the current italic Cormorant for easier sustained reading; this is a preference, not a defect.
- Solid palette contrast ratios against paper: ink **14.98:1**, muted **6.69:1**, seal/focus **9.25:1**. These checks do not cover every alpha-blended/masked state.
- Homepage and poem footnote round trips, letter 12→13, and chapter II→III worked. Reduced-motion emulation changed smooth scrolling to `auto`. Most regular links have visible focus outlines.

## Limits

No screen reader, real touch device, alternate browser engine, actual zoom/text-only enlargement, axe/full automated accessibility scan, font-blocked fallback test, or exhaustive review of all pages/external links. Hebrew was not visually tested: source search found only a lone Hebrew character in `pisma5.html`, which should receive editorial review before any correction. Screenshots and browser diagnostics are temporary local outputs in `/var/folders/zl/gj59thw955n98yy6l4y7hlkr0000gq/T/moisey-ux-ui-review-kxgreayq/browser-evidence`; findings above are reproducible from the listed paths and steps. The review-owned preview server was stopped after completion.

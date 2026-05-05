# Design Upgrade Notes — May 2026 Pass

This pass took the dashboard from "polished report" to "dashboard you'd expect from a private-equity acquisitions desk." The structural and visual changes below are what changed and why.

## What was wrong before

1. **3251 Blackhawk Meadow was repeated four times** at the top of the page (one card per category it won). That made the most important property look like clutter instead of the obvious answer.
2. **"Why it wins" was process-flavored** — it leaned on what the system had done (owner confirmed, letter drafted) instead of explaining the acquisition logic.
3. **Visual feel was report-flavored** — even, calm, evenly weighted. A dashboard should have a dominant signal, supporting signals, and a clear visual hierarchy.
4. **Owner-record discipline was loose** — properties without confirmed owner-of-record were being implicitly treated as outreach-ready.
5. **Addresses were inconsistent** — some places had street only, some had city, no card had a map link.

## Structural changes

### One dominant winner, then everything else
- New `MULTI_WINNER` constant in `data.js` describes the single property that dominates the cycle, plus the categories it dominates as **badges** on a single card.
- New `SECONDARY_WINNERS` array contains only **unique** category winners (5505, 4319, 209 Still Creek, multifamily empty slot, 3409 removed). 3251 no longer appears in this grid at all.
- Above both, an `OPENING_STATEMENT` constant lands the headline in one bold sentence: *"The strongest signal this cycle is not listed inventory — it is a private-market owner target."*

### "Why it wins" rewritten as acquisition logic
Six numbered points, each leading with a short title and a one-line explanation:
1. Off-market advantage
2. Long-held / likely high-equity profile
3. Same-street renovated comp lane
4. Size-band fit
5. Premium repositioning potential
6. Actionability

Process-flavored content moved into a separate **System Readiness** panel on the right side of the winner card. Investment thesis leads; workflow status follows.

### "What still controls the deal" added
A new panel under System Readiness lists the five things that actually decide whether the deal works: acquisition price, interior condition, renovation budget, refreshed comp support, HOA/architectural constraints. This protects against the dashboard reading as overconfident.

### Owner-record discipline tightened
- 3251 → **confirmed** (Hegenbart Family Trust, mailing matches situs)
- 5505 → **confirmed** (listed seller)
- 4319 → **Owner Record Pull Required** (38-year hold strongly suggests original buyers, but not outreach-ready until pulled)
- 4157 → **Owner Record Pull Required** (22-year hold, same rule)
- 3409 → **removed** (March 2023 sale found in public record)
- 209 Still Creek → **listed** (routes through agent)

The `ownershipBlock()` renderer now treats `pull_required` as a distinct visual state with the explicit "Owner Record Pull Required" label — never "unknown," never "pending."

### Full addresses + map buttons everywhere
- Master `PROPS` catalog holds the full address (`street, city, state ZIP`) for every property, in one place.
- New `mapUrl(fullAddress)` helper generates a `https://www.google.com/maps/search/?api=1&query=...` URL.
- Every property card — winner, secondary, pipeline, public record, watchlist — renders a **View on Map** button using that helper. Single source of truth, no copy-paste address drift.

## Visual upgrades

### Winner card
- Two-column layout (`1.35fr / 1fr`) on desktop, stacked on mobile.
- Left column: cream/warm panel with radial-gradient background, a 4px gold-to-green left accent stripe, large serif address, category badges in cream pills with gold borders, and the six-point "Why it wins" list with serif numbered counters in deep green.
- Right column: dark-green panel with gold-dot bullets for System Readiness and What Controls the Deal — visually separates thesis (left) from operational status (right).
- Generous border radius and a soft, layered shadow so it reads as the centerpiece of the page.

### Secondary cards
- Responsive `auto-fit` grid; each card has a `data-accent` attribute (`watch`, `pull_required`, `empty`, `removed`) that drives a colored top bar.
- Status pill style varies by accent so the eye can scan the row in a second.

### Typography hierarchy
- Serif (Cormorant Garamond) for opening statement, hero title, winner address, section titles.
- Sans for body, labels, KPIs, charts.
- Opening statement uses a green drop-cap (`::first-letter`) so the eye lands there before anything else.

### Color palette
- Cream `#F8F1DD`, charcoal `#1F1F1F`, deep green `#243828`, accent green `#3F5C46`, warm gold `#C9A05A`, muted `#8E867A`.
- Charts use the same palette for cohesion (no Chart.js defaults bleeding through).

### Charts
- Tooltip styled to match the palette (deep-green background, gold border, cream body text).
- Five visualizations: opportunity ranking, hold time, 5505 price-cut trajectory, 3251 ARV comp scatter, pipeline status donut. The pipeline status donut now correctly reflects the new statuses (Top Target / Owner Record Pull Required / Listed Watchlist / Removed).

### Modal
- Draft outreach letter loads in a modal triggered by **View draft letter** buttons in two places on the winner card — keeps the letter accessible without forcing it onto the page.

## Mobile

- Hero compresses gracefully; subtitle and positioning stack.
- Winner card collapses to single-column with the dark-green panel beneath the thesis.
- KPI strip wraps to a 2-column grid.
- Chart canvases are wrapped in fixed-height containers (`chart-canvas-wrap`) so they don't collapse during reflow.
- Map buttons remain tap-targets sized for thumbs.

## Files changed in this pass

- `data.js` — added `OPENING_STATEMENT`, `MULTI_WINNER`, `SECONDARY_WINNERS`, `PROPS` master catalog with full addresses + owner status, `mapUrl()` helper, refreshed `BRAND` positioning lines.
- `index.html` — replaced top sections (`#hierarchy-grid`, `#top-target-card`, `#category-grid`) with `#opening-statement`, `#winner-card`, `#secondary-grid`. Added private-market intro section.
- `styles.css` — premium upgrade pass: `.winner-card`, `.winner-grid`, `.winner-left/.winner-right`, `.winner-badges`, `.why-list-num` (serif counters), `.readiness-list/.controls-list` (gold-dot bullets on dark-green), `.secondary-grid`, `.sec-card[data-accent]` variants, `.map-btn` family.
- `script.js` — new renderers for `#opening-statement`, `#winner-card`, `#secondary-grid`. `addressBlock()` and `ownershipBlock()` helpers handle the new owner-status states. All map buttons use `mapUrl()`.

## Follow-up pass — May 2026 (rebrand + 3409 cleanup + hero swap)

### Brand
- Renamed product everywhere from "AcquisitionOS Beta" / "ACQUISITIONOS BETA" to **"Acquisition OS"** (title case, with a space — never one word, never all-caps).
- Removed `text-transform: uppercase` from `.brand-product` so the brand always reads as written in the markup.
- Updated hero brand pill, footer brand, page `<title>`, meta description, Section 8 heading, Why-this-matters bullet, file headers in `data.js` / `script.js` / `styles.css`, and README brand block.

### New positioning line
Hero positioning now reads:
> "Acquisition OS scans for private-market acquisition signals — long-held owners, likely equity, pricing pressure, and off-market opportunities — then ranks them against your exit strategy before they ever hit the MLS."

This replaces the older "Your agent finds the listings…" line. The follow-on agent-split line and private-market intro line were also rewritten to match the new brand voice.

### 3409 removed from the top dashboard
- Dropped the "Removed / Corrected Lead" entry from `SECONDARY_WINNERS` in `data.js`.
- 3409 is preserved as a `removed` row in the **Pipeline** section (Section 3) and as a card in **Public Record Intelligence** (Section 5) — those serve as the lower-priority appendix-style location.
- Tightened spacing with `#secondary-winners { padding-bottom: 32px }` so the Executive Signal section flows in without an awkward gap from the missing 5th card.

### Hero image
- CSS `.hero-image` now uses a layered background that prefers `assets/hero-golf.jpg`, falls back to the older `assets/hero.jpg`, and finally falls back to a deep-green gradient if neither file is present — so the page never renders broken.
- Hero overlay re-tuned for a golden-hour image: lighter at the top (so the sky/sunset reads), only modestly darker through the middle, and a deeper dark-green wash at the bottom for text legibility. Adds a subtle radial vignette behind the brand text.
- Hero `aria-label` updated from "Aerial view of Blackhawk Country Club" to "Golden-hour view of a premium estate clubhouse and signature golf hole."

## Verification done

- `node -c data.js` and `node -c script.js` — both parse cleanly.
- Sandbox eval of `data.js` — all data shapes verified (3251 multi-winner, 4 categories, 6 whyItWins, 4 systemReadiness, 5 whatControlsTheDeal, 5 secondary winners, 3251 not duplicated in secondary, 5 pipeline rows, 2 pull_required).
- All 25 `getElementById`/`querySelector` ID references in `script.js` have matching `id="..."` anchors in `index.html`.
- All 6 properties in `PROPS` have full addresses with city/state/ZIP, all map URLs generate correctly.
- Local server at `http://127.0.0.1:8765` returns 200 for `index.html`, `data.js`, `script.js`, `styles.css`, `assets/hero.jpg`.

# Visual Polish Notes — Acquisition OS Dashboard

This pass treats the dashboard as a product, not a report. The goal was the "wow — this looks amazing" reaction. No data logic was changed. Everything below is art direction, layout rhythm, microinteractions, and typography.

## Hero

The hero now feels cinematic instead of "background image with text on it."

The image starts slightly zoomed (`scale(1.08)`) and slowly settles to `scale(1.02)` over 16 seconds — the page breathes when first painted. The overlay is a layered stack: a top-to-bottom gradient that keeps the sunset readable in the upper third and pulls down to deep dark green at the bottom for text contrast, a radial vignette anchored at the bottom, and a subtle dark-green wash behind the brand pill in the upper left so the badge always reads against bright sky. The brand pill itself got a glass treatment — `backdrop-filter: blur(18px) saturate(140%)`, a soft inset highlight, and a dark green tinted background — so it looks etched onto the photo rather than floating on top.

A new pulsing eyebrow above the hero title — "Private Market Radar · Active Scan" with a small gold dot that pulses every 2.4 seconds — establishes the page as a live system. The dot pulse honors `prefers-reduced-motion`. The hero title is bigger (`clamp(48px, 9vw, 108px)`), tighter letter-spacing, and a soft text shadow so it stays crisp against the photo. The gold rule under the title is now a gradient that fades to transparent rather than a hard line — feels less like a divider, more like a reveal.

## Above-the-fold impact

The opening statement is now framed as a product insight, not a paragraph. A "Top Signal · This cycle" pill sits above it with the same pulsing gold dot the hero uses, then a 60px serif statement with a deep-green drop-cap on the first letter. It looks like Apple's marketing pages where one big sentence carries the floor.

## Dominant winner card (3251)

This is the visual centerpiece. A floating "Multi-Category Winner" badge in deep green with a gold dot perches above the card, anchored at top-left — instantly tells you which card matters most without making you read. The card itself got a stronger shadow stack (`0 40px 100px -36px`) and a `translateY(-2px)` lift on hover. The left accent stripe is now a three-stop gradient (deep green → mid green → gold) so it reads as a brand mark, not a border.

The right-side dark-green panel has a radial gold glow in the upper-right corner, so the cream-on-the-left vs. green-on-the-right transition feels intentional and the green panel feels lit, not flat.

The "Why it wins" numbered list got a glow-up: each number is now a circular cream chip with a deep-gold numeral, not a bare counter. Reads like a checklist of acquisition logic, which is the point.

The buttons — "View on Map," "View Draft Letter," and the gold CTA — now have proper shadow + hover states. The draft letter button is dark charcoal with gold-cream type so it visually separates from the green-tinted map button.

## Secondary winner cards

Each card now has a horizontal gradient bar at the top instead of a hard 3px border — the gold fades to transparent so the card looks designed rather than tagged. Hover lifts each card 3px with a soft 18px-blur shadow. With 3409 removed, the four-card row reads tight and purposeful (5505 watch, 4319 pull-required, 209 Still Creek watch, multifamily empty slot).

## KPI strip

The charcoal background got a layered radial gradient stack — gold tint in the upper-left, green tint in the lower-right — so the strip reads as a tactile, lit surface rather than a flat black bar. KPI tiles now lift on hover and the left accent border brightens to gold. Numbers are larger, labels are slightly less ghosted.

## Charts

Each chart card is now a "module." Above the chart title, a small gold eyebrow reads "Module · Ranking" / "Module · Equity Signal" / etc., framing each chart as a discrete analytical tile rather than a generic bar chart. A thin gold-to-transparent accent runs across the top of every chart card.

Below each chart, a new italic serif insight caption tells you what the chart means in one sentence — taken from `CHART_INSIGHTS` in `data.js`. Examples:

- Ranking: *"3251 leads on a composite of off-market access, hold length, comp lane support, and size-band fit."*
- Hold time: *"The longer the hold, the higher the implied equity. 4319 (38 yr) and 3251 (26 yr) define the upper band this cycle."*

Chart.js styling is also softened — gridlines now `rgba(232, 224, 208, 0.55)` instead of the harder `#EFE6D3`, ticks are a more muted `#9C9388`, tooltips have a deeper `#1A2920` background with a 10px corner radius and 14px padding so they feel like product UI, not Chart.js defaults. Chart canvases got a bit taller (300px / 320px wide) for better readability.

## Action queue

This is the section that previously rendered as raw list text. It's now a stack of premium cards, each with a 40px circular numbered badge in a deep-green-to-mid-green gradient with an inset highlight and outer shadow. Hover slides each card 2px to the right and brightens the border to gold. The body text is more readable (14.5px charcoal on cream-gradient background).

**Note:** While doing this, I caught and fixed a longstanding bug — both the section wrapper and the `<ol>` element had `id="action-queue"`, which is invalid HTML and meant the renderer was appending list items to the section instead of the OL. None of the action-queue CSS had been applying. The section is now `id="action-queue-section"` so the OL keeps the canonical ID.

## Watchlist, pipeline, public record cards

All got hover lifts, slightly larger border radii, and refined transitions. Watchlist cards on the dark-green section now have a subtle gold radial glow in the upper-right corner.

## Why this matters

The closing serif quote got upgraded shadows and a 5px gold left border. List items have hover lifts.

## Microinteractions

Scroll reveal — every key block (opening statement, winner card, secondary cards, signal block, pipeline cards, chart cards, public record cards, watch cards, action queue items, why-list items, why-quote) fades up 18px with `cubic-bezier(0.22, 1, 0.36, 1)` over 700ms when it enters the viewport. Implemented via IntersectionObserver with a `-40px` rootMargin so animations fire just before the block fully enters frame. Honors `prefers-reduced-motion: reduce` — animations and the hero zoom both shut off cleanly.

Hover lifts on every interactive surface — secondary cards, chart cards, pipeline cards, public record cards, why-list items, watch cards, action queue items, KPI tiles. Button shadows scale on hover. Map buttons translate up 1-2px with a deeper shadow.

## Typography

Hero title pushed up to ~108px max with -1.2px tracking. Opening statement up to ~60px. Eyebrow labels got more letter-spacing (2.4–3px). Body line-heights tightened where dense text was floating, loosened where it was cramped. Serif (Cormorant Garamond) for headlines + opening statement + chart insights; sans (SF Pro Display fallback chain) for everything else.

## Color and texture

Same palette tokens as before (cream / charcoal / deep green / gold), but used more consciously. Subtle radial gradients on the winner card, KPI strip, watchlist cards, and dark green section panels — gives surfaces a sense of being lit. Soft gold-fade gradients on accent bars instead of hard borders. The hard `#EFE6D3` gridlines on charts are gone. Fewer harsh white blocks.

## Mobile

Hero shifts background-position to keep the golfer + clubhouse silhouette in frame on narrow widths. Hero eyebrow pill shrinks proportionally. Opening statement clamps to a tighter range (`clamp(26px, 7vw, 36px)`). Chart canvases drop to 240px tall on mobile so they don't get cramped. Action queue numbered badges shrink to 36px and pull in. Floating "Multi-Category Winner" badge shrinks and moves left. `html, body { overflow-x: hidden }` as a final guard against any rogue overflow.

## Polish Pass v4 — strip PDF DNA, productize the dashboard

This pass attacked the things that still made the page read as a "web version of a report" instead of a true product.

### Section labels gone
Every front-facing eyebrow that read "Section 1 · …" / "Section 3 · …" / etc. is now a clean module label: **Executive Signal · Ranked Pipeline · Signal Visualizations · Public Record Intelligence · Watchlist Triggers · System Action Queue · Why This Matters**. The broken numbering (which jumped from Section 1 to Section 3 because Section 2 had been removed earlier) is gone too. The same labels were updated in `script.js` comments so future edits stay consistent.

### Premium phrasing for subtitles and category labels
- "Other unique category winners this cycle" → **Active Signal Categories**
- "Every property the system surfaced or filtered this cycle, with current status and next system action." → **Current acquisition signals ranked by strength, readiness, and system action.**

### New Signal Summary command-center module (above the dominant winner)
Sits above the 3251 winner card as a four-tile premium grid — looks like a private-market command center, not a paragraph:

- **Strongest Signal** — 3251 Blackhawk Meadow Dr (deep-green-to-gold accent stripe)
- **Market Lane** — Off-market owner target
- **Why It Matters** — Not competing against MLS buyer traffic.
- **System Status** — Owner confirmed · Letter held for approval (gold-ready accent)

Each tile has a left accent stripe (gold by default; deep-green-to-gold gradient on the primary tile; gold-ready accent on the system-status tile), subtle radial gradient backgrounds, hover lift, and a refined eyebrow → serif value pattern. On mobile the grid collapses 4 → 2 → 1 cleanly.

### System Action Queue redesigned as workflow cards
The action queue used to render as raw list text. Now each item is a true card on a 2-column grid (1 column on mobile) with:
- 44px circular **numbered badge** (`01`–`09`) in deep-green-to-mid-green gradient with inset highlight and outer shadow
- bold **action title** ("Approval Gate," "Owner Record Pull · 4319 Quail Run Ln," "Price Monitor · 5505 Blackhawk Dr," etc.)
- one-line **detail body**
- right-side **status chip** with variant styling: "Awaiting approval" is green, "Pull required" is gold, "Watching" / "Routine" / "Standing rule" / "Scheduled" / "On advance" are quieter cream chips

Hover lifts each card 2px and brightens the border to gold. Underlying data shape changed from `string[]` to `{title, body, status}[]` in `data.js`, with backwards-compatible string handling in the renderer just in case.

### Vertical rhythm tightened
The flow signal-summary → dominant-winner → secondary-winners → executive-signal now reads as one coherent above-the-fold experience, not separate "pages" stacked on top of each other. Bottom padding on `#secondary-winners` dropped to 28px (mobile 20px); the next section's top padding is now 36px (mobile 28px). The dominant winner card section also tightened to 36px top/bottom from the section-tight default of 56px.

### 3409 stays low-priority
Verified absent from `#signal-summary-section`, `#dominant-winner`, and `#secondary-winners`. Still present in `#pipeline` (compact "removed" status row at the bottom) and `#public-record` as the appendix-style location.

### One structural fix found and shipped
Caught and fixed: the action-queue OL was being rendered as a `<div>` now (since each item is a self-contained card), so the `<ol>`/`<li>` semantics that no longer fit the design have been retired. The renderer now creates `.act-card` divs directly.

## QA

All checks done in jsdom against the actual rendered DOM:

- Brand renders exactly "Acquisition OS" in hero pill and footer; no "ACQUISITIONOS" or "AcquisitionOS" anywhere
- Hero eyebrow + opening eyebrow render with their pulsing gold dots
- Floating "Multi-Category Winner" badge renders above the dominant card
- All 5 chart cards have eyebrow labels and populated insight captions
- Scroll-reveal `.reveal` class is applied to opening-statement, winner-card-wrap, all 5 chart cards, all 9 action-queue items, all 8 why-list items
- Action-queue ID collision fixed; the 9 action items now correctly attach to the OL
- 3251 still the dominant winner with 4 category badges and 6 numbered acquisition-logic items
- Secondary grid still 4 cards (no 3409 in top dashboard)
- Owner Record Pull Required appears for 4319 and 4157
- All map URLs valid Google Maps URLs
- No "Multi-Exit Deal Finder" or "Pilot Opportunity Report" leakage
- Pipeline still 5 cards; action queue still 9 numbered items
- CSS includes hero-breathe, pulse-gold keyframes, reveal/is-visible classes, prefers-reduced-motion overrides, and `overflow-x: hidden` safety guard

Zero console errors or warnings on initial load.

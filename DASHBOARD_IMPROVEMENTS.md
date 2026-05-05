# How the Live Dashboard Improves on the PDF

The PDF version of the Pilot Opportunity Report served its purpose — a polished one-time deliverable Jeremy could text or email. The live dashboard takes the same content and turns it into something different: an actual tool.

## Concrete improvements

| | PDF report | Live dashboard |
|---|---|---|
| **Format** | Static document | Interactive, scrollable, mobile-friendly web app |
| **Skim time** | ~2 minutes to find the headline | Hero + KPI strip + Section 1 land the headline in ~10 seconds |
| **Charts** | Pre-rendered images (or skipped entirely) | Live Chart.js — 5 visualizations, hover tooltips, responsive sizing |
| **Draft letter** | Embedded as inline text | Modal with one-click "View draft letter" — easier to read in context, easier to share without exposing the entire report |
| **Updates between cycles** | Re-render the entire PDF (build script + WeasyPrint + cover regeneration) | Edit `data.js`; refresh the page — under 60 seconds |
| **Branding consistency** | Manual replacement across many files | Single `BRAND` constant in `data.js` |
| **Sharing** | Send a 250 KB attachment | Send a URL Jeremy can open on his phone, his agent's desk, or his laptop |
| **Watchlist triggers** | Documented in prose | Visually structured, scannable, ready to wire to live monitoring |
| **Public-record intelligence** | Buried mid-document | First-class section with per-property cards and a clear takeaway line |
| **Tone** | Memo-style | Tool-style — system-owned actions, approval gate, modal interactions |

## What this enables next

The dashboard is built to evolve from "static deliverable" to "live operational tool" without throwing away any of the design or data structure:

- **Weekly refresh.** Update `data.js` with the next scan's findings. Same URL, new content. Jeremy bookmarks once.
- **Multiple scan markets.** Add a market selector (Danville / Walnut Creek / Lafayette / Alamo / Scottsdale) — the same component grid handles each.
- **Watchlist automation.** Wire the trigger fields (`5505 ≤ ~$3.5M`, `209 Still Creek ≤ ~$2.9M`) to a price-monitoring service; the dashboard re-renders when triggers fire.
- **Outreach state.** Track which letters have been sent vs. drafted; expose the response status; surface follow-ups due.
- **Tracker integration.** Pull the Property Tracker spreadsheet rows into the dashboard automatically (or vice versa) so there's a single source of truth.
- **Permission-gated views.** Jeremy and his agent could see different subsets — e.g., agent gets the listed-inventory side, Jeremy gets the off-market lane.
- **Audit log.** Every system action and approval gate could be logged and surfaced as a tab — when did this move from "letter drafted" to "letter sent" to "owner responded"?

None of those require rewriting the dashboard. They add layers on top of the existing structure.

## What stays the same

The dashboard intentionally inherits the standards from the report:

- All Jeremy-facing copy is system-owned. Nothing reads as a task for him.
- Watchlist items use the standard "System Watchlist — no immediate action" framing.
- No "Needs Verification" / "Verify before scoring" / "Portal is interactive" language anywhere.
- No internal jargon ("Hard Filter Flag," "tracker disposition") in front-facing copy.
- The email-first owner letter is the default outreach format.
- The approval gate is preserved: "Outreach letter prepared and held until Jeremy approves. Nothing goes out without sign-off."

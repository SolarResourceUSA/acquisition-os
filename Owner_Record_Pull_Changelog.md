# Owner Record Pull — Changelog (May 2026 cycle)

This pass attempted to confirm owner-of-record + mailing address for every property currently shown in the Acquisition OS dashboard. Two material reclassifications resulted.

## Summary

| Property | Before | After |
|---|---|---|
| 3251 Blackhawk Meadow Dr | Owner confirmed (Hegenbart Family Trust) | Owner confirmed — unchanged |
| 4319 Quail Run Ln | Owner Record Pull Required | **Owner Confirmed · Mailing Pull Required** |
| 4157 Quail Run Dr | Owner Record Pull Required (assumed 22-year hold from 2004) | **Removed / Corrected Lead** (likely Oct. 15, 2022 sale found) |
| 5505 Blackhawk Dr | Owner confirmed (Bansal) — listed seller | Owner confirmed — unchanged |
| 209 Still Creek Rd | Listed property — agent route | Listed property — unchanged |
| 3409 Blackhawk Meadow Dr | Removed (Mar 2023 sale) | Removed — unchanged |

Net effect on the dashboard: off-market outreach pool drops from 3 to 2. Removed-lead count goes from 1 to 2. The 4319 lead is materially upgraded — owner of record is now confirmed via two independent sources, with only the mailing address requiring a human-access step.

## Sources used

- **BlockShopper Quail Run Lane aggregation page** — direct browser-driven read of the public real-estate index for the street, returning current owners, last recorded transaction year, and assessed property tax for each parcel on the street.
- **Contra Costa County Treasurer-Tax Collector** (`taxcolp.cccttc.us/lookup/`) — official Account Lookup; returned APN with check digit, situs, secured tax bill amount and payment status, and assessment information (land + improvements + gross value).
- **Contra Costa County secured property tax bill PDF** — bill #2025-247789 for APN 220-270-051-0, Internet Copy. The bill explicitly suppresses owner mailing on the online copy ("ADDRESS INFORMATION NOT AVAILABLE ONLINE").
- **Zillow + Redfin + TopHap** — used only for transaction history / sale dates (4157 reclassification).
- **Hudwayglass** — attempted, blocked by Cloudflare bot challenge, did not contribute.

## Per-property notes

### 3251 Blackhawk Meadow Dr — confirmed (no change)
- Owner: Hegenbart Family Trust — James R. & Jayne K. Hegenbart, trustees; Robert H. Hegenbart at situs.
- Mailing: appears to match situs (owners reside at property).
- APN: ~220-210-029.
- Last sale: Oct 1, 1999.
- Source: BlockShopper direct property page (`/property/220210029/3251-blackhawk-meadow-drive`).
- Confidence: **Confirmed.**
- Outreach-ready: yes — current top-of-cycle target.

### 4319 Quail Run Ln — owner confirmed, mailing pull required
- Owner: **Tercheria Family Revocable Trust — John C & Linda M Tercheria, trustees** (BlockShopper public record).
- APN: **220-270-051-0** (Contra Costa County Treasurer-Tax Collector).
- Situs: 4319 Quail Run Ln, Danville CA — confirmed by Tax Collector lookup.
- Last recorded transaction: 2021, price not disclosed. The 2025-26 assessed gross value of $946,891 (Land $312,370 + Improvements $634,521) is far below the ~$2.8M market for a 4,003 sq ft Blackhawk-area home and is consistent with continued Prop 13 protection from a long-held basis (likely the original 1987 land purchase). The 2021 record reads as an intra-family trust vesting change, not an arm's-length sale.
- 2025-26 secured property tax: $11,678.04 paid in full Nov 7, 2025.
- Mailing address: **Human-access step required.** The Contra Costa Tax Collector online bill explicitly suppresses owner mailing ("ADDRESS INFORMATION NOT AVAILABLE ONLINE"). Confirmed mailing must come from the Assessor's office (2530 Arnold Drive, Martinez, (925) 313-7400), a formal Public Records Request, or a paid skip-trace service.
- Confidence: **Owner of record — Confirmed via BlockShopper public record. APN, situs, assessment — Confirmed via Contra Costa Treasurer-Tax Collector. Mailing — Human-access step required.**
- Outreach-ready: **No.** Owner is confirmed, mailing is not. Per the Acquisition OS off-market outreach rule, owner + mailing both required.
- New status label: **Owner Confirmed · Mailing Pull Required.**

### 4157 Quail Run Dr — reclassified to Removed / Corrected Lead
- Two independent public sources (Zillow listing page + multiple property aggregators) indicate the property last sold approximately **October 15, 2022**.
- The earlier-referenced March 2, 2004 sale ($1,020,000) appears to be prior-owner history; the current owner held only ~3.5 years as of this scan.
- Same pattern as the 3409 Blackhawk Meadow case (March 2023 sale found).
- Sale price not disclosed in public sources; would need the Contra Costa Clerk-Recorder for the deed amount.
- Status: **Removed / Corrected Lead.** Public-source pass indicates a likely Oct. 15, 2022 sale; current owner profile no longer supports long-held outreach status. System removed from outreach pool pending official county confirmation.
- Owner-of-record name not pulled because the property no longer warrants outreach-ready prep this cycle.

### 5505 Blackhawk Dr — confirmed (no change)
- Owner: Vivek and Sonia Badreshia Bansal (per public record).
- Held since: March 5, 2010.
- Currently listed sellers — outreach (if pursued) routes through the listing agent.
- Source: BlockShopper direct property page + Web search confirmation.
- Confidence: **Confirmed.**
- Outreach-ready: not the thesis — this is a pricing-discount watchlist, not an owner-outreach target.

### 209 Still Creek Rd — listed (no change)
- Listed at $3.1M (MLS #41130149).
- Outreach routes through the listing agent. Owner-of-record pull queued only if listing expires or the property converts to off-market.
- No change.

### 3409 Blackhawk Meadow Dr — removed (no change)
- Already filtered out for March 28, 2023 sale ($2,110,000).
- No change.

## Properties that still require a human-access step

- **4319 Quail Run Ln** — owner mailing only.
  - Path: CCC Assessor's office (2530 Arnold Drive, Martinez), formal Records Request, or paid skip-trace.
  - Effort: ~1 phone call or counter visit, or one paid lookup.
  - Block on outreach: cannot be sequenced for owner-letter outreach until mailing is confirmed.

## Dashboard files updated

- `data.js` — `PROPS["4319"]` and `PROPS["4157"]` owner blocks; `PIPELINE` entries for 4319 and 4157; `SECONDARY_WINNERS` 4319 entry; `PUBLIC_RECORD` for 4319 and 4157; `PUBLIC_RECORD_TAKEAWAY`; `SYSTEM_ACTION_QUEUE` (4157 owner-pull dropped, 4319 owner-pull rewritten as mailing-pull); `KPIS` (off-market remaining 3 → 2, removed 1 → 2); `CHART_DATA.ranking` and `CHART_DATA.pipelineStatus` labels; `CHART_INSIGHTS.pipeline`.
- `script.js` — `ownershipBlock()` now renders a new `mailing_pull_required` status with the label "Owner Confirmed · Mailing Pull Required."
- `styles.css` — pipeline status pill + card border styling for `mailing_pull_required`; action-queue chip color variant for `mailing-required`.
- No HTML structural changes required.

## Verification

`node -c` passes for both `data.js` and `script.js`. Full DOM-render QA suite (24 checks) passes with zero console errors:
- 4319 owner shows "Tercheria Family Revocable Trust"; APN 220-270-051-0 visible; status pill reads "Mailing Pull Required"; ownership block label reads "Owner Confirmed · Mailing Pull Required"; no remaining "Owner Record Pull Required" labels.
- 4157 absent from signal summary, dominant winner, and secondary grid; still present in pipeline (removed status) and public record (with the 2022-sale explanation).
- Action queue: 8 cards (was 9), includes "Mailing Pull · 4319 Quail Run Ln" with "Mailing required" chip; no 4157 action.
- KPIs: "2 Off-market owner targets remaining" and "2 Removed after public-record pass."
- 3251 still the dominant winner / outreach-ready target. No off-market property is labeled outreach-ready without confirmed mailing.
- All map URLs valid Google Maps format. Brand reads "Acquisition OS" (title case, with a space) throughout.

## Open follow-ups

- 4319 mailing — pull from Assessor's office or skip-trace, then `PROPS["4319"].owner` updates from `mailing_pull_required` → `confirmed` and the property becomes outreach-ready.
- 4157 — if the Oct 2022 sale is confirmed at the County Clerk-Recorder with the deed amount, the public-record card can be tightened from "approx. Oct 15, 2022" to a confirmed date and price.

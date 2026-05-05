// Acquisition OS — Private Market Radar
// Danville / Blackhawk Deal Signal — May 2026 Pilot Scan
// Static dataset for the dashboard. Edit this file to update the report.

const BRAND = {
  product: "Acquisition OS",
  module: "Private Market Radar",
  scan: "Danville / Blackhawk Deal Signal",
  cycle: "May 2026 Pilot Scan",
  positioning:
    "Acquisition OS scans for private-market acquisition signals — long-held owners, likely equity, pricing pressure, and off-market opportunities — then ranks them against your exit strategy before they ever hit the MLS.",
  privateMarketIntro:
    "Listed homes are only one side of the market. Acquisition OS surfaces the private-market layer — owners, hold time, equity clues, permit signals, price pressure, and watchlist triggers that usually do not show up in a standard MLS search.",
  agentSplit:
    "The agent handles the listed inventory. Acquisition OS tracks the hidden signal layer.",
};

const CITY_STATE_ZIP = "Danville, CA 94506";

// Helper: build a Google Maps search URL for a full address.
function mapUrl(fullAddress) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(fullAddress);
}

// Master property catalog — full addresses + owner records.
// Used everywhere a property appears so addresses, map links, and owner data stay in sync.
const PROPS = {
  "3251": {
    street: "3251 Blackhawk Meadow Dr",
    city: CITY_STATE_ZIP,
    full: "3251 Blackhawk Meadow Dr, Danville, CA 94506",
    owner: {
      name: "James R. & Jayne K. Hegenbart, trustees (Hegenbart Family Trust)",
      detail: "Robert H. Hegenbart also appears at the property address.",
      mailing: "Mailing equals situs — owners reside at the property",
      mailingMatches: true,
      heldSince: "October 1999",
      lastSale: "Oct 1, 1999",
      lastSalePrice: null,
      apn: "~220-210-029",
      status: "confirmed",
    },
    contact: {
      path: "Email / phone lookup queued",
      confidence: "Confirmed",
    },
  },
  "4319": {
    street: "4319 Quail Run Ln",
    city: CITY_STATE_ZIP,
    full: "4319 Quail Run Ln, Danville, CA 94506",
    owner: {
      name: "Tercheria Family Revocable Trust — John C & Linda M Tercheria, trustees",
      detail: "Owner of record confirmed via BlockShopper public record. APN, situs, and 2025-26 secured tax bill confirmed via Contra Costa County Treasurer-Tax Collector. Most recent recorded transaction is dated 2021 with no disclosed price; the assessed gross value of $946,891 is well below ~$2.8M market, consistent with continued Prop 13 protection from a long-held basis (likely original land purchase June 12, 1987 for $485,000). The 2021 record reads as an intra-family trust vesting change rather than an arm's-length sale.",
      mailing: "Human-access step required — Contra Costa Tax Collector online bill explicitly suppresses owner mailing (\"ADDRESS INFORMATION NOT AVAILABLE ONLINE\"); confirmed mailing must come from the Assessor's office, a formal Records Request, or a paid skip-trace service.",
      mailingMatches: null,
      heldSince: "June 1987 (original land purchase) · 2021 trust vesting change",
      lastSale: "Recorded 2021 (price not disclosed; likely intra-family trust vesting change)",
      lastSalePrice: null,
      apn: "220-270-051-0",
      status: "mailing_pull_required",
    },
    contact: {
      path: "Owner confirmed · mailing / phone lookup required",
      confidence: "Not contact-ready",
    },
  },
  "4157": {
    street: "4157 Quail Run Dr",
    city: CITY_STATE_ZIP,
    full: "4157 Quail Run Dr, Danville, CA 94506",
    owner: {
      name: "Owner since approx. October 2022 (~3-year hold)",
      detail: "Public-source pass (Zillow + multiple aggregators) indicates a likely Oct. 15, 2022 sale; current owner profile no longer supports long-held outreach status. The earlier-referenced March 2004 sale appears to be prior-owner history. System removed from outreach pool pending official county confirmation.",
      mailing: "Owner record pull queued (lower priority — removed lead)",
      mailingMatches: null,
      heldSince: "October 2022",
      lastSale: "approx. Oct 15, 2022",
      lastSalePrice: null,
      apn: "Pending county/recorder pull",
      status: "removed",
    },
    contact: {
      path: "No safe contact path yet",
      confidence: "Not contact-ready",
    },
  },
  "5505": {
    street: "5505 Blackhawk Dr",
    city: CITY_STATE_ZIP,
    full: "5505 Blackhawk Dr, Danville, CA 94506",
    owner: {
      name: "Vivek & Sonia Bansal (per public records)",
      detail: "Owners since March 2010 (16-year hold). They are the sellers, not long-held outreach targets.",
      mailing: "Listed seller; agent contact via MLS",
      mailingMatches: null,
      heldSince: "March 2010",
      lastSale: "Mar 5, 2010",
      lastSalePrice: null,
      apn: "Pending county/recorder pull",
      status: "confirmed",
    },
    contact: {
      path: "Listed agent",
      agentName: "Jeffrey Klaus",
      agentBrokerage: "Blue Sky Realty",
      agentMLS: "SR24251570",
      agentPhone: "Phone pull queued",
      confidence: "Confirmed",
    },
  },
  "3409": {
    street: "3409 Blackhawk Meadow Dr",
    city: CITY_STATE_ZIP,
    full: "3409 Blackhawk Meadow Dr, Danville, CA 94506",
    owner: {
      name: "Owner since March 28, 2023 (~3-year hold)",
      detail: "Public-record pass found this property was sold March 28, 2023 for $2,110,000. The earlier-referenced 2002 sale was the prior-prior owner. Removed from long-held outreach list this cycle.",
      mailing: "Owner record pull queued (lower priority — removed lead)",
      mailingMatches: null,
      heldSince: "March 2023",
      lastSale: "Mar 28, 2023",
      lastSalePrice: 2110000,
      apn: "Pending county/recorder pull",
      status: "removed",
    },
    contact: {
      path: "No safe contact path yet",
      confidence: "Not contact-ready",
    },
  },
  "209StillCreek": {
    street: "209 Still Creek Rd",
    city: CITY_STATE_ZIP,
    full: "209 Still Creek Rd, Danville, CA 94506",
    owner: {
      name: "Listed property — agent contact via MLS",
      detail: "Currently listed; outreach (if pursued) routes through the listing agent, not direct-to-owner. Owner-of-record pull queued only if the listing expires or the property converts to off-market.",
      mailing: "Routes through listing agent while listed",
      mailingMatches: null,
      heldSince: null,
      lastSale: null,
      lastSalePrice: null,
      apn: "Pending county/recorder pull",
      status: "listed",
    },
    contact: {
      path: "Listed agent",
      agentMLS: "41130149",
      agentNote: "Agent name not confirmed · MLS 41130149 · Phone pull queued",
      confidence: "Confirmed",
    },
  },
};

// Top-of-page hierarchy — Best Signal Hierarchy (5 items).
// Designed to make the report obvious in under 30 seconds.
const TOP_HIERARCHY = [
  {
    rank: "01",
    label: "Best Overall Signal",
    propKey: "3251",
    summary: "26-year trust ownership in gated Blackhawk; same-street comps document a real ARV lane. Letter drafted, awaiting approval.",
    accent: "primary",
  },
  {
    rank: "02",
    label: "Best Owner Outreach Target",
    propKey: "3251",
    summary: "Same property — longest-relevant hold this cycle. Email-first introduction held for sign-off.",
  },
  {
    rank: "03",
    label: "Best Listed Watchlist",
    propKey: "5505",
    summary: "$6.25M → $4.1065M (~$2.14M / 34% cumulative cuts). Pricing-discount play, not a renovation candidate.",
  },
  {
    rank: "04",
    label: "Best High-Equity Signal",
    propKey: "4319",
    summary: "Original land purchase June 12, 1987 ($485K); 38-year owner-built hold — the strongest equity signal this cycle. Owner-of-record + mailing confirmation required before this property can be labeled outreach-ready.",
    accent: "pull_required",
  },
  {
    rank: "05",
    label: "Removed / Corrected Lead",
    propKey: "3409",
    summary: "Public-record pass found a March 28, 2023 sale. Current owner held only ~3 years — not a long-held target. Filtered out this cycle.",
    accent: "removed",
  },
];

const KPIS = [
  { value: "67", label: "Active SFR listings scanned (94506)" },
  { value: "10", label: "Blackhawk listings checked" },
  { value: "5", label: "Active listings reviewed deeper" },
  { value: "2", label: "Off-market owner targets remaining" },
  { value: "1", label: "Top target" },
  { value: "1", label: "Listed watchlist candidate" },
  { value: "2", label: "Removed after public-record pass" },
];

const EXECUTIVE_SIGNAL = {
  headline:
    "The system did not find a clean listed buy-box candidate at current prices. The strongest lane this cycle is off-market — long-held Blackhawk-area owners with ownership, location, and comp signals worth respectful outreach.",
};

// Bold opening statement that frames the dashboard in one line.
const OPENING_STATEMENT =
  "The strongest signal this cycle is not listed inventory — it is a private-market owner target.";

// MULTI-WINNER — 3251 won 4 categories. We surface the property once as a dominant card
// and tag the categories it dominates as badges, rather than repeating it 4x in a grid.
const MULTI_WINNER = {
  propKey: "3251",
  cycleLabel: "Best Overall Signal · This cycle's multi-category winner",
  winningCategories: [
    "Best Overall Opportunity",
    "Best Off-Market Outreach Target",
    "Best Direct-Owner Letter Candidate",
    "Best Premium Repositioning Candidate",
  ],
  oneLine: "26-year trust ownership in gated Blackhawk, sitting on a documented same-street renovated comp lane.",
  whyItWins: [
    {
      title: "Off-market advantage",
      body: "This is not a listed MLS opportunity, so Jeremy is not competing against normal buyer traffic yet."
    },
    {
      title: "Long-held / likely high-equity profile",
      body: "26-year same-owner trust ownership suggests a potentially lower-basis, higher-equity owner profile than a recent purchase. Strong ownership signal — not a statement about owner motivation or financing availability."
    },
    {
      title: "Same-street renovated comp lane",
      body: "Recent renovated sales on Blackhawk Meadow Dr support a real ARV lane: 3421 Blackhawk Meadow Dr at ~$655/sf and 3312 Blackhawk Meadow Dr at ~$722/sf."
    },
    {
      title: "Size-band fit",
      body: "At 3,473 sq ft, the home sits in a more manageable and liquid resale size band than very large 8,000+ sq ft Blackhawk homes. May reduce both renovation exposure and resale-buyer-pool risk."
    },
    {
      title: "Premium repositioning potential",
      body: "Built in 1985 and held long-term, the property warrants a renovation-scope check. If condition is under-modernized and acquisition basis is reasonable, the same-street comp lane suggests potential cosmetic repositioning upside."
    },
    {
      title: "Actionability",
      body: "Owner/trustee and mailing profile are confirmed, so the system can prepare a controlled email-first outreach test without guessing who to contact. Actionability factor — not the main investment thesis."
    },
  ],
  systemReadiness: [
    "Owner/trustee profile confirmed (Hegenbart Family Trust)",
    "Mailing appears to match situs (owners reside at property)",
    "Draft email-first letter prepared and held for approval",
    "CCC permit detail pending human-access / formal Records Request path if lead advances",
  ],
  whatControlsTheDeal: [
    "Acquisition price",
    "Actual interior condition",
    "Renovation budget",
    "Refreshed comp support",
    "HOA / architectural constraints",
  ],
};


const TOP_TARGET = {
  propKey: "3251",
  pills: ["Off-market", "Top target", "26 years held"],
  stats: [
    { label: "Sq ft", value: "3,473" },
    { label: "Lot", value: "0.22 ac" },
    { label: "Beds / baths", value: "3 / 4" },
    { label: "Year built", value: "1985" },
    { label: "APN (approx.)", value: "220-210-029" },
    { label: "Last sale", value: "Oct 1, 1999" },
  ],
  thesis:
    "Same-street comp lane is documented and recent. 3421 Blackhawk Meadow Dr sold renovated at ~$655/sf in April 2026; 3312 Blackhawk Meadow Dr at ~$722/sf same month. Subject sits cleanly between them by size. The build year and ownership profile warrant a renovation-scope check — actual interior condition still needs to be confirmed through photos, permits, drive-by, or owner response. The system has not assumed the interior state.",
  systemStatus:
    "Profile and ownership confirmed. Official Contra Costa County permit detail pending human-access step at the CCC ePermits Center, or a formal CCC Records Request submission.",
  nextSystemAction:
    "Hold draft outreach letter for approval. Refresh Blackhawk Meadow comp lane. Pursue CCC permit detail through human-access or formal Records Request if the lead advances.",
  approvalGate: "Outreach letter prepared and held until Jeremy approves. Nothing goes out without sign-off.",
};

const DRAFT_LETTER = {
  title: "Email-first introduction — held for approval",
  body: [
    "[Date]",
    "Dear Trustee of the Hegenbart Family Trust,",
    "My name is [Jeremy], and I'm writing about your home at 3251 Blackhawk Meadow Drive.",
    "I'm a private buyer who works in the Danville and Blackhawk area, and I wanted to reach out personally to introduce myself. I came across the property through public records research and noticed your family has owned it for more than 25 years, which usually means there is a meaningful history with the home.",
    "I'm simply reaching out to respectfully inquire whether there has ever been, or may ever be, a scenario where selling could make sense for your family.",
    "If so, email is the easiest way to reach me. There is absolutely no pressure to respond — I simply wanted to introduce myself and let you know that your home stood out as one I'd be grateful to learn more about if selling ever became a consideration.",
    "Thank you for your time.",
    "Sincerely,\n[Jeremy]\n[Email]\n[Phone]",
  ],
  note:
    "Email-first by design. The first contact's only job is to introduce a credible buyer respectfully — not to close, not to imply distress, not to create pressure.",
};

const SECONDARY_WINNERS = [
  {
    category: "Best Listed Watchlist Candidate",
    propKey: "5505",
    why: "Major price pressure: original $6.25M → current $4.1065M (~$2.14M / 34% cumulative cuts).",
    systemStatus: "System Watchlist — monitor price trigger.",
    nextAction: "Re-run numbers if list drops to ~$3.5M or another 10% cut.",
    accent: "watch",
  },
  {
    category: "Best High-Equity / Long-Held Signal",
    propKey: "4319",
    why: "Owner of record confirmed (Tercheria Family Revocable Trust). APN 220-270-051-0. Assessed value $946,891 vs. ~$2.8M market is consistent with Prop 13 protection from the original 1987 land basis — strong implied equity signal.",
    systemStatus: "Owner Confirmed · Mailing Pull Required — not outreach-ready until mailing is confirmed.",
    nextAction: "Pull owner mailing via Assessor / formal Records Request / skip-trace.",
    accent: "pull_required",
  },
  {
    category: "Best Multi-Exit / ADU / Expansion Candidate",
    propKey: "209StillCreek",
    why: "Best lot/sq-ft profile of the listed cohort: 4,189 sq ft on 0.46 ac with 3-car garage. Possible conversion / expansion signal.",
    systemStatus: "System Watchlist — currently above buy-box threshold.",
    nextAction: "Monitor price trigger around $2.9M; add to next-cycle ADU feasibility scan.",
    accent: "watch",
  },
  {
    category: "Best Multifamily Income Candidate",
    propKey: null,
    propLabel: "No clean candidate this cycle",
    why: "System continues scanning. Walnut Creek 2–4 unit multifamily on next scan rotation.",
    systemStatus: "Open category.",
    nextAction: "Add Walnut Creek 2–4 unit MF to next scan rotation.",
    accent: "empty",
    empty: true,
  },
];

const PIPELINE = [
  {
    rank: "1",
    propKey: "3251",
    statusLabel: "Top Target",
    statusType: "primary",
    type: "Long-held owner outreach target / Premium Repositioning",
    keySignal:
      "26-year trust ownership; same-street comp lane (3421 Blackhawk Meadow Dr ~$655/sf, 3312 Blackhawk Meadow Dr ~$722/sf).",
    profile: "1985 · 3,473 sq ft · 0.22 ac · 3 bd / 4 ba · APN ~220-210-029",
    systemAction:
      "Hold letter for approval. Refresh comp lane. Pursue CCC permit detail if lead advances.",
  },
  {
    rank: "2",
    propKey: "4319",
    statusLabel: "Owner Confirmed · Mailing Pull Required",
    statusType: "mailing_pull_required",
    type: "High-equity / long-held signal — owner confirmed, awaiting mailing",
    keySignal:
      "Owner of record confirmed (Tercheria Family Revocable Trust). APN 220-270-051-0 confirmed. Assessed gross value $946,891 vs. ~$2.8M market consistent with Prop 13 protection from the 1987 land basis. 4,003 sq ft owner-built home (1988).",
    profile: "1988 · 4,003 sq ft · 4 bd / 3 ba · 8,970 sf lot · APN 220-270-051-0",
    systemAction:
      "Pull owner mailing via Assessor / formal Records Request / skip-trace service before sequencing outreach. Pursue CCC permit detail in parallel.",
  },
  {
    rank: "—",
    propKey: "5505",
    statusLabel: "Listed Watchlist",
    statusType: "watch",
    type: "Pricing-discount play (NOT a renovation candidate)",
    keySignal:
      "List dropped from $6.25M to $4.1065M (~$2.14M / 34% cumulative cuts). Built 2007. 8 permits including roof-mounted solar PV and minor recent repairs — actively maintained.",
    profile: "2007 · 8,039 sq ft · 5 bd / 6 ba · 0.66 ac",
    systemAction:
      "Monitor price trigger; re-run numbers if list ≤ ~$3.5M OR another ≥10% cut.",
  },
  {
    rank: "—",
    propKey: "209StillCreek",
    statusLabel: "System Watchlist",
    statusType: "watch",
    type: "Multi-Exit / ADU / Expansion Candidate",
    keySignal:
      "4,189 sq ft on 0.46 ac with 3-car garage; possible conversion / expansion signal. Best lot/sq-ft profile of the listed cohort.",
    profile: "4,189 sq ft · 0.46 ac · 3-car garage · Currently listed",
    systemAction:
      "Monitor price trigger around $2.9M. Add to next-cycle ADU feasibility scan.",
  },
  {
    rank: "—",
    propKey: "4157",
    statusLabel: "Removed",
    statusType: "removed",
    type: "Filtered out this cycle",
    keySignal:
      "Public-source pass (Zillow + multiple aggregators) indicates a likely Oct. 15, 2022 sale. Current owner profile no longer supports long-held outreach status. The earlier-referenced March 2, 2004 sale appears to be prior-owner history.",
    profile: "1988 · 3,604 sq ft · 5 bd / 3.5 ba · 0.188 ac",
    systemAction:
      "No action unless owner profile changes in a future cycle. Official county confirmation queued.",
  },
  {
    rank: "—",
    propKey: "3409",
    statusLabel: "Removed",
    statusType: "removed",
    type: "Filtered out this cycle",
    keySignal:
      "Public-record pass found March 28, 2023 sale for $2.11M. Current owner held only ~3 years (the 2002 sale referenced earlier was the prior-prior owner). Not a long-held outreach target.",
    profile: "1991 · 3,278 sq ft · 4 bd / 3 ba · Shadow Creek neighborhood",
    systemAction:
      "No action unless owner profile changes in a future cycle.",
  },
];

const PUBLIC_RECORD = [
  {
    propKey: "3251",
    confirmed: [
      "Year built 1985, 3,473 sq ft, 0.22 ac (confirmed)",
      "APN ~220-210-029",
      "Hegenbart Family Trust — James R. & Jayne K. Hegenbart, trustees",
      "Mailing equals situs (owners reside at property)",
    ],
    portal:
      "Town of Danville CSS portal pull completed: 0 permit records (parcel is in unincorporated Blackhawk under Contra Costa County jurisdiction). CCC ePermits Center: login wall on public Building search; historical permits limited to registered project contacts or formal Records Request. Official portal pull pending human-access step.",
  },
  {
    propKey: "4319",
    confirmed: [
      "Year built 1988, 4,003 sq ft, 4 bd / 3 ba, 8,970 sf lot (confirmed)",
      "Owner of record: Tercheria Family Revocable Trust — John C & Linda M Tercheria, trustees (BlockShopper public record)",
      "APN 220-270-051-0 confirmed via Contra Costa County Treasurer-Tax Collector",
      "2025-26 secured property tax bill: $11,678.04 paid in full Nov 7, 2025; assessed gross value $946,891 (Prop 13 basis consistent with the 1987 land purchase)",
      "Most recent recorded transaction is dated 2021 with no disclosed price; reads as an intra-family trust vesting change rather than an arm's-length sale",
    ],
    portal:
      "Owner mailing not exposed by the CCC online tax bill — bill explicitly states \"ADDRESS INFORMATION NOT AVAILABLE ONLINE.\" Confirmed mailing requires Assessor's office, formal Records Request, or paid skip-trace. Town of Danville CSS portal pull previously returned 0 records; CCC permit detail still pending human-access step.",
  },
  {
    propKey: "4157",
    confirmed: [
      "Year built 1988, 3,604 sq ft, 5 bd / 3.5 ba, 0.188 ac (confirmed)",
      "Public-source pass (Zillow + multiple aggregators) indicates a likely Oct. 15, 2022 sale; current owner profile no longer supports long-held outreach status",
      "The earlier-referenced March 2, 2004 sale ($1.02M) appears to be prior-owner history",
      "4 construction permits on record per third-party aggregator (specific types not visible in public snippets)",
    ],
    portal:
      "Reclassified as removed lead this cycle. Official county confirmation queued; CCC permit detail still pending human-access step if profile changes in a future cycle.",
  },
  {
    propKey: "5505",
    confirmed: [
      "Year built 2007, 8,039 sq ft, 0.66 ac (confirmed)",
      "Owners since March 2010 (16-year hold)",
      "8 construction permits on record including roof-mounted solar PV system, bar cabinet rebuild, drywall repair, sink hookup, minor dry-rot and flooring repairs",
      "Home is actively maintained, not under-modernized",
    ],
    portal:
      "Permit detail surfaced via third-party aggregator. CCC ePermits portal would confirm specifics if needed.",
  },
  {
    propKey: "3409",
    confirmed: [
      "Year built 1991, 3,278 sq ft, 4 bd / 3 ba",
      "Listed August 2022 at $2,199,800",
      "Sold March 28, 2023 for $2,110,000",
      "Current owner held only ~3 years",
    ],
    portal: "Removed from long-held outreach list this cycle.",
  },
];

const PUBLIC_RECORD_TAKEAWAY =
  "Public-record pass changed the rankings. It removed two bad leads (3409 and 4157, both recent sales not long-held targets), kept one off-market target, and reframed one listed property as a pricing-discount watchlist item rather than a renovation candidate.";

const WATCHLIST = [
  {
    propKey: "5505",
    profile: "Listed · 8,039 sq ft · built 2007",
    metrics: [
      { label: "Current list", value: "$4,106,500", highlight: true },
      { label: "Original list", value: "$6,250,000" },
      { label: "Cumulative cuts", value: "~$2.14M (~34%)", warning: true },
    ],
    trigger: "List ≤ ~$3.5M OR another ≥10% cut",
    systemStatus: "System Watchlist — monitoring",
    systemAction: "Re-run numbers automatically if trigger is hit.",
  },
  {
    propKey: "209StillCreek",
    profile: "Listed cohort · multi-exit / ADU watchlist · 4,189 sq ft on 0.46 ac",
    metrics: [
      { label: "Current list", value: "$3,100,000", highlight: true },
      { label: "$/sf at list", value: "$741" },
      { label: "Lot size", value: "0.46 ac" },
    ],
    trigger: "List ≤ ~$2.9M",
    systemStatus: "System Watchlist — monitoring",
    systemAction: "Add to next-cycle ADU-feasibility scan.",
  },
];

// Action queue is rendered as cards. Each item: { title, body, status }.
// status is optional and rendered as a small chip on the card.
const SYSTEM_ACTION_QUEUE = [
  {
    title: "Approval Gate · 3251 Blackhawk Meadow Dr",
    body: "Draft owner-introduction letter prepared and held. This is the only outreach-ready candidate this cycle — owner confirmed, mailing confirmed. Nothing is sent without Jeremy's sign-off. This is the one step that requires Jeremy.",
    status: "Awaiting approval",
  },
  {
    title: "Mailing Pull · 4319 Quail Run Ln",
    body: "Owner of record confirmed (Tercheria Family Revocable Trust). System queues mailing pull via Assessor / formal Records Request before this property can be labeled outreach-ready. No action from Jeremy.",
    status: "System · Mailing pull",
  },
  {
    title: "Comp Lane Refresh · 3251 Blackhawk Meadow Dr",
    body: "System refreshes the Blackhawk Meadow Dr Tier A renovated comp lane each cycle to keep the ARV working range current. No action from Jeremy.",
    status: "System · Routine",
  },
  {
    title: "Permit Detail Pull",
    body: "System queues CCC permit detail via human-access / formal Records Request path as leads advance. No action from Jeremy.",
    status: "System · On advance",
  },
  {
    title: "Price Monitor · 5505 Blackhawk Dr",
    body: "System re-runs the deal automatically if list drops to ~$3.5M or another ≥10% cut hits. No action from Jeremy.",
    status: "System · Watching",
  },
  {
    title: "Price Monitor · 209 Still Creek Rd",
    body: "System re-runs the deal automatically if list drops to ~$2.9M. No action from Jeremy.",
    status: "System · Watching",
  },
  {
    title: "Next Scan Rotation",
    body: "System schedules next-cycle coverage: Walnut Creek, Lafayette, Alamo, Scottsdale. No action from Jeremy.",
    status: "System · Scheduled",
  },
  {
    title: "Jurisdiction Check Rule",
    body: "Standing system rule: apply unincorporated Contra Costa jurisdiction check before any permit pull on Blackhawk-area parcels. Applied automatically.",
    status: "System · Standing rule",
  },
];

// Above-the-fold "Signal Summary" — premium command-center module above the dominant winner card.
const SIGNAL_SUMMARY = [
  {
    label: "Strongest Signal",
    value: "3251 Blackhawk Meadow Dr",
    accent: "primary",
  },
  {
    label: "Market Lane",
    value: "Off-market owner target",
    accent: "default",
  },
  {
    label: "Why It Matters",
    value: "Not competing against MLS buyer traffic.",
    accent: "default",
  },
  {
    label: "System Status",
    value: "Owner confirmed · Letter held for approval",
    accent: "ready",
  },
];

// Managed Workflow clarity module — rendered directly beneath the Private Market Signal section.
// Explains the system's role so Jeremy immediately understands he does not need to work the list.
const MANAGED_WORKFLOW = {
  headline: "Built so Jeremy does not have to work the list.",
  subline:
    "Acquisition OS ranks the strongest private-market signals, keeps watchlist triggers active, prepares respectful outreach for the top targets, and queues follow-up steps. Jeremy only steps in at approval gates — nothing is sent without approval.",
  tiles: [
    {
      number: "01",
      title: "System finds and ranks",
      body: "Long-held owners, likely equity, pricing pressure, and off-market signals are filtered against Jeremy's exit strategy and ranked by acquisition strength.",
    },
    {
      number: "02",
      title: "System prepares the next move",
      body: "Owner records, contact paths, watchlist triggers, and follow-up steps are researched and queued by the system. Outreach is prepared by the system and held for approval — nothing is sent until Jeremy gives the sign-off.",
    },
    {
      number: "03",
      title: "Jeremy approves only",
      body: "Jeremy does not need to research, monitor, or chase leads. He only steps in at approval gates — when a top target is ready and a letter is waiting for his sign-off.",
    },
  ],
  callout: "The system prepares the outreach and follow-up queue automatically. Jeremy only approves before anything is sent.",
};

const WHY_THIS_MATTERS = {
  bullets: [
    "Your agent already sees MLS / listed homes.",
    "Acquisition OS focuses on the private-market layer.",
    "It filters weak listed deals instead of forcing them into the report.",
    "It finds long-held owner targets that don't surface on standard buyer searches.",
    "It ranks based on real acquisition logic (hold length, comp lane, owner profile, pricing pressure).",
    "It tracks watchlist triggers automatically.",
    "It prepares outreach but does not send anything without approval.",
    "It corrects bad assumptions when public records contradict an earlier lead.",
  ],
  quote:
    "The value is not just finding more homes. The value is separating signal from noise — then turning that signal into a ranked target list, a watchlist, and prepared next actions.",
};

// One-line analytical caption shown beneath each chart card.
// Keeps the chart from reading as decoration and turns it into a "module".
const CHART_INSIGHTS = {
  ranking: "3251 leads on a composite of off-market access, hold length, comp lane support, and size-band fit.",
  holdTime: "The longer the hold, the higher the implied equity. 4319 (38 yr) and 3251 (26 yr) define the upper band this cycle.",
  pricecuts: "5505 has cut $2.14M off list (~34%). The system re-runs the deal at ~$3.5M or another 10% cut.",
  arv: "Subject sits cleanly between two same-street renovated comps by size. ARV lane is real, not extrapolated.",
  pipeline: "One outreach-ready target, one with owner confirmed but mailing pull required, one listed watchlist, two filtered out.",
};

// Chart datasets
const CHART_DATA = {
  ranking: {
    labels: ["3251 Blackhawk Meadow", "4319 Quail Run Ln", "5505 Blackhawk Dr", "4157 Quail Run Dr", "3409 Blackhawk Meadow"],
    scores: [95, 78, 45, 0, 0],
    colors: ["#243828", "#3F5C46", "#C9A05A", "#9F948A", "#9F948A"],
    statusLabels: ["Top Target", "Owner Confirmed · Mailing Pull Required", "Listed Watchlist", "Removed", "Removed"],
  },
  holdTime: {
    labels: ["4319 Quail Run Ln", "3251 Blackhawk Meadow Dr", "5505 Blackhawk Dr", "4157 Quail Run Dr", "3409 Blackhawk Meadow Dr"],
    years: [38, 26, 16, 3, 3],
    colors: ["#3F5C46", "#243828", "#C9A05A", "#9F948A", "#9F948A"],
  },
  priceCuts5505: {
    points: [
      { label: "Original list", value: 6250000 },
      { label: "Current list", value: 4106500 },
      { label: "Re-review trigger", value: 3500000 },
    ],
  },
  arvComp3251: {
    labels: ["3421 Blackhawk Meadow", "Subject 3251 (working)", "3312 Blackhawk Meadow"],
    pricePerSf: [655, 687, 722],
    sqFt: [3281, 3473, 5383],
  },
  pipelineStatus: {
    labels: ["Top Target", "Owner Confirmed · Mailing Pull Required", "Listed Watchlist", "Removed"],
    counts: [1, 1, 1, 2],
    colors: ["#243828", "#C9A05A", "#7A8E78", "#9F948A"],
  },
};

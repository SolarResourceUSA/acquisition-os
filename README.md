# Acquisition OS — Private Market Radar

**Danville / Blackhawk Deal Signal · May 2026 Pilot Scan**

A static, single-page interactive dashboard surfacing private-market acquisition signals — long-held owner targets, hidden equity, pricing pressure, and off-market opportunities — that complement the listed-inventory coverage Jeremy's agent already provides.

> *Your agent finds the listings. Acquisition OS finds the private-market signals — long-held owners, hidden equity, pricing pressure, and off-market opportunities worth watching before they ever hit the MLS.*

---

## Stack

- Plain HTML + CSS + vanilla JavaScript — no build step, no framework, no bundler
- Chart.js 4 (loaded from cdnjs.cloudflare.com — no local dependency)
- One static dataset in `data.js` — edit it to update the dashboard for a new cycle
- Hero image at `assets/hero-golf.jpg`

No env vars. No backend. Drag-and-drop or `git push` deployable to any static host.

---

## File layout

```
acquisitionos_beta_dashboard/
├── index.html                    # Full dashboard — all sections + drawer
├── styles.css                    # Cream / charcoal / deep green / gold palette
├── script.js                     # Rendering + Chart.js + interactions (drawer, sticky nav, counters)
├── data.js                       # Static dataset — edit this to update a cycle
├── assets/
│   ├── hero-golf.jpg             # Primary Blackhawk hero image
│   └── hero.jpg                  # Fallback hero
├── .gitignore                    # Excludes node_modules, .DS_Store, iCloud placeholders
├── README.md                     # This file
├── Interaction_Polish_Notes.md   # v6 polish pass documentation
├── Visual_Polish_Notes.md        # v3–v5 visual pass documentation
├── DESIGN_UPGRADE_NOTES.md       # May 2026 premium redesign notes
├── DASHBOARD_IMPROVEMENTS.md     # How the dashboard improves on the PDF
└── Owner_Record_Pull_Changelog.md
```

---

## Local preview

```bash
# From the dashboard folder:
python3 -m http.server 8080
# Open http://localhost:8080
```

Double-clicking `index.html` works for most things, but the CDN Chart.js script may be blocked on `file://`. Use the local server for full fidelity.

---

## GitHub Pages deployment

### One-time setup

1. **Create a GitHub account** at [github.com](https://github.com) if you don't already have one.

2. **Create a new repository:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `acquisition-os` (or any name you prefer)
   - Set to **Private** (recommended — the dashboard contains deal intelligence)
   - Leave "Add a README" unchecked
   - Click **Create repository**

3. **Push the dashboard files:**

   Open Terminal, then run:

   ```bash
   cd "/Users/ryanflores/Library/Mobile Documents/com~apple~CloudDocs/Acquisition OS/01_Live_Dashboard/acquisitionos_beta_dashboard"
   git init
   git add .
   git commit -m "Acquisition OS — May 2026 Pilot Scan"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/acquisition-os.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

4. **Enable GitHub Pages:**
   - In the repo, go to **Settings → Pages** (left sidebar)
   - Under **Source**, select **Deploy from a branch**
   - Branch: `main` · Folder: `/ (root)`
   - Click **Save**

5. **Wait ~60 seconds.** The live URL will appear on the Pages settings screen:

   ```
   https://YOUR_USERNAME.github.io/acquisition-os/
   ```

### Jeremy's bookmark guide

Once the site is live:

- Open the URL in Chrome or Safari
- Bookmark it (`Cmd + D`) as **"Acquisition OS · Danville"**
- The page loads instantly — no login, no app to install
- Hit refresh any time for the latest version after a data update

For a private repo, the GitHub Pages URL is still publicly accessible by default unless you upgrade to GitHub Pro ($4/month) which enables private Pages. The alternative is to share the URL only with Jeremy directly — the URL is not indexed by Google unless linked from elsewhere.

---

## Updating the dashboard for a new cycle

Almost everything that changes between cycles lives in `data.js`. The structure mirrors the report sections:

| Constant | What it controls |
|---|---|
| `BRAND` | Product / module / scan / cycle / positioning lines |
| `PROPS` | Master property catalog — addresses, owner record + status |
| `KPIS` | KPI strip (4 tiles at the top) |
| `OPENING_STATEMENT` | One-sentence headline (feeds Private Market Signal module) |
| `SIGNAL_SUMMARY` | 4-tile signal facts grid inside Private Market Signal |
| `MULTI_WINNER` | Dominant winner card — winning categories, why-it-wins, system readiness |
| `SECONDARY_WINNERS` | Other category winners (no repeats of dominant) |
| `TOP_TARGET` | Stats block inside the dominant winner card |
| `DRAFT_LETTER` | Letter shown in the right-side drawer ("View draft outreach letter") |
| `PIPELINE` | Ranked pipeline cards (statusType controls full card vs. filtered block) |
| `PUBLIC_RECORD` | Per-property public record findings |
| `PUBLIC_RECORD_TAKEAWAY` | Lead line on the public-record section |
| `WATCHLIST` | Watchlist trigger cards |
| `SYSTEM_ACTION_QUEUE` | Numbered action queue |
| `WHY_THIS_MATTERS` | Value props + closing quote |
| `CHART_DATA` | All 5 Chart.js datasets |

**To update for a new scan cycle:**
1. Edit `data.js` — update properties, pipeline rankings, KPIs, charts, and draft letter
2. Update `BRAND.scan`, `BRAND.cycle`, and `BRAND.scanDate` to reflect the new cycle
3. Replace `assets/hero-golf.jpg` if you have a better aerial (maintain ~16:7 ratio)
4. Run `python3 -m http.server 8080` locally and QA the full page
5. `git add . && git commit -m "Cycle update — [Month Year]" && git push`
6. GitHub Pages re-deploys automatically within ~60 seconds

**Do not edit `index.html`, `styles.css`, or `script.js`** unless doing a structural pass — all acquisition data and copy lives in `data.js`.

---

## GitHub Pages deployment checklist

Before each push, confirm:

- [ ] `data.js` has no local file paths or absolute computer paths
- [ ] `assets/hero-golf.jpg` exists in the assets folder
- [ ] Chart.js CDN URL is `https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js`
- [ ] Sticky nav shows all 6 links (Signal / Winner / Pipeline / Charts / Watchlist / Actions)
- [ ] KPI strip shows 4 tiles with animated counters
- [ ] Pipeline shows 4 active cards + compact filtered block for removed entries
- [ ] Signal strength meters visible on all property cards
- [ ] Draft letter drawer opens and closes (button, backdrop click, Escape key)
- [ ] All map buttons resolve (no dead links)
- [ ] Brand reads "Acquisition OS" throughout — title case with space

---

## Branding rules

```
Acquisition OS              ← product name (title case, with a space — never "AcquisitionOS")
Private Market Radar        ← module / report type
Danville / Blackhawk Deal Signal   ← this scan's title
May 2026 Pilot Scan         ← cycle subtitle
```

Front-facing copy never references "Multi-Exit Deal Finder," "Pilot Opportunity Report," or "Property Acquisitions Report" — those live only in internal/legacy documentation.

---

## Notes

This dashboard presents acquisition research, not final recommendations. No legal, zoning, financing, owner-finance, or HOA conclusions are made here. All items requiring professional verification are queued by the system.

Tested in Chrome, Safari, Firefox (current versions). Mobile-friendly to ~360px viewport width.

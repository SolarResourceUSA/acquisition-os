// Acquisition OS — Private Market Radar
// Dashboard interactivity + Chart.js visualizations.
// Polish Pass v6: sticky nav, scroll progress, KPI counters,
// signal strength meters, right-side drawer.

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ---- Helpers ----
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function getProp(key) { return PROPS[key] || null; }

  // Address block: street + city + map button
  function addressBlock(propKey, opts) {
    opts = opts || {};
    const p = getProp(propKey);
    if (!p) return "";
    const url = mapUrl(p.full);
    const aria = `View ${p.street} on Google Maps`;
    const btnClass = "map-btn" + (opts.onDark ? " map-btn-on-dark" : (opts.soft ? " map-btn-soft" : ""));
    const streetClass = opts.streetClass || "addr-street";
    const cityClass = opts.cityClass || "addr-city";
    return `
      <div class="address-block ${opts.wrapperClass || ""}">
        <div class="${streetClass}">${escapeHtml(p.street)}</div>
        <div class="${cityClass}">${escapeHtml(p.city)}</div>
        <div class="address-actions">
          <a class="${btnClass}" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${aria}">View on Map</a>
        </div>
      </div>
    `;
  }

  // Contact-status chip
  function contactChip(propKey, opts) {
    opts = opts || {};
    const p = getProp(propKey);
    if (!p || !p.contact || !p.contact.path) return "";
    const path = p.contact.path;
    const isNotReady = (path === "No safe contact path yet");
    const label = isNotReady ? "Contact status" : "Best contact path";
    const value = isNotReady ? "Not outreach-ready" : path;
    const slug = String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const darkClass = opts.onDark ? " contact-chip-on-dark" : "";

    // Agent info line (listed properties)
    const c = p.contact;
    let agentLine = "";
    if (c.agentNote) {
      agentLine = `<div class="contact-chip-agent">${escapeHtml(c.agentNote)}</div>`;
    } else if (c.agentName || c.agentMLS) {
      const parts = [];
      if (c.agentName) parts.push(escapeHtml(c.agentName));
      if (c.agentBrokerage) parts.push(escapeHtml(c.agentBrokerage));
      if (c.agentMLS) parts.push("MLS " + escapeHtml(c.agentMLS));
      if (c.agentPhone) parts.push(escapeHtml(c.agentPhone));
      agentLine = parts.length ? `<div class="contact-chip-agent">${parts.join(" · ")}</div>` : "";
    }

    // Phone lookup button — owner-target cards only (path contains "phone lookup")
    const hasPhoneLookup = !isNotReady && /phone.?lookup/i.test(value);
    const phoneLookupBtn = hasPhoneLookup
      ? `<button class="phone-lookup-btn" type="button" data-phone-lookup="${escapeHtml(propKey)}">Phone lookup</button>`
      : "";

    return `
      <div class="contact-chip${darkClass}" data-contact="${slug}">
        <span class="contact-chip-label">${label}</span>
        <span class="contact-chip-value">${escapeHtml(value)}</span>
        ${agentLine}${phoneLookupBtn}
      </div>
    `;
  }

  // Ownership signal block
  function ownershipBlock(propKey, opts) {
    opts = opts || {};
    const p = getProp(propKey);
    if (!p) return "";
    const o = p.owner || {};
    const isMailingPull = o.status === "mailing_pull_required";
    const isPullRequired = o.status === "pull_required";
    const isPending = o.status === "pending" || /pending|queued/i.test(o.name);
    const stateClass = (isMailingPull || isPullRequired)
      ? " ownership-signal-pull-required"
      : (isPending ? " ownership-signal-pending" : "");
    const darkClass = opts.onDark ? " ownership-signal-on-dark" : "";
    const labelText = isMailingPull
      ? "Owner Confirmed · Mailing Pull Required"
      : (isPullRequired ? "Owner Record Pull Required" : "Ownership signal");
    const meta = [];
    if (o.heldSince) meta.push("Owned since " + escapeHtml(o.heldSince));
    if (o.lastSale) meta.push("Last sale " + escapeHtml(o.lastSale) + (o.lastSalePrice ? " — $" + Number(o.lastSalePrice).toLocaleString() : ""));
    if (o.apn) meta.push("APN " + escapeHtml(o.apn));
    return `
      <div class="ownership-signal${stateClass}${darkClass}">
        <div class="ownership-signal-label">${labelText}</div>
        <div class="ownership-signal-name">${escapeHtml(o.name)}</div>
        ${o.detail ? `<div class="ownership-signal-detail">${escapeHtml(o.detail)}</div>` : ""}
        ${o.mailing ? `<div class="ownership-signal-detail" style="margin-top:6px;"><strong>Mailing:</strong> ${escapeHtml(o.mailing)}</div>` : ""}
        ${meta.length ? `<div class="ownership-signal-meta">${meta.join(" · ")}</div>` : ""}
      </div>
    `;
  }

  // Signal strength meter HTML
  // strength: "high" | "mailing-pull" | "watchlist" | "removed"
  const STRENGTH_CONFIG = {
    "high":         { bars: 4, filled: [true, true, true, true],  level: "filled-high", text: "High signal" },
    "mailing-pull": { bars: 4, filled: [true, true, true, false], level: "filled-mid",  text: "High · Mailing pull required" },
    "watchlist":    { bars: 4, filled: [true, true, false, false], level: "filled-mid", text: "Watchlist" },
    "removed":      { bars: 4, filled: [false, false, false, false], level: "filled-low", text: "Removed" },
  };
  function signalMeter(propKey, opts) {
    opts = opts || {};
    const cfg = STRENGTH_CONFIG[opts.strength] || STRENGTH_CONFIG["watchlist"];
    const darkClass = opts.onDark ? " signal-meter-on-dark" : "";
    const bars = cfg.bars;
    const barsHtml = Array.from({ length: bars }, (_, i) => {
      const cls = cfg.filled[i] ? cfg.level : "";
      return `<span class="signal-bar ${cls}"></span>`;
    }).join("");
    return `
      <div class="signal-meter${darkClass}" data-strength="${escapeHtml(opts.strength || '')}">
        <span class="signal-meter-label">Signal</span>
        <div class="signal-meter-bars">${barsHtml}</div>
        <span class="signal-meter-text">${escapeHtml(cfg.text)}</span>
      </div>
    `;
  }

  // Strength lookup by propKey
  const PROP_STRENGTH = {
    "3251":          "high",
    "4319":          "mailing-pull",
    "5505":          "watchlist",
    "209StillCreek": "watchlist",
    "4157":          "removed",
    "3409":          "removed",
  };

  // ---- Hero positioning ----
  $("#hero-positioning").textContent = BRAND.positioning;

  // ---- Private Market Signal module ----
  const pmsPosEl = $("#pms-positioning");
  if (pmsPosEl) pmsPosEl.textContent = BRAND.positioning;

  // Render 4 signal facts from SIGNAL_SUMMARY
  const pmsFacts = $("#pms-facts");
  if (pmsFacts && typeof SIGNAL_SUMMARY !== "undefined") {
    SIGNAL_SUMMARY.forEach(item => {
      const card = document.createElement("div");
      card.className = "pms-fact reveal";
      card.dataset.accent = item.accent || "default";
      card.innerHTML = `
        <div class="pms-fact-label">${escapeHtml(item.label)}</div>
        <div class="pms-fact-value">${escapeHtml(item.value)}</div>
      `;
      pmsFacts.appendChild(card);
    });
  }

  // ---- Managed Workflow module ----
  if (typeof MANAGED_WORKFLOW !== "undefined") {
    const mw = MANAGED_WORKFLOW;
    const headlineEl = $("#workflow-headline");
    const sublineEl  = $("#workflow-subline");
    const tilesEl    = $("#workflow-tiles");
    if (headlineEl) headlineEl.textContent = mw.headline;
    if (sublineEl)  sublineEl.textContent  = mw.subline;
    if (tilesEl && mw.tiles) {
      mw.tiles.forEach(t => {
        const tile = document.createElement("div");
        tile.className = "workflow-tile";
        tile.innerHTML = `
          <div class="workflow-tile-number">${escapeHtml(t.number)}</div>
          <div class="workflow-tile-title">${escapeHtml(t.title)}</div>
          <div class="workflow-tile-body">${escapeHtml(t.body)}</div>
        `;
        tilesEl.appendChild(tile);
      });
      // Callout bar beneath the tiles — explicit approval-gate statement
      if (mw.callout) {
        const callout = document.createElement("div");
        callout.className = "workflow-callout";
        callout.innerHTML = `
          <span class="workflow-callout-dot" aria-hidden="true"></span>
          <span class="workflow-callout-text">${escapeHtml(mw.callout)}</span>
        `;
        tilesEl.parentNode.appendChild(callout);
      }
    }
  }

  // ---- KPI strip ----
  const kpiGrid = $("#kpi-grid");
  KPIS.forEach((k) => {
    const numericVal = parseInt(String(k.value).replace(/[^0-9]/g, ""), 10);
    const el = document.createElement("div");
    el.className = "kpi reveal";
    // Store raw display value; if numeric use counter animation
    const valueHtml = (!isNaN(numericVal) && String(numericVal) === String(k.value))
      ? `<div class="kpi-value" data-target="${numericVal}">0</div>`
      : `<div class="kpi-value">${escapeHtml(k.value)}</div>`;
    el.innerHTML = `${valueHtml}<div class="kpi-label">${escapeHtml(k.label)}</div>`;
    kpiGrid.appendChild(el);
  });

  // ---- Dominant Winner (multi-category) ----
  const winnerEl = $("#winner-card");
  if (winnerEl && typeof MULTI_WINNER !== "undefined") {
    const w = MULTI_WINNER;
    const wp = getProp(w.propKey);
    const wpStats = (typeof TOP_TARGET !== "undefined" && TOP_TARGET.propKey === w.propKey) ? TOP_TARGET.stats : [];
    winnerEl.innerHTML = `
      <div class="winner-grid">
        <div class="winner-left">
          <div class="winner-cycle-label">${escapeHtml(w.cycleLabel)}</div>
          <h3 class="winner-address">${escapeHtml(wp.street)}</h3>
          <div class="winner-city">${escapeHtml(wp.city)}</div>
          <div class="winner-actions">
            <a class="map-btn map-btn-soft" href="${mapUrl(wp.full)}" target="_blank" rel="noopener noreferrer" aria-label="View ${wp.street} on Google Maps">View on Map</a>
            <button class="map-btn" data-open-drawer="letter-drawer" type="button">View draft letter</button>
          </div>
          <p class="winner-oneline">${escapeHtml(w.oneLine)}</p>
          <div class="winner-badges">
            ${w.winningCategories.map(c => `<span class="winner-badge">${escapeHtml(c)}</span>`).join("")}
          </div>
          ${wpStats.length ? `
            <div class="winner-stats">
              ${wpStats.map(s => `<div class="tt-stat"><div class="stat-label">${escapeHtml(s.label)}</div><div class="stat-value">${escapeHtml(s.value)}</div></div>`).join("")}
            </div>
          ` : ""}
          ${ownershipBlock(w.propKey)}
          ${contactChip(w.propKey)}
          ${signalMeter(w.propKey, { strength: PROP_STRENGTH[w.propKey] || "high" })}
          <div class="winner-section" style="margin-top:24px;">
            <div class="winner-section-label">Why it wins · Acquisition logic</div>
            <ol class="why-list-num">
              ${w.whyItWins.map(x => `<li><span class="why-title">${escapeHtml(x.title)}</span>${escapeHtml(x.body)}</li>`).join("")}
            </ol>
          </div>
        </div>
        <div class="winner-right">
          <button class="winner-secondary-toggle" aria-expanded="false" type="button">
            <span class="winner-secondary-label">System details</span>
            <span class="winner-secondary-icon" aria-hidden="true">↓</span>
          </button>
          <div class="winner-secondary-details" hidden>
            <div class="winner-section">
              <div class="winner-section-label">System Readiness</div>
              <ul class="readiness-list">
                ${w.systemReadiness.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
              </ul>
            </div>
            <div class="winner-section">
              <div class="winner-section-label">What still controls the deal</div>
              <ul class="controls-list">
                ${w.whatControlsTheDeal.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
              </ul>
            </div>
          </div>
          <div class="approval-gate-line">
            <span class="approval-gate-dot" aria-hidden="true"></span>
            <span class="approval-gate-text">
              <strong>Approval gate</strong>
              Draft owner-introduction letter prepared. Nothing is sent without Jeremy's approval.
            </span>
          </div>
          <div class="winner-cta-row">
            <button class="tt-cta" data-open-drawer="letter-drawer" type="button">View draft letter</button>
          </div>
        </div>
      </div>
    `;
  }

  // Wire winner secondary toggle
  (function() {
    const toggleBtn = winnerEl ? winnerEl.querySelector(".winner-secondary-toggle") : null;
    const secDetails = winnerEl ? winnerEl.querySelector(".winner-secondary-details") : null;
    if (toggleBtn && secDetails) {
      toggleBtn.addEventListener("click", () => {
        const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
        toggleBtn.setAttribute("aria-expanded", String(!expanded));
        toggleBtn.querySelector(".winner-secondary-label").textContent = !expanded ? "Hide details" : "System details";
        toggleBtn.querySelector(".winner-secondary-icon").textContent = !expanded ? "↑" : "↓";
        if (!expanded) {
          secDetails.removeAttribute("hidden");
        } else {
          secDetails.setAttribute("hidden", "");
        }
      });
    }
  })();

  // ---- Secondary unique-winner cards ----
  const secGrid = $("#secondary-grid");
  if (secGrid && typeof SECONDARY_WINNERS !== "undefined") {
    SECONDARY_WINNERS.forEach(s => {
      const p = s.propKey ? getProp(s.propKey) : null;
      const propLabel = p ? p.street : (s.propLabel || "—");
      const cityLabel = p ? p.city : "";
      const mapBtn = p ? `<a class="map-btn map-btn-soft" href="${mapUrl(p.full)}" target="_blank" rel="noopener noreferrer" aria-label="View ${p.street} on Google Maps">View on Map</a>` : "";
      const strengthKey = s.propKey ? (PROP_STRENGTH[s.propKey] || "watchlist") : "watchlist";
      const el = document.createElement("div");
      el.className = "sec-card";
      el.dataset.accent = s.accent || "default";
      el.innerHTML = `
        <div class="sec-cat-label">${escapeHtml(s.category)}</div>
        <h4 class="sec-prop">${escapeHtml(propLabel)}</h4>
        ${cityLabel ? `<div class="sec-city">${escapeHtml(cityLabel)}</div>` : ""}
        <div class="sec-why">${s.why}</div>
        ${mapBtn ? `<div class="sec-actions">${mapBtn}</div>` : ""}
        ${s.propKey ? contactChip(s.propKey) : ""}
        ${s.propKey ? signalMeter(s.propKey, { strength: strengthKey }) : ""}
        <div class="sec-meta">
          <div><strong>System status</strong>${s.systemStatus}</div>
          <div><strong>Next system action</strong>${s.nextAction}</div>
        </div>
      `;
      secGrid.appendChild(el);
    });
  }

  // ---- Ranked Pipeline cards ----
  // Active/watchlist entries get full cards; removed entries get a compact block.
  const pipeGrid = $("#pipeline-grid");
  const activeEntries  = PIPELINE.filter(p => p.statusType !== "removed");
  const removedEntries = PIPELINE.filter(p => p.statusType === "removed");

  activeEntries.forEach(p => {
    const prop = getProp(p.propKey);
    const strengthKey = PROP_STRENGTH[p.propKey] || "watchlist";
    const el = document.createElement("div");
    el.className = "pipe-card";
    el.dataset.status = p.statusType;

    const summaryHtml = `
      <div class="pipe-card-summary">
        <div class="pipe-summary-top">
          <span class="pipe-rank">Rank ${p.rank}</span>
          <span class="pipe-status" data-status="${p.statusType}">${escapeHtml(p.statusLabel)}</span>
        </div>
        <h3 class="pipe-address">${escapeHtml(prop.street)}</h3>
        <div class="pipe-city">${escapeHtml(prop.city)}</div>
        <div class="pipe-card-map-row">
          <a class="map-btn map-btn-soft" href="${mapUrl(prop.full)}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeHtml(prop.street)} on Google Maps">View on Map</a>
        </div>
        ${signalMeter(p.propKey, { strength: strengthKey })}
        <div class="pipe-key-signal-brief">${escapeHtml(p.keySignal)}</div>
        <div class="pipe-system-action-brief">${escapeHtml(p.systemAction)}</div>
      </div>
    `;

    const detailsHtml = `
      <div class="pipe-card-details" hidden>
        <div class="pipe-row"><span class="pipe-key">Type</span><span class="pipe-val">${escapeHtml(p.type)}</span></div>
        <div class="pipe-row"><span class="pipe-key">Profile</span><span class="pipe-val">${escapeHtml(p.profile)}</span></div>
        ${ownershipBlock(p.propKey)}
        ${contactChip(p.propKey)}
      </div>
      <button class="pipe-expand-btn" aria-expanded="false" type="button">
        <span class="pipe-expand-label">View details</span>
        <span class="pipe-expand-icon" aria-hidden="true">↓</span>
      </button>
    `;

    el.innerHTML = summaryHtml + detailsHtml;

    const btn = el.querySelector(".pipe-expand-btn");
    const details = el.querySelector(".pipe-card-details");
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.querySelector(".pipe-expand-label").textContent = !expanded ? "Hide details" : "View details";
      btn.querySelector(".pipe-expand-icon").textContent = !expanded ? "↑" : "↓";
      if (!expanded) {
        details.removeAttribute("hidden");
      } else {
        details.setAttribute("hidden", "");
      }
    });

    pipeGrid.appendChild(el);
  });

  // Compact "Filtered by System" block — removed leads only, no full card treatment
  if (removedEntries.length > 0 && pipeGrid) {
    const filteredWrap = document.createElement("div");
    filteredWrap.className = "pipeline-filtered";
    filteredWrap.innerHTML = `<div class="pipeline-filtered-eyebrow">Filtered by System · removed after public-record correction</div>`;
    const filteredList = document.createElement("div");
    filteredList.className = "filtered-list";
    removedEntries.forEach(p => {
      const prop = getProp(p.propKey);
      const item = document.createElement("div");
      item.className = "filtered-item";
      item.innerHTML = `
        <div class="filtered-address">${escapeHtml(prop.street)}</div>
        <div class="filtered-reason">${escapeHtml(p.keySignal)}</div>
        <div class="filtered-status">Removed from outreach pool</div>
      `;
      filteredList.appendChild(item);
    });
    filteredWrap.appendChild(filteredList);
    // Insert after the pipeline-grid (as sibling inside the container)
    pipeGrid.parentNode.appendChild(filteredWrap);
  }

  // ---- Public Record Intelligence ----
  $("#public-record-takeaway").textContent = PUBLIC_RECORD_TAKEAWAY;
  const prGrid = $("#pr-grid");
  PUBLIC_RECORD.forEach(p => {
    const prop = getProp(p.propKey);
    const el = document.createElement("div");
    el.className = "pr-card";
    el.innerHTML = `
      <h3 class="pr-address">${escapeHtml(prop.street)}</h3>
      <div class="addr-city" style="font-size:12.5px;color:var(--muted);margin:-6px 0 10px;">${escapeHtml(prop.city)} <a class="map-btn map-btn-soft" style="margin-left:8px;" href="${mapUrl(prop.full)}" target="_blank" rel="noopener noreferrer" aria-label="View ${prop.street} on Google Maps">Map</a></div>
      <ul class="pr-list">${p.confirmed.map(c => `<li>${c}</li>`).join("")}</ul>
      <div class="pr-portal">${p.portal}</div>
    `;
    prGrid.appendChild(el);
  });

  // ---- Watchlist Triggers ----
  const wlGrid = $("#watchlist-grid");
  WATCHLIST.forEach(w => {
    const prop = getProp(w.propKey);
    const strengthKey = PROP_STRENGTH[w.propKey] || "watchlist";
    const el = document.createElement("div");
    el.className = "watch-card";
    el.innerHTML = `
      <h3 class="watch-address">${escapeHtml(prop.street)}</h3>
      <div class="watch-profile">${escapeHtml(prop.city)} · ${w.profile}</div>
      <div style="margin-bottom:18px;">
        <a class="map-btn map-btn-on-dark" href="${mapUrl(prop.full)}" target="_blank" rel="noopener noreferrer" aria-label="View ${prop.street} on Google Maps">View on Map</a>
      </div>
      <div class="watch-metrics">
        ${w.metrics.map(m => {
          const cls = m.highlight ? " highlight" : (m.warning ? " warning" : "");
          return `<div class="watch-metric"><div class="wm-label">${m.label}</div><div class="wm-value${cls}">${m.value}</div></div>`;
        }).join("")}
      </div>
      <div class="watch-row"><span class="wr-key">Trigger</span><span class="wr-val">${w.trigger}</span></div>
      <div class="watch-row"><span class="wr-key">System status</span><span class="wr-val">${w.systemStatus}</span></div>
      <div class="watch-row"><span class="wr-key">System action</span><span class="wr-val">${w.systemAction}</span></div>
      ${ownershipBlock(w.propKey, { onDark: true })}
      ${contactChip(w.propKey, { onDark: true })}
      ${signalMeter(w.propKey, { strength: strengthKey, onDark: true })}
    `;
    wlGrid.appendChild(el);
  });

  // ---- System Action Queue ----
  const actQ = $("#action-queue");
  if (actQ) {
    SYSTEM_ACTION_QUEUE.forEach((a, i) => {
      const item = (typeof a === "string") ? { title: "", body: a, status: "" } : a;
      const num = String(i + 1).padStart(2, "0");
      const card = document.createElement("div");
      card.className = "act-card";
      card.innerHTML = `
        <div class="act-num">${num}</div>
        <div class="act-body">
          ${item.title ? `<div class="act-title">${escapeHtml(item.title)}</div>` : ""}
          <div class="act-detail">${escapeHtml(item.body)}</div>
        </div>
        ${item.status ? `<div class="act-chip" data-chip="${escapeHtml(item.status.toLowerCase().replace(/\s+/g, '-'))}">${escapeHtml(item.status)}</div>` : ""}
      `;
      actQ.appendChild(card);
    });
  }

  // ---- Why This Matters ----
  const whyList = $("#why-list");
  WHY_THIS_MATTERS.bullets.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    whyList.appendChild(li);
  });
  $("#why-quote").textContent = WHY_THIS_MATTERS.quote;

  // ---- Drawer: draft letter ----
  const drawer = $("#letter-drawer");
  const drawerTitle = $("#letter-drawer-title");
  const drawerBody = $("#letter-drawer-body");
  const drawerNote = $("#letter-drawer-note");

  if (drawerTitle) drawerTitle.textContent = DRAFT_LETTER.title;
  if (drawerBody) drawerBody.innerHTML = DRAFT_LETTER.body.map(p => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("");
  if (drawerNote) drawerNote.textContent = DRAFT_LETTER.note;

  function openDrawer() {
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Focus the close button for accessibility
    const closeBtn = drawer.querySelector("[data-close-drawer]");
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  }
  function closeDrawer() {
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  $$("[data-open-drawer]").forEach(b => b.addEventListener("click", openDrawer));
  $$("[data-close-drawer]").forEach(b => b.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer && drawer.getAttribute("aria-hidden") === "false") closeDrawer();
  });

  // ---- Chart insight captions ----
  if (typeof CHART_INSIGHTS !== "undefined") {
    document.querySelectorAll(".chart-insight[data-insight]").forEach(el => {
      const k = el.getAttribute("data-insight");
      if (CHART_INSIGHTS[k]) el.textContent = CHART_INSIGHTS[k];
    });
  }

  // ---- Scroll reveal ----
  (function () {
    const targets = [
      ".pms-header",
      ".pms-fact",
      ".winner-card-wrap",
      ".sec-card",
      ".pipe-card",
      ".chart-card",
      ".pr-card",
      ".watch-card",
      ".act-card",
      ".why-list li",
      ".why-quote",
      ".kpi",
    ];
    const els = document.querySelectorAll(targets.join(","));
    els.forEach(el => el.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
  })();

  // ---- KPI animated counter ----
  (function () {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Just show the final values
      $$(".kpi-value[data-target]").forEach(el => {
        el.textContent = el.dataset.target;
      });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      $$(".kpi-value[data-target]").forEach(el => {
        el.textContent = el.dataset.target;
      });
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        io.unobserve(el);
        // Animate from 0 to target
        const duration = Math.min(900, 200 + target * 18); // scale with value
        const start = performance.now();
        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    $$(".kpi-value[data-target]").forEach(el => io.observe(el));
  })();

  // ---- Sticky nav + scroll progress ----
  (function () {
    const progressBar = $("#scroll-progress-bar");
    const nav = $("#sticky-nav");
    const hero = document.querySelector(".hero");
    const heroHeight = hero ? hero.offsetHeight : 400;

    // Section anchors for active state
    const navSections = [
      { id: "private-market-signal", link: 'a[href="#private-market-signal"]' },
      { id: "dominant-winner",       link: 'a[href="#dominant-winner"]' },
      { id: "pipeline",              link: 'a[href="#pipeline"]' },
      { id: "charts",                link: 'a[href="#charts"]' },
      { id: "watchlist",             link: 'a[href="#watchlist"]' },
      { id: "action-queue-section",  link: 'a[href="#action-queue-section"]' },
    ];

    function onScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Scroll progress bar
      if (progressBar) progressBar.style.width = pct + "%";

      // Show/hide sticky nav after hero
      if (nav) {
        if (scrollTop > heroHeight * 0.7) {
          nav.classList.add("is-visible");
        } else {
          nav.classList.remove("is-visible");
        }
      }

      // Active nav link based on scroll position
      let currentSection = "";
      navSections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= 80) currentSection = id;
      });
      navSections.forEach(({ id, link }) => {
        const linkEl = nav ? nav.querySelector(link) : null;
        if (!linkEl) return;
        if (id === currentSection) {
          linkEl.classList.add("is-active");
        } else {
          linkEl.classList.remove("is-active");
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load
  })();

  // ---- Charts ----
  if (typeof Chart === "undefined") {
    console.warn("Chart.js not loaded; skipping visualizations.");
    return;
  }

  Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
  Chart.defaults.color = "#6B6356";
  Chart.defaults.font.size = 12;
  Chart.defaults.borderColor = "rgba(232, 224, 208, 0.5)";

  const tooltipBase = {
    backgroundColor: "#1A2920",
    titleColor: "#FFFFFF",
    bodyColor: "#E8DCC4",
    borderColor: "rgba(201, 160, 90, 0.55)",
    borderWidth: 1,
    padding: 14,
    cornerRadius: 10,
    titleFont: { weight: "600", size: 12 },
    bodyFont: { size: 12.5 },
    displayColors: false,
    boxPadding: 6,
  };

  const softGrid = "rgba(232, 224, 208, 0.55)";
  const tickColor = "#9C9388";

  // 1. Opportunity ranking
  const r = CHART_DATA.ranking;
  new Chart($("#chart-ranking"), {
    type: "bar",
    data: {
      labels: r.labels,
      datasets: [{ label: "Acquisition score", data: r.scores, backgroundColor: r.colors,
        borderRadius: 6, borderSkipped: false, barPercentage: 0.75 }]
    },
    options: {
      indexAxis: "y", responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { ...tooltipBase,
        callbacks: { label: (ctx) => `${ctx.parsed.x}/100 — ${r.statusLabels[ctx.dataIndex]}` }}},
      scales: {
        x: { beginAtZero: true, max: 100, grid: { color: softGrid, drawTicks: false }, ticks: { color: tickColor }},
        y: { grid: { display: false }, ticks: { color: "#1F1F1F", font: { size: 12 } }}
      }
    }
  });

  // 2. Hold-time
  const h = CHART_DATA.holdTime;
  new Chart($("#chart-holdtime"), {
    type: "bar",
    data: { labels: h.labels, datasets: [{ label: "Years held", data: h.years, backgroundColor: h.colors,
      borderRadius: 6, borderSkipped: false, barPercentage: 0.75 }] },
    options: {
      indexAxis: "y", responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { ...tooltipBase, callbacks: { label: (ctx) => `${ctx.parsed.x} years held` }}},
      scales: {
        x: { beginAtZero: true, grid: { color: softGrid, drawTicks: false }, ticks: { color: tickColor, callback: v => v + " yr" }},
        y: { grid: { display: false }, ticks: { color: "#1F1F1F" }}
      }
    }
  });

  // 3. Price-cuts 5505
  const pc = CHART_DATA.priceCuts5505;
  new Chart($("#chart-pricecuts"), {
    type: "line",
    data: { labels: pc.points.map(p => p.label), datasets: [{ label: "List price", data: pc.points.map(p => p.value),
      borderColor: "#243828", backgroundColor: "rgba(36, 56, 40, 0.08)", fill: true, tension: 0.25,
      pointRadius: 6, pointHoverRadius: 9, pointBackgroundColor: ["#243828", "#C9A05A", "#A82B2B"],
      pointBorderColor: "#FFFFFF", pointBorderWidth: 2, borderWidth: 2.5 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { ...tooltipBase, callbacks: { label: (ctx) => "$" + ctx.parsed.y.toLocaleString() }}},
      scales: {
        x: { grid: { display: false }, ticks: { color: "#1F1F1F", font: { weight: "500" } }},
        y: { grid: { color: softGrid, drawTicks: false }, ticks: { color: tickColor, callback: v => "$" + (v/1e6).toFixed(1) + "M" }}
      }
    }
  });

  // 4. ARV comp 3251
  const arv = CHART_DATA.arvComp3251;
  new Chart($("#chart-arv"), {
    type: "scatter",
    data: { datasets: [{ label: "Comps + subject",
      data: arv.labels.map((l, i) => ({ x: arv.sqFt[i], y: arv.pricePerSf[i], label: l })),
      backgroundColor: ["#3F5C46", "#C9A05A", "#3F5C46"], borderColor: ["#243828", "#5C4A1F", "#243828"],
      borderWidth: 2, pointRadius: [10, 12, 10], pointHoverRadius: [13, 16, 13] }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { ...tooltipBase,
        callbacks: { label: (ctx) => { const d = ctx.raw; return `${d.label}: ${d.x.toLocaleString()} sf · $${d.y}/sf`; }}}},
      scales: {
        x: { title: { display: true, text: "Square feet", color: "#8E867A", font: { size: 11 }},
          grid: { color: softGrid, drawTicks: false }, ticks: { color: tickColor, callback: v => v.toLocaleString() }},
        y: { title: { display: true, text: "$/sf (renovated)", color: "#8E867A", font: { size: 11 }},
          grid: { color: softGrid, drawTicks: false }, ticks: { color: tickColor, callback: v => "$" + v }}
      }
    }
  });

  // 5. Pipeline status donut
  const ps = CHART_DATA.pipelineStatus;
  new Chart($("#chart-pipeline"), {
    type: "doughnut",
    data: { labels: ps.labels, datasets: [{ data: ps.counts, backgroundColor: ps.colors,
      borderColor: "#FFFFFF", borderWidth: 4, hoverOffset: 8 }] },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: "62%",
      plugins: {
        legend: { position: "right", labels: { color: "#1F1F1F", font: { size: 13 }, padding: 14, usePointStyle: true, pointStyle: "circle" }},
        tooltip: { ...tooltipBase, callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} ${ctx.parsed === 1 ? "property" : "properties"}` }}
      }
    }
  });

  // ---- Phone lookup button interaction ----
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".phone-lookup-btn");
    if (!btn || btn.disabled) return;
    btn.disabled = true;
    btn.classList.add("phone-lookup-btn--queued");
    btn.textContent = "Phone lookup queued · System will run next pass";
  });

})();

---
layout: post
title: "XAW Holdings Tracker"
categories: finance
published: true
pinned: true
---

<!-- celebration banner removed -->

<div style="margin-bottom: 15px; font-weight: bold;">
  Goal: {{ site.data.xaw.goal }} XAW shares
</div>

<div id="xaw-counter" style="font-size: 3rem; font-weight: bold; margin-bottom: 15px;">
  Loading…
</div>

<div style="width:90%; max-width:1000px; margin:0 auto 15px;">
  <div style="font-weight: bold; margin-bottom: 8px;">📊 Share Count Progress</div>
  <div style="background: #eee; border-radius: 8px; overflow: hidden; position: relative; height: 30px;">
    <div id="xaw-progress"
         style="background: #4caf50; height: 100%; width: 0%; transition: width 0.8s; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.85rem;">
      <!-- progress label -->
    </div>
    <!-- Marker for Goal 1 (1000 shares) -->
    <div id="xaw-marker" style="position: absolute; top: 0; bottom: 0; width: 2px; background: #ff5722; display: none; transform: translateX(-50%);"></div>
    <div id="xaw-marker-label" style="position: absolute; top: -22px; font-size: 0.8rem; color: #ff5722; display: none; transform: translateX(-50%); white-space: nowrap;">Goal 1: 1000</div>
    <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: #666; font-size: 0.9rem;">
      Goal: {{ site.data.xaw.goal }}
    </div>
  </div>
  <div id="xaw-percent" style="margin-top: 8px; font-weight: 600;">
    Loading…
  </div>
  <div id="goal1-status" style="margin-top:8px; font-weight:700; font-size:0.95rem; display:flex; align-items:center; gap:8px;">
    <!-- Goal 1 status will be inserted here -->
  </div>
<!-- portfolio worth and goal-value blocks removed; keeping share-count UI only -->


<script>
  const goalShares = {{ site.data.xaw.goal }};
  const goalYear = "{{ site.data.xaw.goal_year }}";
  const accounts = {{ site.data.xaw.accounts | jsonify }};

  let totalXAWShares = 0;
  for (const key in accounts) {
    totalXAWShares += accounts[key].shares;
  }

  const percent = Math.min((totalXAWShares / goalShares) * 100, 100);

  const numberFormat = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5
  };
  
  const displayFormat = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };
  
  // Counter
  document.getElementById("xaw-counter").innerText =
    totalXAWShares.toLocaleString(undefined, numberFormat) + " shares";

  // Progress bar
  const progressEl = document.getElementById("xaw-progress");
  if (progressEl) {
    progressEl.style.width = percent.toFixed(2) + "%";
    progressEl.innerText = totalXAWShares.toLocaleString(undefined, displayFormat);
  }

  // Percent text
  const xawPercentEl = document.getElementById("xaw-percent");
  if (xawPercentEl) {
    xawPercentEl.innerText =
      percent.toFixed(2) + "% of " + goalYear + " goal achieved (" +
      (goalShares - totalXAWShares).toLocaleString(undefined, numberFormat) +
      " shares remaining)";
  }

  // Marker for Goal 1 (1000 shares)
  const markerShares = 1000;
  const markerEl = document.getElementById('xaw-marker');
  const markerLabelEl = document.getElementById('xaw-marker-label');
  if (markerEl && markerLabelEl && goalShares > 0) {
    const markerPercent = Math.min((markerShares / goalShares) * 100, 100);
    markerEl.style.left = markerPercent.toFixed(2) + '%';
    markerLabelEl.style.left = markerPercent.toFixed(2) + '%';
    markerEl.style.display = 'block';
    markerLabelEl.style.display = 'block';

    if (totalXAWShares >= markerShares) {
      markerLabelEl.innerHTML = '✅ Goal 1 achieved — 1000 shares';
      markerLabelEl.style.color = '#2e7d32';
      markerEl.style.background = '#2e7d32';
      const goal1Status = document.getElementById('goal1-status');
      if (goal1Status) {
        goal1Status.innerHTML = '✅ Goal 1 achieved — 1000 shares';
        goal1Status.style.color = '#2e7d32';
      }
    } else {
      markerLabelEl.innerHTML = '🎯 Goal 1: 1000';
      markerLabelEl.style.color = '#ff5722';
      markerEl.style.background = '#ff5722';
      const goal1Status = document.getElementById('goal1-status');
      if (goal1Status) {
        goal1Status.innerHTML = '🎯 Goal 1: 1000 shares (not yet reached)';
        goal1Status.style.color = '#ff5722';
      }
    }
  }
</script>

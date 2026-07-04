---
layout: post
title: "VXC Holdings Tracker: Goal 1000 Shares"
categories: finance
published: true
---

<div style="margin-bottom: 15px; font-weight: bold;">
  **Goal ({{ site.data.vxc.goal_year }}):** {{ site.data.vxc.goal }} {{ site.data.vxc.symbol }} shares
</div>

<div id="vxc-counter" style="font-size: 3rem; font-weight: bold; margin-bottom: 15px;">
  Loading…
</div>

<div style="max-width: 500px; margin-bottom: 15px;">
  <div style="font-weight: bold; margin-bottom: 8px;">📊 Share Count Progress</div>
  <div style="background: #eee; border-radius: 8px; overflow: hidden; position: relative; height: 30px;">
    <div id="vxc-progress"
         style="background: #4caf50; height: 100%; width: 0%; transition: width 0.8s; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.85rem;">
      <!-- progress label -->
    </div>
    <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: #666; font-size: 0.9rem;">
      Goal: {{ site.data.vxc.goal }}
    </div>
  </div>
  <div id="vxc-percent" style="margin-top: 8px; font-weight: 600;">
    Loading…
  </div>
</div>

<div style="max-width: 500px; margin-bottom: 15px;">
  <div style="font-weight: bold; margin-bottom: 8px;">💵 Portfolio Worth Progress</div>
  <div style="background: #eee; border-radius: 8px; overflow: hidden; position: relative; height: 30px;">
    <div id="vxc-goal-progress"
         style="background: #ffc107; height: 100%; width: 0%; transition: width 0.8s; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; color: #333; font-weight: bold; font-size: 0.9rem;">
      <!-- progress label -->
    </div>
    <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: #666; font-size: 0.9rem;">
      Goal: <span id="vxc-goal-label">Loading…</span>
    </div>
  </div>
  <div id="vxc-goal-percent" style="margin-top: 8px; font-weight: 600; color: #ffc107;">
    Loading…
  </div>
</div>

### 💵 Portfolio Worth
<div style="max-width: 500px; margin-bottom: 15px; padding: 12px; background: #1e3a5f; border-left: 4px solid #2196f3; border-radius: 4px; color: white;">
  <div style="margin-bottom: 8px;">
    <strong>📈 VXC Price:</strong> <span id="vxc-price" style="color: white; font-weight: bold;">Loading…</span>
  </div>
  <div style="margin-bottom: 8px;">
    <strong>📊 Total Shares:</strong> <span id="vxc-total-shares" style="color: white;">Loading…</span>
  </div>
  <div style="font-size: 1.5rem; color: #4caf50; font-weight: bold;">
    💰 Portfolio Value: <span id="vxc-portfolio-worth">Loading…</span>
  </div>
  <div style="font-size: 0.9rem; color: #ccc; margin-top: 8px;">
    🕐 Last updated: <span id="vxc-price-update-time">Loading…</span>
  </div>
</div>

### 🎯 Goal Portfolio Value
<div style="max-width: 500px; margin-bottom: 15px; padding: 12px; background: #1e3a5f; border-left: 4px solid #ffc107; border-radius: 4px; color: white;">
  <div style="margin-bottom: 8px;">
    <strong>🔢 Goal Shares:</strong> <span id="vxc-goal-shares" style="color: white;">Loading…</span>
  </div>
  <div style="font-size: 1.5rem; color: #ffc107; font-weight: bold;">
    🎯 Goal Value: <span id="vxc-goal-worth">Loading…</span>
  </div>
  <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #444;">
    <strong>Amount Needed:</strong> <span id="vxc-amount-needed" style="color: #ff6b6b; font-weight: bold;">Loading…</span>
  </div>
</div>

<script>
  const goalShares = {{ site.data.vxc.goal }};
  const goalYear = "{{ site.data.vxc.goal_year }}";
  const symbol = "{{ site.data.vxc.symbol }}";
  const accounts = {{ site.data.vxc.accounts | jsonify }};

  let totalShares = 0;
  for (const key in accounts) {
    totalShares += accounts[key].shares;
  }

  const percent = Math.min((totalShares / goalShares) * 100, 100);

  const numberFormat = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5
  };

  const displayFormat = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  const currencyFormat = {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  };

  document.getElementById("vxc-counter").innerText =
    totalShares.toLocaleString(undefined, numberFormat) + " shares";

  const progressEl = document.getElementById("vxc-progress");
  progressEl.style.width = percent.toFixed(2) + "%";
  progressEl.innerText = totalShares.toLocaleString(undefined, displayFormat);

  document.getElementById("vxc-percent").innerText =
    percent.toFixed(2) + "% of " + goalYear + " goal achieved (" +
    (goalShares - totalShares).toLocaleString(undefined, numberFormat) +
    " shares remaining)";

  function fetchPrice() {
    const apiKey = 'TEHZ7RZZ6OVAF8MN';
    const alphaVantageUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.TO&apikey=${apiKey}`;

    fetch(alphaVantageUrl)
      .then(response => response.json())
      .then(data => {
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
          const price = parseFloat(data['Global Quote']['05. price']);
          const portfolioWorth = totalShares * price;
          const goalWorth = goalShares * price;
          const amountNeeded = goalWorth - portfolioWorth;

          document.getElementById("vxc-price").innerText = "$" + price.toFixed(2) + " CAD";
          document.getElementById("vxc-total-shares").innerText = totalShares.toLocaleString(undefined, numberFormat) + " shares";
          document.getElementById("vxc-portfolio-worth").innerText = portfolioWorth.toLocaleString(undefined, currencyFormat);
          document.getElementById("vxc-goal-shares").innerText = goalShares.toLocaleString(undefined, numberFormat) + " shares";
          document.getElementById("vxc-goal-worth").innerText = goalWorth.toLocaleString(undefined, currencyFormat);

          const goalPercent = Math.min((portfolioWorth / goalWorth) * 100, 100);
          const goalProgressEl = document.getElementById("vxc-goal-progress");
          goalProgressEl.style.width = goalPercent.toFixed(2) + "%";
          goalProgressEl.innerText = goalPercent.toFixed(1) + "%";

          document.getElementById("vxc-goal-label").innerText = goalWorth.toLocaleString(undefined, currencyFormat);
          document.getElementById("vxc-goal-percent").innerText =
            goalPercent.toFixed(2) + "% of goal reached (" +
            amountNeeded.toLocaleString(undefined, currencyFormat) +
            " remaining)";
          document.getElementById("vxc-amount-needed").innerText = amountNeeded.toLocaleString(undefined, currencyFormat);

          const now = new Date();
          const timeString = now.toLocaleString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          });
          document.getElementById("vxc-price-update-time").innerText = timeString + " ET";
        } else {
          throw new Error('Invalid response from Alpha Vantage API');
        }
      })
      .catch(error => {
        console.error('Error fetching VXC price:', error);
        document.getElementById("vxc-price").innerText = "Unable to fetch price";
        document.getElementById("vxc-portfolio-worth").innerText = "—";
        document.getElementById("vxc-price-update-time").innerText = "Error loading";
      });
  }

  fetchPrice();
  setInterval(fetchPrice, 5 * 60 * 1000);
</script>

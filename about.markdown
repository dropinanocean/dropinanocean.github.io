---
layout: page
title: About
permalink: /about/
---

**Drop In An Ocean** is my personal blog. This is where I write down what I'm learning about money, the books I'm reading, my French practice and the odd thing around the house.

Most of it is about steady progress: regular contributions, a book a month, a little French every day. One drop at a time adds up.

## What you'll find here

### 💰 [Finance]({{ '/finance/' | relative_url }}) · {{ site.categories.finance.size }} posts

My DIY investing journey, shared openly, mistakes included. I started in 2024 with a couple of Canadian dividend stocks in my RRSP, learned the hard way when they went red, and gradually moved to simple, low-cost all-in-one ETFs.

- **Portfolio updates:** what I contributed, the dividends I received and how the plan is going
- **Family accounts:** TFSAs, a family RESP for education savings and how they're invested
- **Goal trackers:** live progress toward 1,000 shares of [VBAL]({% post_url Finance/2025-12-31-Finance-17-VBAL-Tracker %}) and [XAW]({% post_url Finance/2026-07-10-Finance-XAW-Tracker %})
- **Tools and how-tos:** Wealthsimple, Questrade, Passiv, Portfolio Performance and topics like US withholding tax in an RRSP

### 📚 [Reading]({{ '/reading/' | relative_url }}) · {{ site.categories.reading.size }} posts

Summaries and takeaways from the books I read. Many of them are about personal finance, such as *The Psychology of Money* and *The Wealthy Barber*, along with biographies, business books and fiction. My goal is one book a month.

### 🇫🇷 [French]({{ '/french/' | relative_url }}) · {{ site.categories.french.size }} posts

*Apprendre le français avec moi.* I'm learning French through Duolingo, the InnerFrench podcast and everyday practice, and I share the phrases and expressions I pick up along the way.

### 🏠 [House]({{ '/house/' | relative_url }}) · {{ site.categories.home.size }} posts

Practical notes from owning a home: smart-home setup, keeping the sump pump running through a record-wet summer and shortcuts that save time.

## Latest posts

{% for post in site.posts limit:5 -%}
- [{{ post.title }}]({{ post.url | relative_url }}) <small>({{ post.date | date: "%b %-d, %Y" }})</small>
{% endfor %}

## A quick note

Everything here is my own experience and opinion. **It is not financial advice.** Do your own research or talk to a qualified advisor before making investment decisions. Numbers in my posts reflect my situation at the time of writing.

Thanks for stopping by. 🌊

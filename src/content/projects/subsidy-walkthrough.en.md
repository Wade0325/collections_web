---
title: Subsidy Assistant — Built with Agentic RAG
summary: Walk the site from a user's point of view: pick a topic, answer questions, get a result, edit and recompute, interject with questions, switch topics.
date: 2026-07-20
tags: [RAG, LLM]
cover: /images/walkthrough/a1-首頁.png
featured: true
---

This document walks through the site from an ordinary user's point of view: from opening the page,
step by step, to getting an estimation result — interjecting with questions along the way, editing
data and recomputing, and switching topics.

---

## Contents

- [How to read the screen](#how-to-read-the-screen)
- [Stage 1: choose a subsidy topic](#stage-1-choose-a-subsidy-topic)
- [Stage 2: answering the 11 questions](#stage-2-answering-the-11-questions)
- [Stage 3: getting the estimation result](#stage-3-getting-the-estimation-result)
- [Stage 4: change data, recompute](#stage-4-change-data-recompute)
- [Stage 5: interject with a question anytime](#stage-5-interject-with-a-question-anytime)
- [Stage 6: switch to another subsidy](#stage-6-switch-to-another-subsidy)
- [Interface options](#interface-options)

---

## How to read the screen

![Landing home page](/images/walkthrough/a1-首頁.png)

The whole site is three columns:

| Position | Name | Purpose |
|---|---|---|
| Left | **Sources** | Shows the cited regulation text, with words relevant to the question highlighted. Empty at first |
| Center | **Conversation** | The main working area; both the questionnaire and Q&A happen here |
| Right | **What we know so far** | The data the system currently holds; every item can be "edited" or "added" at any time |

The top right has a light / dark theme toggle and an "unofficial tool · for reference only" label.
The footer permanently shows the data basis (rule version 2026-07-08) and an anti-fraud reminder.

The input box is there from the first second — you don't have to wait for the system to ask before you can type.

---

## Stage 1: choose a subsidy topic

The opening isn't "how can I help you?" — it lists the three topics and their highlights directly:

1. **NT$30bn rent subsidy** — some counties add an extra bonus
2. **10-Year Long-Term Care Plan 3.0** — the eight strategies A through H, listed one by one
3. **Career subsidies** — the Industry Pioneer program (training fee up to NT$100k) and unemployment benefits

The three buttons below map to the three topics. Tap "NT$30bn rent subsidy":

![Entering the questionnaire](/images/walkthrough/b1-q1-縣市.png)

You enter the questionnaire, and the first question asks for the county. At this point three things happen at once:

- The center column shows the first question, with the three common options Taipei / New Taipei / Taoyuan below, plus an "other county…" dropdown
- The right column grows to the **11 fields** this questionnaire needs, all marked "not yet provided"
- The input placeholder becomes "Tap an option above to answer, or type a question to me anytime…"

The right column lays out all 11 items from the start, hiding no progress. You always know what's still missing and what the system already holds.

---

## Stage 2: answering the 11 questions

### Question 1 — rental county

Tap "Taipei City".

![Question 2, age](/images/walkthrough/b3-q2-年齡.png)

Once answered you immediately see three changes:

- The center column shows your answer bubble (dark green, on the right) and the next question
- "10 questions left to complete the estimate" appears at the top right of the center column, with a progress line under the title
- The right column's "rental county" changes from "not yet provided" to "Taipei City", with "edit" appearing on the right; the "age" row becomes "asking…"
- The counter goes from 0 / 11 to **1 / 11 items**

The age question has no option buttons; it uses the input box, with the placeholder changed to "e.g. 28 (you can also type a question to me)".

### Question 2 — age

Enter `30` and submit.

![Question 3, marital status](/images/walkthrough/b4-q3-婚姻.png)

Marital status has four options, splitting the registration timing of newlyweds into separate questions (registered after 2026 / registered before end of 2025), because their bonus multipliers differ. When there are too many options for one line, they wrap automatically.

### Questions 3 and 4 — marital status, minor children

Choose "unmarried / single", and enter `0` for number of children.

![Question 5, economic disadvantage](/images/walkthrough/b6-q5-經濟弱勢.png)

By here the right column has filled in 4 items, and the center column can be scrolled back to see the complete question-and-answer record.

### Questions 5, 6, 7 — economic disadvantage, social disadvantage, household size

In turn choose "none", "no", and enter `1` for household size.

![Question 8, income threshold](/images/walkthrough/b9-q8-所得門檻快選.png)

### Question 8 — household monthly income

> Is your household's total monthly income below **61,137**?

61,137 is the income baseline for a single-person household in Taipei (3.0× the minimum cost of living), computed on the fly from the county and household size you entered earlier. The two buttons below, "below 61,137" / "61,137 or above", let you continue without stating your actual income; if you want to enter a precise figure, just type a number in the input box.

Here we enter `30000`.

### Questions 9 and 10 — self-owned home, property legality

![Question 10, property legality](/images/walkthrough/b11-q10-房屋合法性.png)

The property-legality options are written in plain language: "yes, a legal residence" / "no / not sure (e.g. rooftop addition, illegal structure)", and the question itself notes how to judge (has a property tax registration, has completed preservation registration, or has a legal certificate).

### Question 11 — other housing subsidies

![Question 11, other housing subsidies](/images/walkthrough/b12-q11-其他住宅補助.png)

The last question; the top right shows "1 question left to complete the estimate", and the right column reads 10 / 11 items.

---

## Stage 3: getting the estimation result

After the last question is answered, the system replies "Okay, I'm estimating for you…" and then sends the result card:

![Estimation result](/images/walkthrough/c1-結果卡.png)

Zooming in on the result card:

![Result card, zoomed](/images/walkthrough/c2-結果卡-放大.png)

The result isn't just one figure — it lays out the whole derivation:

| Item | Content |
|---|---|
| Income threshold check | Household total monthly income 30,000 ÷ 1 person = 30,000 per person; threshold 61,137 (3.0×) |
| Tier determination | 1 household member, age 30 under 40, no disadvantaged status → tier 3 |
| Base amount | Taipei tier 3 maximum monthly base subsidy = 3,000 |
| Bonus multiplier | Higher-of subsidy: single young person ×1.2 |
| Estimated amount | 3,000 × 1.2 = about **3,600** per month |

The card also has:

- A "**source**" link on the right of each row
- A red-text reminder: "the estimate does not account for the 'not exceeding actual rent' cap; the amount received is subject to actual rent"
- A dark green "**go to the official site to apply online**" button
- A disclaimer: an unofficial estimate, for reference only; the actual determination is subject to each county government's review

### Tap "source" to see the basis

Tap the "source" on the tier-determination row:

![Tapping source jumps the left column](/images/walkthrough/c3-點來源跳左欄.png)

The left "Sources" column jumps to the matching provision and **highlights the entire sentence** that justified the determination:

- Operating Rules, Point 2: "single young person: means a single person who is an adult under forty years old."
- Operating Rules, Point 4: "(2) all household members own no home."

In other words, every number on screen can be tapped back to the original regulation text — you don't have to take the system's word for it.

---

## Stage 4: change data, recompute

Suppose you got your age wrong. Tap "**edit**" on the right column's "age" row:

![Editing age](/images/walkthrough/d1-修改年齡-回題.png)

The result card disappears, the system re-asks "how old are you this year?", and the other 10 items are left untouched. Enter `45`:

![Recomputed at age 45](/images/walkthrough/d2-改45歲重算.png)

It recomputes immediately, and the whole set of numbers changes with it:

- The tier goes from tier 3 to **tier 2** (45 exceeds 40 and no longer meets the "single young person" age definition)
- The base amount 3,000 → **5,000**
- The bonus multiplier ×1.2 → **no bonus status, ×1.0**
- The estimated amount 3,600 → about **5,000** per month
- The right column's "age" updates to 45 in sync

The left column's citations swap to a different set too, matching the tier-2 determination.

### The right column's "recompute"

Once the data is complete, the "recompute" button at the bottom of the right column lights up (it's a disabled gray when data is incomplete). Pressing it sends a fresh card with this data set's latest result into the conversation:

![Recompute](/images/walkthrough/d3-重新試算.png)

### Don't want to interrupt the questionnaire? Use "add" to fill in data

While the questionnaire is still on the first question, you can also fill in any item directly from the right column. Tapping "**add**" on a row pops up a small window:

![Add popover, numeric question](/images/walkthrough/d4-新增彈窗-數字.png)

Numeric questions get an input box, option questions get buttons:

![Add popover, option question](/images/walkthrough/d5-新增彈窗-選項.png)

Once filled the window closes, the right column updates, and the center column's questionnaire stays on the original question, uninterrupted. Later, when the questionnaire reaches this question, it's skipped automatically and not asked again.

---

## Stage 5: interject with a question anytime

During or after the questionnaire, you can type a question directly in the input box. For example:

> How many months of deposit can be collected at most?

After submitting, the input box **grays out and locks**, and "thinking…" appears in the center column:

![Input locked while asking](/images/walkthrough/e1-提問中-輸入鎖定.png)

This is deliberate — to stop you from firing off submissions while the system is still searching. It unlocks automatically once the answer is done.

![The answer](/images/walkthrough/e2-提問回答.png)

Answer: "The deposit cap may not exceed a total of two months' rent." Below it comes a "reference sources" section, explaining the basis point by point with ❶ ❷ ❸ markers, and the left column grows three original regulation texts:

- Rental Housing Market Development and Management Act, Article 7
- Mandatory and Prohibited Provisions of the Standard Residential Lease Contract, Point 5
- Land Act, Article 99

Each item in the left column notes its amendment date and an "official source" link, with the word "deposit" highlighted.

### Hover a marker to see the original text

![Citation popover](/images/walkthrough/e3-引用彈窗.png)

Move the mouse over an inline number marker and a preview of that provision's original text pops up directly, so you don't have to look away to find it in the left column.

### Asking an out-of-scope question

> What's the weather like today?

![Off-topic declined](/images/walkthrough/e4-離題婉拒.png)

The system declines, but doesn't leave you at a dead end:

> I can only help with queries about the rent subsidy, renting, Long-Term Care 3.0, and career subsidies (Industry Pioneer, unemployment benefits) — ask me a different question.
>
> If you meant another topic (e.g. Long-Term Care 3.0), tap "⇄ switch topic" below to switch — your estimation progress will be kept.

Note that this kind of answer **attaches no citation marker**, and the left column isn't stuffed with irrelevant provisions. No basis, no pretending there is one.

---

## Stage 6: switch to another subsidy

The end of every question's option row has "**⇄ switch topic**". Tap it:

![Switch-topic menu](/images/walkthrough/f1-切換主題選單.png)

The system asks "which topic would you like to switch to? Your rent-subsidy estimation progress will be kept." Choose "10-Year Long-Term Care Plan 3.0":

![Long-term care mode](/images/walkthrough/f2-長照模式-進度保留.png)

Two changes are obvious on screen:

- The center column explains that long-term care is a pure Q&A topic, and gives two example questions
- A yellow banner appears at the top of the right column: "**rent-subsidy estimation progress kept (11 / 11 questions)**", next to a "back to rent-subsidy estimation" button. The 11 items below are all intact

Asking a long-term-care question:

> How is Long-Term Care 3.0's in-home respite service subsidized?

![Long-term care answer](/images/walkthrough/f3-長照回答.png)

The answer cites Appendix 2 and Appendix 4 of the "Long-Term Care Service Application and Payment Regulations", explaining that 2 hours count as 1 payment unit, the daily cap is 10 hours, general areas are 770 per 2 hours, and outlying islands and indigenous peoples add 20%.

The answer ends with a parenthetical note:

> (Part of this answer touches on case-specific amounts or eligibility determinations and has been omitted — such determinations are always made by this site's estimation questionnaire, which confirms your conditions question by question and computes them with deterministic rules, not by inference from Q&A.)

This is a hard rule of the system: **Q&A only states "what the rule is", it doesn't determine "how much you can get" for you.** Sentences involving case-specific amounts are intercepted, and it says plainly what was intercepted rather than quietly omitting it.

Tapping the right column's "back to rent-subsidy estimation" switches back to the rent-subsidy context:

![Back to rent-subsidy estimation](/images/walkthrough/f4-回到租補試算.png)

If you left the questionnaire midway, it resumes from the question you interrupted; since this time all 11 are already answered, it directly backfills a fresh estimation result (age 45, tier 2, 5,000), and the left column's sources switch back to the rent-subsidy provisions. The right column's yellow banner disappears, indicating you're back in the rent-subsidy flow.

---

## Interface options

### Thinking mode

To the left of the input box is a small "thinking: off" toggle; tapping it becomes "thinking: on":

![Thinking mode on](/images/walkthrough/g1-思考模式開.png)

Once on, the model spends more time reasoning when answering; answers are usually more complete but slower. This setting is remembered and kept on your next visit.

### Dark mode

The toggle at the top right:

![Dark mode](/images/walkthrough/g2-深色模式.png)

The three columns, citation markers, highlights, and buttons all recolor with it, and this is remembered too.

- The estimation result is an unofficial estimate; the actual determination is subject to each county government's review

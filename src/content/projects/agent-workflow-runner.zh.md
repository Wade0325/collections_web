---
title: Agent 工作流執行器
summary: 用 YAML 定義多步驟 AI 工作流，支援工具呼叫、重試與人工審核節點。
date: 2026-03-02
tags: [Agent, LLM]
cover: /images/placeholder-3.svg
github: https://github.com/Wade0325
featured: true
---

## 為什麼做這個

多數 agent 框架把流程藏在模型的決策裡，好處是彈性，壞處是**不可預測、難以除錯**。實務上很多任務的步驟其實是固定的，只有每一步的內容需要模型判斷。

所以這個執行器把「流程」與「判斷」分開：流程用 YAML 明確寫死，模型只負責單一步驟內的推理。

## 工作流定義

```yaml
name: pr-review
steps:
  - id: fetch
    tool: github.getDiff
    with:
      pr: ${input.prNumber}

  - id: analyse
    agent: reviewer
    prompt: |
      審查以下 diff，找出可能的 bug 與風格問題。
      ${steps.fetch.output}
    retry: 2

  - id: approve
    type: human
    when: ${steps.analyse.output.severity == "high"}

  - id: comment
    tool: github.postComment
```

## 幾個設計決定

1. **每一步都可重試** —— LLM 呼叫本質上不穩定，重試策略應該是框架層級的能力，而非每個節點各自實作。
2. **人工節點是一等公民** —— 高風險操作前插入 `type: human`，執行會暫停並等待核可。
3. **狀態可序列化** —— 整個執行狀態存成 JSON，可以中斷後續跑。

## 執行結果的型別

```typescript
type StepResult<T = unknown> = {
  id: string
  status: 'ok' | 'failed' | 'skipped' | 'awaiting-approval'
  output: T
  attempts: number
  durationMs: number
}
```

## 心得

把控制流從模型手上拿回來之後，除錯體驗好非常多 —— 出錯時能明確指出是哪一步、第幾次重試失敗，而不是盯著一長串 agent 的自言自語猜哪裡出問題。

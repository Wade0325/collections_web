---
title: Agent Workflow Runner
summary: Define multi-step AI workflows in YAML, with tool calls, retries, and human approval nodes.
date: 2026-03-02
tags: [Agent, LLM]
cover: /images/placeholder-3.svg
github: https://github.com/Wade0325
featured: true
---

## Why

Most agent frameworks hide control flow inside the model's decisions. That buys flexibility at the cost of being **unpredictable and hard to debug**. In practice many tasks have a fixed sequence of steps — only the content of each step needs a model.

So this runner separates *flow* from *judgment*: the flow is written explicitly in YAML, and the model only reasons within a single step.

## Workflow definition

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
      Review the following diff for likely bugs and style issues.
      ${steps.fetch.output}
    retry: 2

  - id: approve
    type: human
    when: ${steps.analyse.output.severity == "high"}

  - id: comment
    tool: github.postComment
```

## Design decisions

1. **Every step is retryable** — LLM calls are inherently flaky, so retry belongs in the framework, not re-implemented per node.
2. **Human nodes are first-class** — insert `type: human` before risky operations and execution pauses for approval.
3. **State is serializable** — the whole run state is JSON, so a run can be interrupted and resumed.

## Step result type

```typescript
type StepResult<T = unknown> = {
  id: string
  status: 'ok' | 'failed' | 'skipped' | 'awaiting-approval'
  output: T
  attempts: number
  durationMs: number
}
```

## Takeaway

Taking control flow back from the model made debugging dramatically better — a failure points at a specific step and retry attempt, instead of leaving you to guess from a long transcript of the agent talking to itself.

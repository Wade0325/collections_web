---
title: RAG Document Assistant
summary: An internal document retrieval system built on RAG, supporting multiple formats with source citations.
date: 2026-05-12
tags: [RAG, LangChain, Python, Vector DB]
cover: /images/placeholder-1.svg
github: https://github.com/Wade0325
featured: true
---

## Background

Internal policies, SOPs, and technical docs were scattered across different systems — finding one answer often meant digging through several PDFs. This project consolidates them behind a single Q&A entry point, and **every answer cites its source** so users can verify it themselves.

## Architecture

Three stages: preprocessing, retrieval, and generation.

![System architecture](/images/placeholder-2.svg)

### 1. Preprocessing

Supports PDF, Word, Markdown, and HTML. Chunking is semantic rather than fixed-width, so a coherent explanation never gets cut in half:

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=120,
    separators=["\n## ", "\n### ", "\n\n", "\n", ". ", " "],
)

chunks = splitter.split_documents(documents)
print(f"Produced {len(chunks)} chunks")
```

### 2. Retrieval

Hybrid search: vector retrieval finds semantically close candidates, BM25 adds exact keyword hits, and a reranker orders the final set.

| Strategy | Recall@5 | Avg. latency |
| --- | --- | --- |
| Vector only | 0.71 | 120 ms |
| BM25 only | 0.64 | 40 ms |
| Hybrid + Rerank | **0.89** | 310 ms |

> The latency cost of hybrid retrieval is worth it — nearly 20 points of recall, which shows up directly in answer quality.

### 3. Generation

The prompt constrains the model to the retrieved passages. When there is no answer, it says so instead of inventing something plausible.

```typescript
const systemPrompt = `You are an internal document assistant.

Rules:
1. Answer only from the content inside <context>.
2. Cite the source number after each claim, e.g. [1].
3. If <context> has no relevant information, say "Not found in the documents."`
```

## Results

- Average lookup time dropped from ~8 minutes of manual searching to 15 seconds
- Every answer is traceable for internal audit
- ~400 queries per week across 12 departments

## Next

- [ ] Query rewriting for multi-turn conversations
- [ ] Incremental indexing on document updates
- [x] Source citation with jump-to-original

---
title: 智慧文件問答助理
summary: 以 RAG 架構打造的企業內部文件檢索系統，支援多格式文件與來源引用。
date: 2026-05-12
tags: [RAG, LangChain, Python, Vector DB]
cover: /images/placeholder-1.svg
github: https://github.com/Wade0325
featured: true
---

## 專案背景

企業內部的規章、SOP 與技術文件散落在不同系統，同事要找一個答案常常得翻過好幾份 PDF。這個專案把這些文件收斂成單一問答入口，並且**每個回答都附上原文出處**，讓使用者能自行驗證。

## 系統架構

整體切成三段：文件前處理、向量檢索、答案生成。

![系統架構圖](/images/placeholder-2.svg)

### 1. 文件前處理

支援 PDF、Word、Markdown 與 HTML。切塊策略採用語意分段而非固定字元數，避免把一段完整說明從中切斷：

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=120,
    separators=["\n## ", "\n### ", "\n\n", "\n", "。", " "],
)

chunks = splitter.split_documents(documents)
print(f"共切出 {len(chunks)} 個片段")
```

### 2. 向量檢索

採用 hybrid search：先用向量檢索抓語意相近的候選，再用 BM25 補上關鍵字精準命中，最後透過 reranker 重排。

| 檢索策略 | Recall@5 | 平均延遲 |
| --- | --- | --- |
| 純向量 | 0.71 | 120 ms |
| 純 BM25 | 0.64 | 40 ms |
| Hybrid + Rerank | **0.89** | 310 ms |

> Hybrid 檢索的延遲成本是值得的 —— Recall 提升近 20 個百分點，直接反映在回答品質上。

### 3. 答案生成

提示詞要求模型只能依據提供的片段作答，找不到答案時明確說「文件中沒有相關資訊」，而不是編一個聽起來合理的答案。

```typescript
const systemPrompt = `你是企業文件問答助理。

規則：
1. 只根據 <context> 內的內容回答。
2. 每個論述後面標註來源編號，如 [1]。
3. 若 context 沒有相關資訊，直接回答「文件中沒有相關資訊」。`
```

## 成果

- 平均查詢時間從人工翻找的 8 分鐘降到 15 秒
- 回答附來源，內部稽核可追溯
- 每週約 400 次查詢，涵蓋 12 個部門

## 後續規劃

- [ ] 加入多輪對話的查詢改寫
- [ ] 文件更新時的增量索引
- [x] 來源引用與原文跳轉

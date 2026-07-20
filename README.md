# collections_web

Wade 的 AI 作品集網站 — 純靜態，TypeScript + React + Tailwind，部署在 GitHub Pages。

🔗 https://wade0325.github.io/collections_web/

## 開發

```bash
npm install
npm run dev      # http://localhost:5173/collections_web/
npm run build    # 型別檢查 + 產出 dist/
npm run preview  # 預覽 build 結果
```

## 新增一篇作品

1. 在 `src/content/projects/` 建立兩個檔案：`<slug>.zh.md` 與 `<slug>.en.md`
   （只放其中一種語言也可以，缺的那邊會自動 fallback）
2. 開頭寫 front-matter：

   ```md
   ---
   title: 作品標題
   summary: 一句話說明，會顯示在卡片上
   date: 2026-05-12
   tags: [RAG, Python]
   cover: /images/cover.png
   github: https://github.com/Wade0325/xxx
   demo: https://example.com
   featured: true
   ---

   正文…
   ```

   除了 `title` 與 `date` 之外都可省略。`featured: true` 會出現在首頁精選區。

3. 圖片放進 `public/images/`，在 md 裡用 `/images/xxx.png` 引用
   （站台 base path 會自動接上，不用寫 `/collections_web/`）
4. 存檔即可，dev server 會熱更新

支援 GFM：表格、任務清單、刪除線。程式碼區塊會自動高亮並附複製按鈕。

## 修改個人資訊

`src/site.config.ts` — 名字、首頁標語、自我介紹、社群連結都在這裡，中英文並列。
UI 介面文字在 `src/i18n/strings.ts`。

## 部署

推上 `main` 後由 `.github/workflows/deploy.yml` 自動建置並部署。
首次使用需到 repo **Settings → Pages → Source** 選擇 **GitHub Actions**。

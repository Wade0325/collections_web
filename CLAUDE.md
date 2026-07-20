# CLAUDE.md

個人 AI 作品集，純靜態站，部署在 GitHub Pages 專案頁。

## 架構要點

- **Vite `base` 是 `/collections_web/`**。任何站內資源路徑都要經過 `src/lib/assets.ts`
  的 `resolveAsset()`，不要在程式或 md 裡寫死 `/collections_web/`。
- **HashRouter，不是 BrowserRouter**。GitHub Pages 純靜態託管，深層路徑直接重整會 404。
- **文章在建置期打包**：`src/lib/posts.ts` 用 `import.meta.glob(..., { query: '?raw', eager: true })`
  讀 `src/content/projects/*.md`，執行期沒有額外請求。檔名慣例 `<slug>.<zh|en>.md`。
- **front-matter 自己解析**：`src/lib/frontmatter.ts`。刻意不用 gray-matter（依賴 Node `Buffer`）。
  它只支援 `key: value`、布林、行內與條列陣列 —— 加新語法要同步改這裡。
- **i18n 是自寫的 Context**：`src/context/LocaleContext.tsx` + `src/i18n/strings.ts`，
  透過 `useLocale()` 取得 `{ locale, t }`。字串一律走 `t('key')`，不要在元件裡寫死中英文。
- **`ProjectDetail` 是 lazy 載入的**。react-markdown + highlight.js 佔 bundle 約 2/3，
  刻意切成獨立 chunk。不要在 Home/Projects 匯入 `Markdown.tsx`，否則分割會失效。

## 樣式

Tailwind v4（`@tailwindcss/vite`，無 config 檔）。主題色定義在 `src/index.css` 的
CSS 變數，深色由 `<html class="dark">` 切換（`index.html` 有 no-flash inline script）。
用語意 utility（`text-fg` / `text-muted` / `border-line` / `bg-subtle` / `text-accent`），
不要直接寫 `text-zinc-500` 這類固定色，否則深色模式會壞。

Markdown 排版在 `src/components/Markdown.tsx` 逐元素指定 class，沒有用
`@tailwindcss/typography`。

## 驗證

`npm run build` 會先跑 `tsc -b`，型別錯誤會擋住建置。改動 UI 後用 `npm run dev`
實際看過首頁、作品列表、文章頁三個畫面，並確認深/淺主題與中/英切換都正常。

/**
 * 把 Markdown / front-matter 裡以 "/" 開頭的站內路徑，接上 Vite 的 base。
 *
 * 這樣文章只要寫 `/images/cover.png`，在 dev（base=/）與
 * GitHub Pages（base=/collections_web/）都會指到 public/images/cover.png。
 */
const BASE = import.meta.env.BASE_URL // 保證以 "/" 結尾

export function resolveAsset(path: string | undefined): string | undefined {
  if (!path) return undefined
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  if (!path.startsWith('/')) return path
  return BASE + path.slice(1)
}

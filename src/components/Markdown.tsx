import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { resolveAsset } from '../lib/assets'
import { CodeBlock } from './CodeBlock'

/** 從 hast 節點遞迴取出純文字，用來替標題產生錨點 id。 */
function nodeText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { value?: string; children?: unknown[] }
  if (typeof n.value === 'string') return n.value
  if (Array.isArray(n.children)) return n.children.map(nodeText).join('')
  return ''
}

/**
 * GitHub 風格的標題錨點 slug：小寫、去標點、每個空白各換一個連字號（不合併），
 * 保留中日韓字元。文章目錄裡的 `#錨點` 連結就是照這個規則產生的（例如
 * 「A → B」會得到 `a--b` 兩個連字號），兩邊一致才能跳轉。
 */
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-')
}

type HastNode = {
  type?: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

/**
 * rehype 外掛：在 mdast→hast 轉換階段替 h1–h4 掛上錨點 id，同名標題去重（-1、-2…）。
 * 刻意放在 transform（每份內容只跑一次）而非 React render 元件裡——後者在 StrictMode
 * 會被重複呼叫，用可變計數器產生 id 會多加一次而錯位。
 */
function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const counts = new Map<string, number>()
    const visit = (node: HastNode) => {
      if (node.type === 'element' && node.tagName && /^h[1-4]$/.test(node.tagName)) {
        const base = slugify(nodeText(node))
        if (base) {
          const seen = counts.get(base) ?? 0
          counts.set(base, seen + 1)
          node.properties = node.properties ?? {}
          if (node.properties.id == null) {
            node.properties.id = seen === 0 ? base : `${base}-${seen}`
          }
        }
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}

/**
 * 文章內文渲染。不使用 @tailwindcss/typography，直接為每個元素指定樣式，
 * 讓排版與站上的極簡風格對齊，也少一個相依套件。標題 id 由上面的 rehype 外掛掛上，
 * 這裡的標題元件只負責樣式，並把（含 id 的）props 原樣傳下去。
 */
const components: Components = {
  h1: (props) => <h1 className="text-fg mt-12 mb-4 text-2xl font-semibold tracking-tight" {...props} />,
  h2: (props) => (
    <h2
      className="text-fg border-line mt-12 mb-4 border-b pb-2 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props) => <h3 className="text-fg mt-8 mb-3 text-lg font-semibold" {...props} />,
  h4: (props) => <h4 className="text-fg mt-6 mb-2 text-base font-semibold" {...props} />,

  p: (props) => <p className="my-4 leading-[1.85]" {...props} />,

  a: ({ href, ...props }) => {
    // 站內錨點（#foo，但非 HashRouter 路由 #/…）：手動平滑捲動，
    // 不能讓瀏覽器改寫整段 hash，否則會打斷 HashRouter 的路徑。
    if (href && href.startsWith('#') && !href.startsWith('#/')) {
      return (
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault()
            const id = decodeURIComponent(href.slice(1))
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="text-accent underline decoration-1 underline-offset-3 hover:decoration-2"
          {...props}
        />
      )
    }
    return (
      <a
        href={resolveAsset(href) ?? href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer noopener' : undefined}
        className="text-accent underline decoration-1 underline-offset-3 hover:decoration-2"
        {...props}
      />
    )
  },

  ul: (props) => <ul className="my-4 list-disc space-y-1.5 pl-6 leading-[1.8]" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-1.5 pl-6 leading-[1.8]" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,

  blockquote: (props) => (
    <blockquote className="border-accent text-muted my-6 border-l-2 pl-4 italic" {...props} />
  ),

  hr: () => <hr className="border-line my-10" />,

  img: ({ src, alt, ...props }) => (
    <img
      src={resolveAsset(typeof src === 'string' ? src : undefined)}
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      className="border-line my-6 w-full rounded-lg border"
      {...props}
    />
  ),

  // 區塊程式碼由 CodeBlock 包裝（複製鈕 + 語言標籤）
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,

  code: ({ className, children, ...props }) => {
    const isInline = !className?.includes('language-')
    if (isInline) {
      return (
        <code
          className="bg-subtle border-line rounded border px-1.5 py-0.5 font-mono text-[0.85em]"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },

  table: (props) => (
    <div className="border-line my-6 overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-subtle" {...props} />,
  th: (props) => (
    <th className="border-line border-b px-4 py-2.5 text-left font-semibold" {...props} />
  ),
  td: (props) => <td className="border-line border-b px-4 py-2.5 align-top" {...props} />,
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="md-body text-fg text-[15px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeHeadingIds,
          [rehypeHighlight, { detect: true, ignoreMissing: true }],
        ]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

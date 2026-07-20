import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { resolveAsset } from '../lib/assets'
import { CodeBlock } from './CodeBlock'

/**
 * 文章內文渲染。不使用 @tailwindcss/typography，直接為每個元素指定樣式，
 * 讓排版與站上的極簡風格對齊，也少一個相依套件。
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

  a: ({ href, ...props }) => (
    <a
      href={resolveAsset(href) ?? href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noreferrer noopener' : undefined}
      className="text-accent underline decoration-1 underline-offset-3 hover:decoration-2"
      {...props}
    />
  ),

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
        rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

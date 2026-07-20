import { isValidElement, useRef, useState, type ReactNode } from 'react'
import { useLocale } from '../hooks/useLocale'
import { CheckIcon, CopyIcon } from './Icons'

/** 從 <pre> 的子 <code> 抓出 language-xxx 的語言名 */
function readLanguage(children: ReactNode): string | null {
  if (!isValidElement<{ className?: string }>(children)) return null
  const matched = children.props.className?.match(/language-([\w+-]+)/)
  return matched ? matched[1] : null
}

export function CodeBlock({ children }: { children?: ReactNode }) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const { t } = useLocale()

  const language = readLanguage(children)

  async function copy() {
    const text = preRef.current?.textContent
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // 非安全來源或使用者拒絕權限時無法複製，靜默略過
    }
  }

  return (
    <div className="md-code group relative my-6 overflow-hidden rounded-lg border border-[#2b2b31] bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-[#2b2b31] px-3 py-1.5">
        <span className="font-mono text-[11px] tracking-wide text-zinc-500 uppercase">
          {language ?? 'text'}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t('code.copied') : t('code.copy')}
          className="inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
        >
          {copied ? <CheckIcon width={13} height={13} /> : <CopyIcon width={13} height={13} />}
          {copied ? t('code.copied') : t('code.copy')}
        </button>
      </div>
      <pre ref={preRef} className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        {children}
      </pre>
    </div>
  )
}

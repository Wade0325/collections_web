import type { ReactNode } from 'react'

/**
 * 所有頁面的標題區塊，統一字級與下方間距。
 * 頁面不要自己寫 h1，走這裡才不會又長出三種尺寸。
 */
export function PageHeader({ title, description }: { title: string; description?: ReactNode }) {
  return (
    <header className="mb-8">
      <h1 className="text-fg text-2xl font-semibold tracking-tight text-balance sm:text-[2rem] sm:leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-muted mt-3 leading-relaxed">{description}</p>
      )}
    </header>
  )
}

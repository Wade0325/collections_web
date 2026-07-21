import type { ReactNode } from 'react'

/**
 * 全站唯一的水平外殼：標準部落格的單欄置中版面。
 * Header、Footer 與所有頁面都用它，所以左右邊界永遠是同一條線。
 *
 * 寬度只有這一個地方定義 —— 不要在頁面裡另外寫 max-w-*。
 */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-[65%] ${className}`}>{children}</div>
}

/**
 * 頁面層級的垂直留白。所有頁面用同一組數值，垂直節奏才一致。
 */
export function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <Container className={`py-10 sm:py-14 ${className}`}>{children}</Container>
}

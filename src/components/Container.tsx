import type { ReactNode } from 'react'

/**
 * 全站唯一的水平外殼。Header、Footer 與所有頁面都必須用它，
 * 這樣不管內容長短，左邊界都在同一條垂直線上。
 *
 * 寬度只有這一個地方定義 —— 不要在頁面裡另外寫 max-w-*。
 */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>
}

/**
 * 頁面層級的垂直留白。所有頁面用同一組數值，垂直節奏才一致。
 */
export function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <Container className={`py-16 sm:py-24 ${className}`}>{children}</Container>
}

/**
 * 長文的量測寬度（約 65 個字元）。靠左，不置中 ——
 * 置中會讓短頁面的內容偏離 Header 的左邊界。
 */
export function Measure({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[42rem] ${className}`}>{children}</div>
}

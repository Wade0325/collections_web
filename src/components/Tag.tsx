import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="bg-subtle border-line text-muted rounded-full border px-2.5 py-0.5 font-mono text-[11px]">
      {children}
    </span>
  )
}

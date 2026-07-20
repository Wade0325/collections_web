import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import type { Locale } from '../site.config'

type LocaleContextValue = {
  locale: Locale
  toggleLocale: () => void
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = 'locale'

function readInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    // 忽略
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hant' : 'en'
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      // 忽略
    }
  }, [locale])

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === 'zh' ? 'en' : 'zh'))
  }, [])

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>{children}</LocaleContext.Provider>
  )
}

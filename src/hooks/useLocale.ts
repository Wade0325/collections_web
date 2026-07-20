import { useContext, useMemo } from 'react'
import { LocaleContext } from '../context/LocaleContext'
import { translate, type StringKey } from '../i18n/strings'

/**
 * 回傳目前語言、切換函式，以及翻譯函式 t()。
 * 用法：const { locale, t } = useLocale(); t('nav.works')
 */
export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale 必須在 <LocaleProvider> 內使用')

  const { locale, toggleLocale } = context
  const t = useMemo(() => (key: StringKey) => translate(locale, key), [locale])

  return { locale, toggleLocale, t }
}

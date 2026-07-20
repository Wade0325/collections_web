import { useLocale } from '../hooks/useLocale'

export function LocaleToggle() {
  const { locale, toggleLocale, t } = useLocale()

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t('locale.toggle')}
      title={t('locale.toggle')}
      className="text-muted hover:text-fg inline-flex h-9 items-center rounded-md px-2 font-mono text-xs tracking-wide transition-colors"
    >
      <span className={locale === 'zh' ? 'text-fg font-semibold' : ''}>中</span>
      <span className="mx-1 opacity-40">/</span>
      <span className={locale === 'en' ? 'text-fg font-semibold' : ''}>EN</span>
    </button>
  )
}

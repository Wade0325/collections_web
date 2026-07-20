import { useTheme } from '../hooks/useTheme'
import { useLocale } from '../hooks/useLocale'
import { MoonIcon, SunIcon } from './Icons'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLocale()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
      className="text-muted hover:text-fg inline-flex size-9 items-center justify-center rounded-md transition-colors"
    >
      {theme === 'dark' ? <SunIcon width={18} height={18} /> : <MoonIcon width={18} height={18} />}
    </button>
  )
}

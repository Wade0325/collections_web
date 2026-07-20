import { Link } from 'react-router'
import { useLocale } from '../hooks/useLocale'

export function NotFound() {
  const { t } = useLocale()

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center sm:px-6">
      <p className="text-muted font-mono text-5xl">404</p>
      <h1 className="text-fg mt-4 text-xl font-semibold tracking-tight">{t('notfound.title')}</h1>
      <p className="text-muted mt-2 text-sm">{t('notfound.desc')}</p>
      <Link
        to="/"
        className="border-line text-fg hover:border-accent hover:text-accent mt-7 rounded-md border px-4 py-2 text-sm transition-colors"
      >
        {t('notfound.home')}
      </Link>
    </div>
  )
}

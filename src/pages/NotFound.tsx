import { Link } from 'react-router'
import { useLocale } from '../hooks/useLocale'
import { Page } from '../components/Container'

export function NotFound() {
  const { t } = useLocale()

  return (
    <Page>
      <div className="py-12">
        <p className="text-muted font-mono text-5xl">404</p>
        <h1 className="text-fg mt-4 text-2xl font-semibold tracking-tight">
          {t('notfound.title')}
        </h1>
        <p className="text-muted mt-3 leading-relaxed">{t('notfound.desc')}</p>
        <Link
          to="/"
          className="border-line text-fg hover:border-accent hover:text-accent mt-8 inline-block rounded-md border px-4 py-2 text-sm transition-colors"
        >
          {t('notfound.home')}
        </Link>
      </div>
    </Page>
  )
}

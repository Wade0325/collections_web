import { siteConfig } from '../site.config'
import { useLocale } from '../hooks/useLocale'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const { locale } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="border-line mt-24 border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-8 sm:flex-row sm:px-6">
        <p className="text-muted text-sm">
          © {year} {siteConfig.name[locale]}
        </p>
        <SocialLinks variant="compact" />
      </div>
    </footer>
  )
}

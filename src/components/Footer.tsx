import { siteConfig } from '../site.config'
import { useLocale } from '../hooks/useLocale'
import { SocialLinks } from './SocialLinks'
import { Container } from './Container'

export function Footer() {
  const { locale } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="border-line mt-24 border-t">
      <Container className="flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
        <p className="text-muted text-sm">
          © {year} {siteConfig.name[locale]}
        </p>
        <SocialLinks variant="compact" />
      </Container>
    </footer>
  )
}

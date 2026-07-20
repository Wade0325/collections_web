import { siteConfig } from '../site.config'
import { useLocale } from '../hooks/useLocale'
import { SocialLinks } from '../components/SocialLinks'
import { Measure, Page } from '../components/Container'
import { PageHeader } from '../components/PageHeader'

export function About() {
  const { locale, t } = useLocale()

  return (
    <Page>
      <PageHeader title={t('home.about')} />
      <Measure>
        <p className="leading-[1.9]">{siteConfig.about[locale]}</p>
      </Measure>
      <div className="mt-8">
        <SocialLinks />
      </div>
    </Page>
  )
}

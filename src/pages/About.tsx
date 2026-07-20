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
        {/* balance：中文可在任意漢字間斷行，短段落容易斷得很不平均 */}
        <p className="leading-[1.9] text-balance">{siteConfig.about[locale]}</p>
      </Measure>
      <div className="mt-8">
        <SocialLinks />
      </div>
    </Page>
  )
}

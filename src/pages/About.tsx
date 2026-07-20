import { siteConfig } from '../site.config'
import { useLocale } from '../hooks/useLocale'
import { SocialLinks } from '../components/SocialLinks'

export function About() {
  const { locale, t } = useLocale()

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
      <h1 className="text-fg text-2xl font-semibold tracking-tight sm:text-3xl">
        {t('home.about')}
      </h1>
      <p className="mt-6 leading-[1.9]">{siteConfig.about[locale]}</p>
      <div className="mt-8">
        <SocialLinks />
      </div>
    </div>
  )
}

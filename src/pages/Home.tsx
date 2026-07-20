import { Link } from 'react-router'
import { siteConfig } from '../site.config'
import { useLocale } from '../hooks/useLocale'
import { getFeaturedProjects, getProjects } from '../lib/posts'
import { ProjectCard } from '../components/ProjectCard'
import { SocialLinks } from '../components/SocialLinks'
import { Measure, Page } from '../components/Container'

export function Home() {
  const { locale, t } = useLocale()

  // 沒有任何 featured 標記時，退而顯示最新的幾篇，首頁才不會空著
  const featured = getFeaturedProjects(locale, siteConfig.featuredLimit)
  const projects =
    featured.length > 0 ? featured : getProjects(locale).slice(0, siteConfig.featuredLimit)

  return (
    <Page>
      <section className="mb-14 sm:mb-18">
        <Measure>
          <h1 className="text-fg text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-[2.5rem]">
            {siteConfig.headline[locale]}
          </h1>
          <p className="text-muted mt-4 leading-relaxed text-balance">
            {siteConfig.intro[locale]}
          </p>
        </Measure>
        <div className="mt-7">
          <SocialLinks />
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-fg text-lg font-semibold tracking-tight">{t('home.featured')}</h2>
          <Link to="/projects" className="text-muted hover:text-accent text-sm transition-colors">
            {t('home.viewAll')} →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </Page>
  )
}

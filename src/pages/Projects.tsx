import { useMemo, useState } from 'react'
import { useLocale } from '../hooks/useLocale'
import { getAllTags, getProjects } from '../lib/posts'
import { ProjectCard } from '../components/ProjectCard'
import { TagFilter } from '../components/TagFilter'
import { Page } from '../components/Container'
import { PageHeader } from '../components/PageHeader'

export function Projects() {
  const { locale, t } = useLocale()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const projects = useMemo(() => getProjects(locale), [locale])
  const tags = useMemo(() => getAllTags(locale), [locale])

  const visible = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects

  return (
    <Page>
      <PageHeader
        title={t('works.title')}
        description={
          <>
            {t('works.subtitle')}
            <span className="mx-2 opacity-40">·</span>
            <span className="font-mono">
              {visible.length} {t('works.count')}
            </span>
          </>
        }
      />

      {tags.length > 0 && (
        <div className="mb-8">
          <TagFilter tags={tags} active={activeTag} onChange={setActiveTag} />
        </div>
      )}

      {visible.length === 0 ? (
        <p className="text-muted border-line rounded-lg border border-dashed py-16 text-center text-sm">
          {t('works.empty')}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </Page>
  )
}

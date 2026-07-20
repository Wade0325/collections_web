import { Link, useParams } from 'react-router'
import { useEffect } from 'react'
import { useLocale } from '../hooks/useLocale'
import { formatDate, getProject } from '../lib/posts'
import { Markdown } from '../components/Markdown'
import { Tag } from '../components/Tag'
import { ArrowLeftIcon, ExternalLinkIcon, GitHubIcon } from '../components/Icons'
import { Page } from '../components/Container'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { locale, t } = useLocale()

  const project = slug ? getProject(slug, locale) : undefined

  useEffect(() => {
    if (project) document.title = `${project.title} — Wade`
    return () => {
      document.title = 'Wade — AI Portfolio'
    }
  }, [project])

  if (!project) return <NotFound />

  const isFallback = project.locale !== locale

  return (
    <Page>
      <article>
        <Link
          to="/projects"
          className="text-muted hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeftIcon width={15} height={15} />
          {t('post.back')}
        </Link>

        <header className="border-line mt-6 border-b pb-8">
          <h1 className="text-fg text-2xl font-semibold tracking-tight text-balance sm:text-[2rem] sm:leading-tight">
            {project.title}
          </h1>

          {project.summary && <p className="text-muted mt-3 leading-relaxed">{project.summary}</p>}

          <div className="text-muted mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-xs">{formatDate(project.date, locale)}</span>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          {(project.github || project.demo) && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-line text-fg hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
                >
                  <GitHubIcon width={15} height={15} />
                  {t('post.repo')}
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-line text-fg hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
                >
                  <ExternalLinkIcon width={15} height={15} />
                  {t('post.demo')}
                </a>
              )}
            </div>
          )}
        </header>

        {isFallback && (
          <p className="bg-accent-soft border-accent text-muted mt-6 rounded-md border-l-2 px-4 py-2.5 text-sm">
            {t('post.fallback')}
          </p>
        )}

        <div className="mt-2">
          <Markdown>{project.content}</Markdown>
        </div>
      </article>
    </Page>
  )
}

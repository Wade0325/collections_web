import { Link } from 'react-router'
import type { Project } from '../lib/posts'
import { formatDate } from '../lib/posts'
import { useLocale } from '../hooks/useLocale'
import { Tag } from './Tag'

export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocale()

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="border-line hover:border-accent group flex flex-col overflow-hidden rounded-lg border transition-colors"
    >
      {project.cover ? (
        <div className="bg-subtle aspect-[16/9] overflow-hidden">
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="bg-subtle border-line aspect-[16/9] border-b" />
      )}

      <div className="flex flex-1 flex-col p-4">
        <p className="text-muted font-mono text-[11px]">{formatDate(project.date, locale)}</p>

        <h3 className="text-fg group-hover:text-accent mt-1.5 font-semibold tracking-tight transition-colors">
          {project.title}
        </h3>

        <p className="text-muted mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed">
          {project.summary}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

import { asArray, asBoolean, asString, parseFrontmatter } from './frontmatter'
import { resolveAsset } from './assets'
import type { Locale } from '../site.config'

export type Project = {
  slug: string
  /** 這份內容實際的語言（可能因 fallback 而與請求的 locale 不同） */
  locale: Locale
  title: string
  summary: string
  /** ISO 日期字串，如 2026-05-01 */
  date: string
  tags: string[]
  cover?: string
  github?: string
  demo?: string
  featured: boolean
  /** 去掉 front-matter 後的 Markdown 本文 */
  content: string
}

/**
 * 檔名慣例：src/content/projects/<slug>.<locale>.md
 * 全部在建置期以 raw 字串打包進 bundle，執行期不需要額外請求。
 */
const modules = import.meta.glob('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const FILENAME = /\/([^/]+)\.(zh|en)\.md$/

/** slug → { zh?: Project, en?: Project } */
const bySlug = buildIndex()

function buildIndex() {
  const index = new Map<string, Partial<Record<Locale, Project>>>()

  for (const [path, raw] of Object.entries(modules)) {
    const matched = path.match(FILENAME)
    if (!matched) {
      console.warn(`[posts] 檔名不符合 <slug>.<zh|en>.md 慣例，已略過：${path}`)
      continue
    }

    const [, slug, locale] = matched as [string, string, Locale]
    const { data, content } = parseFrontmatter(raw)

    const project: Project = {
      slug,
      locale,
      title: asString(data.title, slug),
      summary: asString(data.summary),
      date: asString(data.date),
      tags: asArray(data.tags),
      cover: resolveAsset(asString(data.cover) || undefined),
      github: asString(data.github) || undefined,
      demo: asString(data.demo) || undefined,
      featured: asBoolean(data.featured),
      content,
    }

    const entry = index.get(slug) ?? {}
    entry[locale] = project
    index.set(slug, entry)
  }

  return index
}

/** 取指定語言版本；該語言缺檔時退回另一語言 */
function pick(
  entry: Partial<Record<Locale, Project>>,
  locale: Locale,
): Project | undefined {
  return entry[locale] ?? entry[locale === 'zh' ? 'en' : 'zh']
}

const byDateDesc = (a: Project, b: Project) => b.date.localeCompare(a.date)

export function getProjects(locale: Locale): Project[] {
  return [...bySlug.values()]
    .map((entry) => pick(entry, locale))
    .filter((project): project is Project => Boolean(project))
    .sort(byDateDesc)
}

export function getFeaturedProjects(locale: Locale, limit: number): Project[] {
  return getProjects(locale)
    .filter((project) => project.featured)
    .slice(0, limit)
}

export function getProject(slug: string, locale: Locale): Project | undefined {
  const entry = bySlug.get(slug)
  return entry ? pick(entry, locale) : undefined
}

/** 依出現次數排序的標籤列表 */
export function getAllTags(locale: Locale): string[] {
  const counts = new Map<string, number>()
  for (const project of getProjects(locale)) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}

export function formatDate(date: string, locale: Locale): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString(locale === 'zh' ? 'zh-TW' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

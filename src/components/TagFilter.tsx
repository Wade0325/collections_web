import { useLocale } from '../hooks/useLocale'

type Props = {
  tags: string[]
  /** null 代表「全部」 */
  active: string | null
  onChange: (tag: string | null) => void
}

export function TagFilter({ tags, active, onChange }: Props) {
  const { t } = useLocale()

  const chip = (isActive: boolean) =>
    `rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
      isActive
        ? 'border-accent text-accent bg-accent-soft'
        : 'border-line text-muted hover:text-fg'
    }`

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={() => onChange(null)} className={chip(active === null)}>
        {t('works.all')}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag === active ? null : tag)}
          className={chip(tag === active)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

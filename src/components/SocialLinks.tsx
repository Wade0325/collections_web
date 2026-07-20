import { siteConfig, type SocialLink } from '../site.config'
import { GitHubIcon, HuggingFaceIcon, LinkedInIcon, MailIcon } from './Icons'

const icons = {
  github: GitHubIcon,
  email: MailIcon,
  linkedin: LinkedInIcon,
  huggingface: HuggingFaceIcon,
} as const

type Props = {
  /** full：帶文字的按鈕（首頁 Hero）；compact：只有 icon（Footer） */
  variant?: 'full' | 'compact'
}

export function SocialLinks({ variant = 'full' }: Props) {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {siteConfig.socials.map((social) => (
        <li key={social.id}>
          <SocialAnchor social={social} variant={variant} />
        </li>
      ))}
    </ul>
  )
}

function SocialAnchor({ social, variant }: { social: SocialLink; variant: 'full' | 'compact' }) {
  const Icon = icons[social.id]
  const isExternal = social.href.startsWith('http')

  if (variant === 'compact') {
    return (
      <a
        href={social.href}
        aria-label={social.label}
        title={social.label}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        className="text-muted hover:text-accent inline-flex size-9 items-center justify-center rounded-md transition-colors"
      >
        <Icon width={18} height={18} />
      </a>
    )
  }

  return (
    <a
      href={social.href}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="border-line text-fg hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors"
    >
      <Icon />
      {social.label}
    </a>
  )
}

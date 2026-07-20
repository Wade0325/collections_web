import { NavLink } from 'react-router'
import { siteConfig } from '../site.config'
import { useLocale } from '../hooks/useLocale'
import type { StringKey } from '../i18n/strings'
import { Container } from './Container'
import { LocaleToggle } from './LocaleToggle'
import { ThemeToggle } from './ThemeToggle'

const navItems: { to: string; key: StringKey; end?: boolean }[] = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/projects', key: 'nav.works' },
  { to: '/about', key: 'nav.about' },
]

export function Header() {
  const { t } = useLocale()

  return (
    <header className="bg-page/80 border-line sticky top-0 z-20 border-b backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to="/" className="text-fg text-[15px] font-semibold tracking-tight">
          {siteConfig.brand}
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-md px-2.5 py-1.5 text-sm transition-colors sm:px-3 ${
                    isActive ? 'text-fg font-medium' : 'text-muted hover:text-fg'
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <span className="border-line mx-1 hidden h-5 border-l sm:inline-block" />

          <ThemeToggle />
          <LocaleToggle />
        </div>
      </Container>
    </header>
  )
}

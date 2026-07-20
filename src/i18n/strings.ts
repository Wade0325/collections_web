import type { Locale } from '../site.config'

const dict = {
  'nav.home': { zh: '首頁', en: 'Home' },
  'nav.works': { zh: '作品', en: 'Works' },
  'nav.about': { zh: '關於', en: 'About' },

  'home.featured': { zh: '精選作品', en: 'Featured Works' },
  'home.viewAll': { zh: '查看全部作品', en: 'View all works' },
  'home.about': { zh: '關於我', en: 'About Me' },

  'works.title': { zh: '全部作品', en: 'All Works' },
  'works.subtitle': {
    zh: '依時間排序，可用標籤篩選。',
    en: 'Sorted by date. Filter by tag.',
  },
  'works.all': { zh: '全部', en: 'All' },
  'works.empty': { zh: '這個標籤下還沒有作品。', en: 'No works under this tag yet.' },
  'works.count': { zh: '篇作品', en: 'works' },

  'post.back': { zh: '返回作品列表', en: 'Back to works' },
  'post.repo': { zh: '原始碼', en: 'Source' },
  'post.demo': { zh: '線上展示', en: 'Live Demo' },
  'post.fallback': {
    zh: '此篇尚無中文版本，以下顯示英文原文。',
    en: 'No English version yet — showing the original Chinese text.',
  },

  'code.copy': { zh: '複製', en: 'Copy' },
  'code.copied': { zh: '已複製', en: 'Copied' },

  'theme.toggle': { zh: '切換主題', en: 'Toggle theme' },
  'locale.toggle': { zh: '切換語言', en: 'Switch language' },

  'notfound.title': { zh: '找不到頁面', en: 'Page not found' },
  'notfound.desc': {
    zh: '你要找的頁面不存在，或已被移動。',
    en: 'The page you are looking for does not exist or has moved.',
  },
  'notfound.home': { zh: '回到首頁', en: 'Go home' },
} satisfies Record<string, Record<Locale, string>>

export type StringKey = keyof typeof dict

export function translate(locale: Locale, key: StringKey): string {
  return dict[key][locale]
}

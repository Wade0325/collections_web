export type Locale = 'zh' | 'en'

export type SocialLink = {
  /** 用於挑選 icon */
  id: 'github' | 'email' | 'linkedin' | 'huggingface'
  label: string
  href: string
}

type LocalizedText = Record<Locale, string>

export const siteConfig = {
  /** 顯示在 Header 左側 */
  brand: 'Wade',

  name: {
    zh: 'Wade',
    en: 'Wade',
  } satisfies LocalizedText,

  /** 首頁 Hero 大標 */
  headline: {
    zh: '紀錄一些 AI 相關的東西',
    en: 'Notes on the AI things I build.',
  } satisfies LocalizedText,

  /** 首頁 Hero 副標，1–2 行 */
  intro: {
    zh: '專注在 LLM 應用、RAG 檢索系統與工作流自動化。這裡收錄我做過的專案與筆記。',
    en: 'Focused on LLM applications, RAG retrieval systems, and workflow automation. A collection of what I have built.',
  } satisfies LocalizedText,

  /** 關於我區塊 */
  about: {
    zh: '我是一名開發者，在金融業有三年的後端工程師經驗，現在專注在將大型語言模型以及圖像生成模型應用到實際產品中 — 從資料前處理、向量檢索到 prompt 設計與部署，以及相關的工作流自動化與 AI Agent。',
    en: "I'm a developer with three years of backend engineering experience in finance, now focused on bringing large language models and image generation models into real products — from data preprocessing and vector retrieval to prompt design and deployment, along with the workflow automation and AI agents that tie it together.",
  } satisfies LocalizedText,

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Wade0325' },
    { id: 'email', label: 'Email', href: 'mailto:wl02014258@gmail.com' },
  ] as SocialLink[],

  /** 首頁精選作品最多顯示幾筆（featured: true 的文章） */
  featuredLimit: 3,
}

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
    zh: '我打造 AI 應用與工具。',
    en: 'I build AI applications and tools.',
  } satisfies LocalizedText,

  /** 首頁 Hero 副標，1–2 行 */
  intro: {
    zh: '專注在 LLM 應用、RAG 檢索系統與工作流自動化。這裡收錄我做過的專案與筆記。',
    en: 'Focused on LLM applications, RAG retrieval systems, and workflow automation. A collection of what I have built.',
  } satisfies LocalizedText,

  /** 關於我區塊 */
  about: {
    zh: '我是一名開發者，日常在做把大型語言模型接進真實產品的事：從資料前處理、向量檢索、提示詞設計到部署維運。喜歡把複雜的系統做得簡單好用。',
    en: 'I am a developer working on bringing large language models into real products — from data preprocessing and vector retrieval to prompt design and deployment. I like making complex systems feel simple.',
  } satisfies LocalizedText,

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Wade0325' },
    { id: 'email', label: 'Email', href: 'mailto:wl02014258@gmail.com' },
  ] as SocialLink[],

  /** 首頁精選作品最多顯示幾筆（featured: true 的文章） */
  featuredLimit: 3,
}

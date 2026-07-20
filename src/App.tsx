import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from './context/ThemeContext'
import { LocaleProvider } from './context/LocaleContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

// Markdown 渲染器（react-markdown + highlight.js）約佔 bundle 的 2/3，
// 只有文章頁需要，所以切成獨立 chunk 按需載入。
const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((m) => ({ default: m.ProjectDetail })),
)

/**
 * 用 HashRouter 而非 BrowserRouter：GitHub Pages 是純靜態託管，
 * 深層路徑直接重整會 404，除非做 404.html 轉址 hack。Hash 路由零設定。
 */
export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="projects" element={<Projects />} />
              <Route
                path="projects/:slug"
                element={
                  <Suspense fallback={<div className="min-h-[60vh]" />}>
                    <ProjectDetail />
                  </Suspense>
                }
              />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </LocaleProvider>
    </ThemeProvider>
  )
}

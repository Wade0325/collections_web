import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme 必須在 <ThemeProvider> 內使用')
  return context
}

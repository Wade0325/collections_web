/**
 * 極簡 YAML front-matter 解析器。
 *
 * 只支援作品集需要的子集，換取零依賴（gray-matter 需要 Node 的 Buffer，
 * 在瀏覽器端得額外 polyfill，不划算）：
 *   key: value              → string
 *   key: true / false       → boolean
 *   key: [a, b, c]          → string[]（行內陣列）
 *   key:                    → string[]（下方 "- item" 條列）
 *     - a
 *     - b
 * 值可用單/雙引號包住，會被去除。
 */
export type FrontmatterValue = string | boolean | string[]
export type Frontmatter = Record<string, FrontmatterValue>

const DELIMITER = /^---\s*$/

export function parseFrontmatter(raw: string): {
  data: Frontmatter
  content: string
} {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n')
  const lines = text.split('\n')

  if (!DELIMITER.test(lines[0] ?? '')) {
    return { data: {}, content: text.trim() }
  }

  const end = lines.findIndex((line, i) => i > 0 && DELIMITER.test(line))
  if (end === -1) {
    return { data: {}, content: text.trim() }
  }

  return {
    data: parseBlock(lines.slice(1, end)),
    content: lines.slice(end + 1).join('\n').trim(),
  }
}

function parseBlock(lines: string[]): Frontmatter {
  const data: Frontmatter = {}
  let listKey: string | null = null

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue

    // 延續中的條列式陣列
    const listItem = line.match(/^\s*-\s+(.*)$/)
    if (listItem && listKey) {
      ;(data[listKey] as string[]).push(unquote(listItem[1]))
      continue
    }

    const pair = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!pair) continue

    const [, key, rawValue] = pair
    const value = rawValue.trim()
    listKey = null

    if (value === '') {
      // 後續可能接 "- item"；若沒有就是空陣列
      data[key] = []
      listKey = key
    } else if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = splitInlineArray(value.slice(1, -1))
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true'
    } else {
      data[key] = unquote(value)
    }
  }

  return data
}

function splitInlineArray(inner: string): string[] {
  return inner
    .split(',')
    .map((item) => unquote(item.trim()))
    .filter(Boolean)
}

function unquote(value: string): string {
  const trimmed = value.trim()
  const quoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  return quoted ? trimmed.slice(1, -1) : trimmed
}

/* ── 取值輔助：把不確定的 front-matter 值收斂成期望型別 ───────── */

export function asString(value: FrontmatterValue | undefined, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

export function asBoolean(value: FrontmatterValue | undefined): boolean {
  return value === true
}

export function asArray(value: FrontmatterValue | undefined): string[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value) return [value]
  return []
}

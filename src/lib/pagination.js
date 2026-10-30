/**
 * Keyset ("cursor") pagination helpers.
 *
 * Offset pagination degrades badly at depth — the database still walks every
 * skipped row — so lists here page by the last row seen. The cursor is
 * (createdAt, id); id breaks ties so no row is ever shown twice or skipped
 * when two records share a timestamp.
 */

export const DEFAULT_PAGE_SIZE = 30
export const MAX_PAGE_SIZE = 100

export function parsePageSize(value, fallback = DEFAULT_PAGE_SIZE) {
  const n = Number.parseInt(value ?? '', 10)
  if (!Number.isFinite(n) || n <= 0) return fallback
  return Math.min(n, MAX_PAGE_SIZE)
}

export function encodeCursor(row) {
  if (!row) return null
  return Buffer.from(`${new Date(row.createdAt).toISOString()}|${row.id}`).toString('base64url')
}

export function decodeCursor(cursor) {
  if (!cursor) return null
  try {
    const [iso, id] = Buffer.from(cursor, 'base64url').toString('utf8').split('|')
    const createdAt = new Date(iso)
    if (!id || Number.isNaN(createdAt.getTime())) return null
    return { createdAt, id }
  } catch {
    return null
  }
}

/** `where` fragment that selects everything strictly after the cursor. */
export function cursorWhere(cursor) {
  const c = decodeCursor(cursor)
  if (!c) return undefined
  return {
    OR: [
      { createdAt: { lt: c.createdAt } },
      { createdAt: c.createdAt, id: { lt: c.id } },
    ],
  }
}

export const CURSOR_ORDER = [{ createdAt: 'desc' }, { id: 'desc' }]

/**
 * Takes one more row than asked for to decide `hasMore` without a COUNT.
 * Returns the trimmed rows plus the cursor for the next page.
 */
export function buildPage(rows, pageSize) {
  const hasMore = rows.length > pageSize
  const items = hasMore ? rows.slice(0, pageSize) : rows
  return {
    items,
    nextCursor: hasMore ? encodeCursor(items[items.length - 1]) : null,
    hasMore,
  }
}

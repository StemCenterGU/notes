/**
 * Simple in-memory TTL cache using a Map.
 * Intended for caching infrequently-changing, frequently-read data
 * within a single server process (e.g. Next.js route handlers).
 *
 * NOTE: This cache is per-process. In a multi-instance deployment each
 * instance maintains its own cache; invalidation is local only.
 */

/**
 * @typedef {{ value: unknown, expiresAt: number }} CacheEntry
 */

/**
 * Creates a new TTL cache instance.
 *
 * @param {number} ttl - Time-to-live in milliseconds.
 * @returns {{ get: (key: string) => unknown | null, set: (key: string, value: unknown) => void, invalidate: (key: string) => void, invalidateAll: () => void }}
 */
export function createCache(ttl) {
  /** @type {Map<string, CacheEntry>} */
  const store = new Map()

  /**
   * Retrieve a cached value. Returns null when the key is missing or expired.
   *
   * @param {string} key
   * @returns {unknown | null}
   */
  function get(key) {
    const entry = store.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiresAt) {
      store.delete(key)
      return null
    }

    return entry.value
  }

  /**
   * Store a value under the given key. Overwrites any existing entry.
   *
   * @param {string} key
   * @param {unknown} value
   */
  function set(key, value) {
    store.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    })
  }

  /**
   * Remove a single entry from the cache.
   *
   * @param {string} key
   */
  function invalidate(key) {
    store.delete(key)
  }

  /**
   * Remove all entries from the cache.
   */
  function invalidateAll() {
    store.clear()
  }

  return { get, set, invalidate, invalidateAll }
}

const FIVE_MINUTES = 5 * 60 * 1000

/** Cache for GET /api/academics */
export const academicsCache = createCache(FIVE_MINUTES)

/** Cache for GET /api/tags */
export const tagsCache = createCache(FIVE_MINUTES)

/** Cache for GET /api/departments */
export const departmentsCache = createCache(FIVE_MINUTES)

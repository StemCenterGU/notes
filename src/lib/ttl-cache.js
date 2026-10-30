/**
 * Minimal in-process TTL cache.
 *
 * Scope: one Node process. That is the right scope here — the app runs as a
 * persistent server, not serverless — but it means entries are NOT shared
 * across instances and are lost on restart. Only cache things that are cheap
 * to recompute and safe to serve a few seconds stale.
 */
const store = new Map()

export function cacheGet(key) {
  const hit = store.get(key)
  if (!hit) return undefined
  if (hit.expires < Date.now()) {
    store.delete(key)
    return undefined
  }
  return hit.value
}

export function cacheSet(key, value, ttlMs) {
  store.set(key, { value, expires: Date.now() + ttlMs })
  // Opportunistic sweep so the map cannot grow without bound.
  if (store.size > 500) {
    const now = Date.now()
    for (const [k, v] of store) if (v.expires < now) store.delete(k)
  }
  return value
}

export function cacheDelete(prefix) {
  for (const k of store.keys()) if (k.startsWith(prefix)) store.delete(k)
}

/** Read-through helper. `fn` only runs on a miss. */
export async function cached(key, ttlMs, fn) {
  const hit = cacheGet(key)
  if (hit !== undefined) return hit
  return cacheSet(key, await fn(), ttlMs)
}

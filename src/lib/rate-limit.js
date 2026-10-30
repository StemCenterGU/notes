/**
 * Fixed-window rate limiter.
 *
 * In-process, so the real budget is (limit x instance count). That is fine as
 * a brute-force brake but is NOT a billing-grade quota — move this to Redis
 * before running more than a couple of instances.
 */
const windows = new Map()

export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now()
  const entry = windows.get(key)

  if (!entry || entry.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    if (windows.size > 10_000) {
      for (const [k, v] of windows) if (v.resetAt <= now) windows.delete(k)
    }
    return { allowed: true, remaining: limit - 1, retryAfterMs: 0 }
  }

  entry.count += 1
  if (entry.count > limit) {
    return { allowed: false, remaining: 0, retryAfterMs: entry.resetAt - now }
  }
  return { allowed: true, remaining: limit - entry.count, retryAfterMs: 0 }
}

/** Best-effort client address behind a proxy/load balancer. */
export function clientKey(req, prefix = '') {
  const fwd = req.headers.get('x-forwarded-for') || ''
  const ip = fwd.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
  return `${prefix}:${ip}`
}
/**
 * Request-scoped limiter with a `.check(req)` interface.
 *
 * Write endpoints share this shape so a route only has to say which bucket it
 * belongs to. Built on rateLimit() above, so there is one window store.
 */
function makeLimiter(name, { interval, limit }) {
  return {
    check(req) {
      const { allowed, remaining, retryAfterMs } = rateLimit(clientKey(req, name), {
        limit,
        windowMs: interval,
      })
      return { success: allowed, remaining, reset: Date.now() + retryAfterMs }
    },
  }
}

/** Auth-related endpoints: 10 requests per minute per IP. */
export const authLimiter = makeLimiter('auth', { interval: 60_000, limit: 10 })

/** Write operations (POST/PUT/DELETE): 30 requests per minute per IP. */
export const writeLimiter = makeLimiter('write', { interval: 60_000, limit: 30 })

/** Read operations (GET): 60 requests per minute per IP. */
export const readLimiter = makeLimiter('read', { interval: 60_000, limit: 60 })

/**
 * In-memory sliding window rate limiter.
 * No external dependencies - uses a Map keyed by IP address.
 *
 * Each entry stores an array of request timestamps within the current window.
 * Expired timestamps are pruned on every check, and a periodic cleanup job
 * removes keys that have had no activity for longer than the interval so the
 * Map does not grow unbounded.
 */

/**
 * Creates a rate limiter instance.
 *
 * @param {object} options
 * @param {number} options.interval - Window size in milliseconds.
 * @param {number} options.limit    - Maximum number of requests allowed per window.
 * @returns {{ check: (request: Request) => { success: boolean, remaining: number, reset: number } }}
 */
export function rateLimit({ interval, limit }) {
  // Map<ip, number[]> — stores timestamps of recent requests per IP
  const store = new Map()

  // Periodically remove IPs that have had no requests in the last interval.
  // This prevents memory from growing if many unique IPs hit the server once.
  const cleanupTimer = setInterval(() => {
    const now = Date.now()
    for (const [ip, timestamps] of store) {
      const active = timestamps.filter((t) => now - t < interval)
      if (active.length === 0) {
        store.delete(ip)
      } else {
        store.set(ip, active)
      }
    }
  }, interval)

  // In Next.js serverless/edge environments the process may not stay alive long
  // enough to need cleanup, but we unref the timer when possible so it does not
  // prevent Node.js from exiting in long-running development servers.
  if (cleanupTimer.unref) {
    cleanupTimer.unref()
  }

  /**
   * Extracts the client IP from a Next.js request object.
   * Falls back through common proxy headers before using a placeholder.
   *
   * @param {Request} request
   * @returns {string}
   */
  function getIP(request) {
    // Next.js 15 App Router exposes headers via request.headers
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
      // x-forwarded-for may contain a comma-separated list; the first entry is
      // the original client IP.
      return forwarded.split(',')[0].trim()
    }
    return request.headers.get('x-real-ip') ?? 'unknown'
  }

  /**
   * Checks whether the caller identified by IP is within their rate limit.
   *
   * @param {Request} request - The incoming Next.js App Router request.
   * @returns {{ success: boolean, remaining: number, reset: number }}
   *   success   - true if the request is allowed, false if it is rate-limited.
   *   remaining - number of requests the caller may still make in this window.
   *   reset     - Unix timestamp (ms) when the oldest request in the window expires.
   */
  function check(request) {
    const now = Date.now()
    const ip = getIP(request)

    const timestamps = store.get(ip) ?? []

    // Drop timestamps that fall outside the sliding window
    const windowStart = now - interval
    const active = timestamps.filter((t) => t > windowStart)

    if (active.length >= limit) {
      // Caller has exhausted their quota; compute when the window next frees up.
      const oldest = Math.min(...active)
      const reset = oldest + interval

      store.set(ip, active)
      return { success: false, remaining: 0, reset }
    }

    // Request is within quota — record this timestamp
    active.push(now)
    store.set(ip, active)

    const oldest = Math.min(...active)
    const reset = oldest + interval

    return {
      success: true,
      remaining: limit - active.length,
      reset,
    }
  }

  return { check }
}

// ---------------------------------------------------------------------------
// Pre-configured limiter instances
// ---------------------------------------------------------------------------

/** For auth-related endpoints: 10 requests per minute. */
export const authLimiter = rateLimit({ interval: 60_000, limit: 10 })

/** For write operations (POST/PUT/DELETE): 30 requests per minute. */
export const writeLimiter = rateLimit({ interval: 60_000, limit: 30 })

/** For read operations (GET): 60 requests per minute. */
export const readLimiter = rateLimit({ interval: 60_000, limit: 60 })

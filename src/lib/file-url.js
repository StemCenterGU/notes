import { supabaseAdmin } from '@/lib/supabase-admin'
import { cached } from '@/lib/ttl-cache'

/**
 * How long a viewer link stays valid. Long enough to open and read a document,
 * short enough that a leaked URL is not a permanent back door.
 */
const TTL_SECONDS = 15 * 60

/**
 * Mint a short-lived signed URL for a stored note file.
 *
 * The `notes` bucket is private, so this is the only way to read a file over
 * HTTP. Call it *after* the caller has passed the route's authorization check:
 * the URL itself carries no identity, so handing one out IS granting access.
 *
 * Returns null when signing fails, so callers render a "can't load" state
 * rather than leaking an error page.
 */
export async function signedUrlFor(filePath, ttlSeconds = TTL_SECONDS) {
  if (!filePath) return null

  // Signing is an HTTP call to Supabase, and a popular note is opened over and
  // over. Reuse a URL for a third of its life, so every URL handed out still
  // has at least two thirds of its validity left.
  return cached(`signedurl:${filePath}:${ttlSeconds}`, (ttlSeconds * 1000) / 3, async () => {
    const { data, error } = await supabaseAdmin.storage
      .from('notes')
      .createSignedUrl(filePath, ttlSeconds)

    if (error) {
      console.error('[signedUrlFor]', filePath, error.message)
      return null
    }
    return data.signedUrl
  })
}

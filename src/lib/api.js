/*
  Talks to wtl-backend's /api/register route (Nitish-ku/wtl-backend,
  src/routes/register.js) instead of writing directly to Firestore from the
  browser. That's the whole point of this rebuild. The backend validates,
  rate-limits, and atomically de-dupes; this file's only job is to call it
  and translate its response into something a form component can react to.

  VITE_API_BASE_URL is read from .env files (see .env.development). Vite
  only exposes env vars prefixed with VITE_ to client code, everything else
  stays server-only by default. Nothing secret belongs in this value, it's
  just an environment-specific URL.
*/
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// 15 seconds: long enough for a slow mobile connection, short enough that a
// user isn't staring at "Saving your spot..." indefinitely if the backend
// (or the network path to it) has hung.
const REQUEST_TIMEOUT_MS = 15000

/*
  Carries the HTTP status and parsed response body of a non-2xx response, so
  callers can branch on what actually happened (400 field-validation error,
  429 rate limit, 500 unknown failure) instead of treating every failure the
  same way. `status` is null for a request that never got a response at all
  (network failure or the timeout below), which callers use to distinguish
  "the backend told us no" from "we don't know what happened".
*/
export class ApiError extends Error {
  constructor(message, { status = null, body = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function submitRegistration(payload) {
  const controller = new AbortController()
  // Manual setTimeout + AbortController instead of AbortSignal.timeout(),
  // which isn't available in every browser this page needs to support.
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let res
  try {
    res = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch (err) {
    const message = err.name === 'AbortError' ? 'Request timed out' : 'Network error'
    throw new ApiError(message, { status: null, body: null })
  } finally {
    clearTimeout(timeoutId)
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new ApiError(data.error || `Registration failed (${res.status})`, { status: res.status, body: data })
  }

  return data
}

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

export async function submitRegistration(payload) {
  const res = await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.error || `Registration failed (${res.status})`)
  }

  return data
}

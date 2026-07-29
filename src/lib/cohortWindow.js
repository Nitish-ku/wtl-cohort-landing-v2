// Recurring live-cohort window: Friday 9:00 AM IST through the following
// Monday 9:00 AM IST (72 hours), repeating every week. Ported from the
// production index.html's getMostRecentFriday930UTC()/updateCountdown()
// logic, but split into pure functions with no DOM access. This module
// only computes numbers, it never touches the page. That's what lets it be
// unit-tested and reused by a React hook (see useCohortWindow.js) instead
// of being tangled into 100 lines of imperative document.getElementById calls.

const LIVE_MS = 72 * 60 * 60 * 1000
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

// Flip to false when Cohort 02 wraps and no new cohort is scheduled yet.
export let COHORT_ACTIVE = true

// Test-only seam: an imported binding can't be reassigned from outside this
// module (ES modules make imports read-only regardless of const/let), so the
// "no cohort scheduled" boundary case needs this tiny setter to be
// exercisable at all. Nothing in app code calls this, only cohortWindow.test.js.
export function __setCohortActiveForTests(value) {
  COHORT_ACTIVE = value
}

// Returns the most recent Friday 03:30:00.000 UTC (= 9:00 AM IST) at or before `now`.
export function getMostRecentFriday930UTC(now) {
  const candidate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 3, 30, 0, 0)
  )
  const day = now.getUTCDay() // 0=Sun..6=Sat, Friday=5
  const daysSinceFriday = (day - 5 + 7) % 7 // 0 if today is Friday
  let base = new Date(candidate.getTime() - daysSinceFriday * 24 * 60 * 60 * 1000)
  if (daysSinceFriday === 0 && now.getTime() < candidate.getTime()) {
    // it's Friday but before 9 AM IST, so the "most recent" window is last week's
    base = new Date(base.getTime() - WEEK_MS)
  }
  return base
}

// Returns { isLive, msRemaining } for the given instant.
// msRemaining counts down to windowEnd while live, or to next windowStart while not live.
export function getCohortStatus(now = new Date()) {
  if (!COHORT_ACTIVE) {
    return { isLive: false, msRemaining: null }
  }

  const windowStart = getMostRecentFriday930UTC(now)
  const windowEnd = new Date(windowStart.getTime() + LIVE_MS)
  const isLive = now.getTime() < windowEnd.getTime()

  const msRemaining = isLive
    ? windowEnd.getTime() - now.getTime()
    : windowStart.getTime() + WEEK_MS - now.getTime()

  return { isLive, msRemaining }
}

export function formatCountdown(ms) {
  if (ms == null) return 'Coming soon'
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return (d > 0 ? `${d}d ` : '') + `${h}h ${m}m ${s}s`
}

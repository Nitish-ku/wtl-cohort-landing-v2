import { describe, it, expect, afterEach } from 'vitest'
import {
  getCohortStatus,
  getMostRecentFriday930UTC,
  formatCountdown,
  __setCohortActiveForTests,
} from './cohortWindow'

// Reference week used throughout: Friday 2026-07-31 03:30 UTC (= 9:00 AM
// IST) through Monday 2026-08-03 03:30 UTC.
const THIS_FRIDAY_930 = Date.UTC(2026, 6, 31, 3, 30, 0, 0)
const LAST_FRIDAY_930 = Date.UTC(2026, 6, 24, 3, 30, 0, 0)

afterEach(() => {
  __setCohortActiveForTests(true)
})

describe('getMostRecentFriday930UTC', () => {
  it('rolls back to last week when it is Friday but before 9 AM IST', () => {
    const now = new Date(THIS_FRIDAY_930 - 1) // 03:29:59.999 UTC this Friday
    expect(getMostRecentFriday930UTC(now).getTime()).toBe(LAST_FRIDAY_930)
  })

  it('uses this week once it is Friday 9 AM IST or later', () => {
    const now = new Date(THIS_FRIDAY_930 + 1) // 03:30:00.001 UTC this Friday
    expect(getMostRecentFriday930UTC(now).getTime()).toBe(THIS_FRIDAY_930)
  })
})

describe('getCohortStatus boundary cases', () => {
  it('is not live one millisecond before Friday 9 AM IST', () => {
    const now = new Date(THIS_FRIDAY_930 - 1)
    const status = getCohortStatus(now)
    expect(status.isLive).toBe(false)
    expect(status.msRemaining).toBe(1)
  })

  it('is live one millisecond after Friday 9 AM IST', () => {
    const now = new Date(THIS_FRIDAY_930 + 1)
    const status = getCohortStatus(now)
    expect(status.isLive).toBe(true)
    expect(status.msRemaining).toBe(72 * 60 * 60 * 1000 - 1)
  })

  it('is live mid-window (Saturday)', () => {
    const now = new Date(Date.UTC(2026, 7, 1, 12, 0, 0, 0))
    const status = getCohortStatus(now)
    expect(status.isLive).toBe(true)
    expect(status.msRemaining).toBe(142200000)
  })

  it('is closed exactly at the 72-hour edge (Monday 9 AM IST)', () => {
    const now = new Date(Date.UTC(2026, 7, 3, 3, 30, 0, 0))
    const status = getCohortStatus(now)
    expect(status.isLive).toBe(false)
    // Counts down to next Friday's window, a full week after last week's start.
    expect(status.msRemaining).toBe(345600000)
  })

  it('is one millisecond before the 72-hour edge is still live', () => {
    const now = new Date(Date.UTC(2026, 7, 3, 3, 29, 59, 999))
    const status = getCohortStatus(now)
    expect(status.isLive).toBe(true)
    expect(status.msRemaining).toBe(1)
  })

  it('reports not live with no countdown when no cohort is scheduled', () => {
    __setCohortActiveForTests(false)
    const status = getCohortStatus(new Date(Date.UTC(2026, 7, 1, 12, 0, 0, 0)))
    expect(status).toEqual({ isLive: false, msRemaining: null })
  })
})

describe('formatCountdown', () => {
  it('renders "Coming soon" for a null duration', () => {
    expect(formatCountdown(null)).toBe('Coming soon')
  })

  it('renders days, hours, minutes, seconds for a multi-day duration', () => {
    expect(formatCountdown(345600000)).toBe('4d 0h 0m 0s')
  })

  it('omits the day segment under 24 hours', () => {
    expect(formatCountdown(3661000)).toBe('1h 1m 1s')
  })
})

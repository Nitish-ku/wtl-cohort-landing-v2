import { useEffect, useState } from 'react'
import { getCohortStatus, formatCountdown } from '../lib/cohortWindow'

/*
  This is the React-idiomatic replacement for the old page's updateCountdown().
  The old version directly wrote into ~10 different DOM elements by ID every
  second (imperative: "go find this element, set its text"). Here, the hook
  just holds *state* (isLive, countdownText) and re-computes it every second.
  React re-renders whichever components read that state automatically. No
  component needs to know or care that a timer is involved.
*/
export function useCohortWindow() {
  const [status, setStatus] = useState(() => getCohortStatus())

  useEffect(() => {
    const tick = () => setStatus(getCohortStatus())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return {
    isLive: status.isLive,
    countdownText: formatCountdown(status.msRemaining),
  }
}

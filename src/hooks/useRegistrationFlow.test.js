import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRegistrationFlow } from './useRegistrationFlow'
import { ApiError } from '../lib/api'

vi.mock('../lib/api', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    submitRegistration: vi.fn(),
  }
})

import { submitRegistration } from '../lib/api'

function fillValidFields(result) {
  act(() => {
    result.current.setField('name', 'Nitish Kumar')
    result.current.setField('email', 'nitish@example.com')
    result.current.setField('phone', '9876543210')
    result.current.setField('chronotype', 'early_bird')
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.useFakeTimers()
})

afterEach(() => {
  // Never advanced past the overlay's scheduled redirect, so window.location
  // is never actually assigned during these tests, jsdom doesn't need to
  // navigate anywhere.
  vi.useRealTimers()
})

describe('useRegistrationFlow submit debounce', () => {
  it('two rapid submit calls produce exactly one network call', async () => {
    submitRegistration.mockResolvedValue({ success: true })
    const { result } = renderHook(() => useRegistrationFlow({ isLive: false }))
    fillValidFields(result)

    await act(async () => {
      const first = result.current.handleSubmit()
      const second = result.current.handleSubmit()
      await Promise.all([first, second])
    })

    expect(submitRegistration).toHaveBeenCalledTimes(1)
  })
})

describe('useRegistrationFlow failure handling', () => {
  it('never shows success copy or opens the paid interstitial on a failed save', async () => {
    submitRegistration.mockRejectedValue(new ApiError('Network error', { status: null, body: null }))
    const { result } = renderHook(() => useRegistrationFlow({ isLive: false }))
    fillValidFields(result)
    act(() => {
      result.current.setBumpIntent(true)
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(result.current.overlay).toBe('confirm')
    expect(result.current.confirmState.message).toContain("couldn't confirm")
    expect(result.current.confirmState.heading).not.toBe("You're in.")
  })

  it('shows the couldn\'t-confirm copy for a 500 response', async () => {
    submitRegistration.mockRejectedValue(
      new ApiError('Registration failed. Please try again in a moment.', {
        status: 500,
        body: { error: 'Registration failed. Please try again in a moment.' },
      })
    )
    const { result } = renderHook(() => useRegistrationFlow({ isLive: false }))
    fillValidFields(result)

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(result.current.overlay).toBe('confirm')
    expect(result.current.confirmState.message).toContain("couldn't confirm")
    expect(result.current.confirmState.message).toContain('hello@wiredtolaunch.in')
  })

  it('shows the distinct already-registered copy for a 429 response, not the couldn\'t-confirm copy', async () => {
    submitRegistration.mockRejectedValue(
      new ApiError('Too many registration attempts', {
        status: 429,
        body: { error: 'Too many registration attempts, please try again later.' },
      })
    )
    const { result } = renderHook(() => useRegistrationFlow({ isLive: false }))
    fillValidFields(result)

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(result.current.overlay).toBe('confirm')
    expect(result.current.confirmState.message).toContain('already tried')
    expect(result.current.confirmState.message).not.toContain("couldn't confirm")
  })

  it('treats a 400 field-validation response as a validation failure, not a save failure', async () => {
    submitRegistration.mockRejectedValue(
      new ApiError('Invalid input', {
        status: 400,
        body: { error: 'Invalid input', errors: { email: 'Enter a valid email' } },
      })
    )
    const { result } = renderHook(() => useRegistrationFlow({ isLive: false }))
    fillValidFields(result)

    let outcome
    await act(async () => {
      outcome = await result.current.handleSubmit()
    })

    expect(outcome.validationFailed).toBe(true)
    expect(outcome.ok).toBe(false)
    expect(result.current.overlay).toBeNull()
    expect(result.current.errors.email).toBe('Enter a valid email')
  })

  it('proceeds to the paid interstitial only when the save actually succeeded', async () => {
    submitRegistration.mockResolvedValue({ success: true })
    const { result } = renderHook(() => useRegistrationFlow({ isLive: false }))
    fillValidFields(result)
    act(() => {
      result.current.setBumpIntent(true)
    })

    await act(async () => {
      await result.current.handleSubmit()
    })

    expect(result.current.overlay).toBe('interstitial')
  })
})

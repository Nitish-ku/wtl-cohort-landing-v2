import { useCallback, useEffect, useRef, useState } from 'react'
import { submitRegistration } from '../lib/api'
import { validateRegistration, isValid } from '../lib/validation'
import { getSrcFromHostname } from '../lib/srcMap'

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/C7putrWEbyH9hHJvR5JEDw?mode=gi_t'
const COSMOFEED_URL = 'https://superprofile.bio/vp/the-72-hour-founder-sprint'

/*
  All registration-flow *state* lives here; every section component that
  needs a piece of it (form fields, the sticky CTA, the paid-upsell modal,
  the confirmation overlay) reads from this one hook instead of each owning
  its own copy. This is the same "single source of truth" idea the old page
  approximated with global `let` variables (isLive, bumpSelected, saved,
  submitInFlight) scattered across one <script> tag, here it's one object,
  explicit about what's state (useState) vs. what's just a flag that must
  never trigger a re-render on its own (useRef).
*/
export function useRegistrationFlow({ isLive }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', chronotype: null })
  const [errors, setErrors] = useState({})
  const [bumpIntent, setBumpIntent] = useState(false)
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [overlay, setOverlay] = useState(null) // null | 'interstitial' | 'confirm'
  const [confirmState, setConfirmState] = useState(null)

  // Guards, not UI state: a ref update doesn't re-render, which is exactly
  // right for "has this async action already started" flags.
  const submitInFlight = useRef(false)
  const redirecting = useRef(false)
  const lastSaveOk = useRef(true)

  // Order-bump upsell is a same-cohort deal; once the cohort goes live it's
  // no longer for sale, so force it off (mirrors updateCountdown()'s
  // bumpCheck.classList.add("disabled") in the original page).
  useEffect(() => {
    if (isLive) setBumpIntent(false)
  }, [isLive])

  // bfcache: if the user hits Back into this page from WhatsApp/Cosmofeed,
  // reset every in-flight guard so they don't land on a stuck overlay.
  useEffect(() => {
    function onPageShow(e) {
      if (e.persisted) {
        setOverlay(null)
        redirecting.current = false
        submitInFlight.current = false
      }
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  function setField(key, value) {
    setFields((f) => ({ ...f, [key]: value }))
  }

  function freeConfirmCopy(didSave) {
    if (!didSave) {
      return {
        badge: 'Almost there',
        heading: 'Almost there.',
        message:
          "We couldn't confirm your registration just now. You're still welcome to join the group, and if you don't hear from us within a day, email hello@wiredtolaunch.in so we can add you manually.",
      }
    }
    return isLive
      ? { badge: '✓ Registration confirmed', heading: "You're in.", message: 'This cohort is already underway, redirecting you to the WhatsApp group...' }
      : { badge: '✓ Registration confirmed', heading: "You're in.", message: 'Redirecting you to WhatsApp...' }
  }

  const showConfirmationThenRedirect = useCallback((url, label, heading, message, badge, fallbackText) => {
    if (redirecting.current) return
    redirecting.current = true
    setConfirmState({ url, label, heading, message, badge: badge || '✓ Registration confirmed', fallbackText: fallbackText || 'Tap here to continue' })
    setOverlay('confirm')
    // Left showing through and after the redirect fires, deliberately: on mobile, WhatsApp's
    // OS handoff can leave this tab sitting un-navigated, so hiding the overlay here would drop
    // the user back into a fully interactive page with no visible confirmation of what happened.
    setTimeout(() => {
      window.location.href = url
    }, 1400)
  }, [])

  async function handleSubmit() {
    if (submitInFlight.current) return { ok: false, validationFailed: false }
    submitInFlight.current = true

    const fieldErrors = validateRegistration(fields)
    if (!isValid(fieldErrors)) {
      setErrors(fieldErrors)
      submitInFlight.current = false
      return { ok: false, validationFailed: true }
    }
    setErrors({})

    const bumpSnapshot = bumpIntent
    setSubmitting(true)

    let saved = false
    try {
      await submitRegistration({
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: '+91' + fields.phone.trim(),
        chronotype: fields.chronotype,
        src: getSrcFromHostname(window.location.hostname),
        bumpIntent: bumpSnapshot,
        lateSignup: isLive,
        consent,
        consentAt: consent ? new Date().toISOString() : null,
        userAgent: navigator.userAgent,
      })
      saved = true
    } catch (err) {
      console.error('[WTL] registration error:', err)
      try {
        localStorage.setItem(
          'wtl_failed_registration',
          JSON.stringify({ ...fields, at: new Date().toISOString() })
        )
      } catch {
        // best-effort only, never block the user's flow on localStorage failing
      }
    } finally {
      setSubmitting(false)
      submitInFlight.current = false
      lastSaveOk.current = saved
    }

    if (bumpSnapshot && saved) {
      setOverlay('interstitial')
    } else {
      // If the write failed, never show the paid upsell. That would confirm a registration
      // that doesn't exist right before taking real money for it.
      const c = freeConfirmCopy(saved)
      showConfirmationThenRedirect(WHATSAPP_GROUP_URL, 'FREE / WhatsApp group', c.heading, c.message, c.badge, 'Tap here to open WhatsApp')
    }
    return { ok: saved, validationFailed: false }
  }

  function confirmPaidUpgrade() {
    setOverlay(null)
    if (isLive) {
      const c = freeConfirmCopy(lastSaveOk.current)
      showConfirmationThenRedirect(WHATSAPP_GROUP_URL, 'FREE / WhatsApp group', c.heading, c.message, c.badge, 'Tap here to open WhatsApp')
      return
    }
    showConfirmationThenRedirect(COSMOFEED_URL, 'PAID / Cosmofeed', 'Almost there.', 'Taking you to secure checkout...', null, 'Tap here to open checkout')
  }

  function skipUpgrade() {
    setOverlay(null)
    const c = freeConfirmCopy(lastSaveOk.current)
    showConfirmationThenRedirect(WHATSAPP_GROUP_URL, 'FREE / WhatsApp group', c.heading, c.message, c.badge, 'Tap here to open WhatsApp')
  }

  return {
    fields,
    setField,
    errors,
    bumpIntent,
    setBumpIntent,
    consent,
    setConsent,
    submitting,
    overlay,
    confirmState,
    handleSubmit,
    confirmPaidUpgrade,
    skipUpgrade,
  }
}

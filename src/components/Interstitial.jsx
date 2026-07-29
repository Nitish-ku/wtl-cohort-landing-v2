import { useEffect, useRef } from 'react'

export function Interstitial({ onUpgrade, onSkip }) {
  const upgradeBtnRef = useRef(null)

  useEffect(() => {
    upgradeBtnRef.current?.focus()
    function onKeyDown(e) {
      if (e.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onSkip])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="interstitialHeading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-6"
    >
      <div className="max-w-sm w-full rounded-3xl bg-white border border-ink/10 shadow-2xl p-8 text-center">
        <h2 id="interstitialHeading" className="font-serif text-2xl text-ink mb-3">
          Add Sprint Copilot to your spot
        </h2>
        <p className="text-ink/60 text-sm mb-6">
          ₹499 one-time · generates your landing page copy, pricing model, and outreach scripts for you.
        </p>
        <button
          ref={upgradeBtnRef}
          onClick={onUpgrade}
          className="w-full rounded-full bg-wtl-sage text-white font-semibold py-3 mb-3 hover:brightness-110 transition"
        >
          Pay ₹499 and get access →
        </button>
        <button onClick={onSkip} className="w-full rounded-full border border-ink/15 text-ink/70 py-3 hover:border-ink/30 transition">
          Skip for now, just join free
        </button>
      </div>
    </div>
  )
}

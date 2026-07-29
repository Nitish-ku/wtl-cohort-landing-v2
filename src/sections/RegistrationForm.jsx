import { forwardRef, useEffect, useRef } from 'react'
import { getSubmitLabel, getSubmitNote } from '../lib/copy'
import { CHRONOTYPES } from '../lib/validation'

export const RegistrationForm = forwardRef(function RegistrationForm(
  { isLive, flow },
  ref
) {
  const { fields, setField, errors, bumpIntent, setBumpIntent, consent, setConsent, submitting, handleSubmit } = flow

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const chronotypeGroupRef = useRef(null)

  // Move focus to the first invalid field whenever a submit attempt
  // produces errors (client-side validation, or a validation-style error
  // surfaced back from the backend). Runs post-commit, so it always sees
  // the errors state that was actually set, not a stale closure of it.
  useEffect(() => {
    if (errors.name) nameRef.current?.focus()
    else if (errors.email) emailRef.current?.focus()
    else if (errors.phone) phoneRef.current?.focus()
    else if (errors.chronotype) chronotypeGroupRef.current?.focus()
  }, [errors])

  return (
    <section ref={ref} className="bg-cream px-6 py-16 scroll-mt-6">
      <div className="max-w-md mx-auto rounded-3xl bg-white border border-ink/10 shadow-xl shadow-ink/5 p-8">
        <h2 className="font-serif text-2xl text-ink mb-1">Claim your free spot</h2>
        <p className="text-ink/50 text-sm mb-6">Takes 30 seconds. No payment to join.</p>

        <div className="space-y-4">
          <Field id="name" label="Name" error={errors.name}>
            <input
              ref={nameRef}
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              maxLength={100}
              value={fields.name}
              onChange={(e) => setField('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="w-full rounded-xl bg-cream border border-ink/15 px-4 py-3 text-ink placeholder:text-ink/30 focus:border-wtl-indigo outline-none"
            />
          </Field>

          <Field id="email" label="Email" error={errors.email}>
            <input
              ref={emailRef}
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@email.com"
              value={fields.email}
              onChange={(e) => setField('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full rounded-xl bg-cream border border-ink/15 px-4 py-3 text-ink placeholder:text-ink/30 focus:border-wtl-indigo outline-none"
            />
          </Field>

          <Field id="phone" label="WhatsApp number" error={errors.phone} hint="WhatsApp only. We send daily PDFs here. No calls, no spam.">
            <div className="flex">
              <span className="flex items-center px-3 rounded-l-xl bg-ink/5 border border-r-0 border-ink/15 text-ink/50">+91</span>
              <input
                ref={phoneRef}
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit number"
                maxLength={10}
                value={fields.phone}
                onChange={(e) => setField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                className="w-full rounded-r-xl bg-cream border border-ink/15 px-4 py-3 text-ink placeholder:text-ink/30 focus:border-wtl-indigo outline-none"
              />
            </div>
          </Field>

          <div>
            <label className="block text-sm text-ink/70 mb-2">When do you build best?</label>
            <div
              ref={chronotypeGroupRef}
              tabIndex={-1}
              role="radiogroup"
              aria-label="When do you build best?"
              aria-invalid={!!errors.chronotype}
              aria-describedby={errors.chronotype ? 'chronotype-error' : undefined}
              className="grid grid-cols-3 gap-2"
            >
              {CHRONOTYPES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  role="radio"
                  aria-checked={fields.chronotype === c.value}
                  onClick={() => setField('chronotype', c.value)}
                  className={`rounded-xl border p-3 text-center transition ${
                    fields.chronotype === c.value
                      ? 'border-wtl-indigo bg-wtl-indigo/5'
                      : 'border-ink/15 bg-cream hover:border-ink/30'
                  }`}
                >
                  <div className="text-xs font-serif text-ink">{c.name}</div>
                  <div className="text-[11px] text-ink/50">{c.time}</div>
                </button>
              ))}
            </div>
            {errors.chronotype && (
              <p id="chronotype-error" role="alert" className="text-red-500 text-xs mt-2">
                {errors.chronotype}
              </p>
            )}
          </div>

          <label
            className={`flex gap-3 rounded-xl border p-4 transition ${
              isLive ? 'opacity-40 pointer-events-none border-ink/10' : 'border-wtl-sage/30 bg-wtl-sage/5 hover:border-wtl-sage/50 cursor-pointer'
            }`}
          >
            <input
              type="checkbox"
              checked={bumpIntent}
              disabled={isLive}
              onChange={(e) => setBumpIntent(e.target.checked)}
              className="mt-1 accent-wtl-sage"
            />
            <div>
              <div className="script text-wtl-sage text-lg leading-none mb-1">Optional upgrade</div>
              <strong className="text-ink text-sm">Add Sprint Copilot</strong>
              <p className="text-ink/60 text-xs mt-1">
                Skip the blank-page paralysis. Let Sprint Copilot generate your landing page copy, pricing model, and
                outreach scripts for you in seconds. Sprint founders only.
              </p>
              <div className="text-xs mt-2">
                <span className="line-through text-ink/30">₹3,799</span>{' '}
                <span className="text-wtl-sage font-serif">₹499</span>{' '}
                <span className="rounded-full bg-wtl-sage/15 text-wtl-sage px-2 py-0.5 text-[10px] font-mono">87% OFF</span>
              </div>
            </div>
          </label>

          <label className="flex gap-3 items-start cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 accent-wtl-indigo"
            />
            <span className="text-xs text-ink/60">
              I agree to the{' '}
              <a href="/privacy.html" target="_blank" rel="noopener" className="underline text-ink/80">Privacy Policy</a>{' '}
              and{' '}
              <a href="/terms.html" target="_blank" rel="noopener" className="underline text-ink/80">Terms of Service</a>.
            </span>
          </label>

          <button
            type="button"
            disabled={submitting}
            aria-busy={submitting}
            onClick={handleSubmit}
            className="w-full rounded-full bg-wtl-indigo text-white font-semibold py-3.5 disabled:opacity-60 hover:brightness-110 transition shadow-lg shadow-wtl-indigo/20"
          >
            {getSubmitLabel({ isLive, bumpIntent, submitting })}
          </button>
          <p className="text-center text-xs text-ink/50">{getSubmitNote({ isLive, bumpIntent })}</p>
        </div>
      </div>
    </section>
  )
})

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-ink/70 mb-1.5">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-ink/40 text-[11px] mt-1">
          {hint}
        </p>
      )}
    </div>
  )
}

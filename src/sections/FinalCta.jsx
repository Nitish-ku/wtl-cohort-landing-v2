import { getSubmitLabel, getSubmitNote } from '../lib/copy'

export function FinalCta({ isLive, flow, onSubmit }) {
  return (
    <section className="section bg-cream text-center">
      <div className="container-narrow">
        <h2 className="text-h2 text-ink mb-2">Stop planning.</h2>
        <div className="script text-script-lg text-wtl-indigo mb-8">Start shipping.</div>

        <button
          type="button"
          disabled={flow.submitting}
          onClick={onSubmit}
          className="rounded-pill bg-wtl-indigo text-white font-semibold px-8 py-4 text-body-lg disabled:opacity-60 hover:brightness-110 transition shadow-cta"
        >
          {getSubmitLabel({ isLive, bumpIntent: flow.bumpIntent, submitting: flow.submitting })}
        </button>
        <p className="text-micro text-ink/50 mt-4">
          {isLive
            ? 'Cohort 02 · Live now · Free entry'
            : `Cohort 02 · Starts Friday 9 AM IST · ${getSubmitNote({ isLive, bumpIntent: flow.bumpIntent })}`}
        </p>
      </div>
    </section>
  )
}

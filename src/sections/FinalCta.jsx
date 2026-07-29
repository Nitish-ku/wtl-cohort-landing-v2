import { getSubmitLabel, getSubmitNote } from '../lib/copy'

export function FinalCta({ isLive, flow, onSubmit }) {
  return (
    <section className="bg-cream px-6 py-20 text-center">
      <h2 className="text-3xl md:text-4xl text-ink mb-2">Stop planning.</h2>
      <div className="script text-4xl text-wtl-indigo mb-8">Start shipping.</div>

      <button
        type="button"
        disabled={flow.submitting}
        onClick={onSubmit}
        className="rounded-full bg-wtl-indigo text-white font-semibold px-8 py-4 text-lg disabled:opacity-60 hover:brightness-110 transition shadow-lg shadow-wtl-indigo/20"
      >
        {getSubmitLabel({ isLive, bumpIntent: flow.bumpIntent, submitting: flow.submitting })}
      </button>
      <p className="text-xs text-ink/50 mt-4">
        {isLive ? 'Cohort 02 · Live now · Free entry' : `Cohort 02 · Starts Friday 9 AM IST · ${getSubmitNote({ isLive, bumpIntent: flow.bumpIntent })}`}
      </p>
    </section>
  )
}

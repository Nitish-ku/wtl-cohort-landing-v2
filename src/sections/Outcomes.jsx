import { DashDivider } from '../components/DashDivider'

const OUTCOMES = [
  { title: 'A validated idea', body: 'One offer you actually committed to, not a list of maybes.' },
  { title: 'A live funnel', body: 'A working landing page and offer people can buy.' },
  { title: 'First outreach sent', body: 'Real conversations started, not "someday" plans.' },
  { title: 'Proof you can finish', body: 'The single most valuable thing for a founder who keeps stalling.' },
]

export function Outcomes() {
  return (
    <section className="section bg-cream text-center">
      <h2 className="text-h2 text-ink">
        Not motivation. <span className="script text-wtl-indigo">Assets.</span>
      </h2>
      <DashDivider />

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 container-content text-left mt-10 mb-14">
        {OUTCOMES.map((o) => (
          <div key={o.title} className="border-b border-ink/10 pb-4">
            <div className="font-serif text-h3 text-ink">{o.title}</div>
            <div className="text-ink/60 text-small">{o.body}</div>
          </div>
        ))}
      </div>

      <div className="container-form rounded-panel bg-white border border-ink/10 shadow-card p-8">
        <div className="font-serif text-display text-wtl-indigo mb-3">₹10,000</div>
        <p className="text-ink/70 text-small mb-5">
          The triad with the highest combined score by Sunday night wins. Each member takes home an equal share.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-micro font-mono text-ink/60 mb-4">
          <span className="rounded-pill border border-ink/15 px-3 py-1">₹3,333 · MEMBER 1</span>
          <span className="rounded-pill border border-ink/15 px-3 py-1">₹3,333 · MEMBER 2</span>
          <span className="rounded-pill border border-ink/15 px-3 py-1">₹3,334 · MEMBER 3</span>
        </div>
        <div className="text-micro text-ink/40">Free to enter · Everyone walks away with a live offer either way.</div>
      </div>
    </section>
  )
}

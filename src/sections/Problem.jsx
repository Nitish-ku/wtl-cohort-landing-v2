import { DashDivider } from '../components/DashDivider'

const PAIN_POINTS = [
  { lead: '17 half-built ideas.', body: 'None of them live, all of them stuck in your notes app.' },
  { lead: 'You open the laptop to "start"', body: 'and lose three hours to research that goes nowhere.' },
  { lead: 'Every launch waits', body: 'for the version of you that has it all figured out. That version never shows up.' },
  { lead: 'You work best in bursts,', body: "but nothing you've tried is built for how your brain actually runs." },
]

export function Problem() {
  return (
    <section className="section bg-wtl-sage/10 text-center">
      <h2 className="text-h2 text-ink max-w-narrow mx-auto">
        You don't have an idea problem. You have a <span className="script text-wtl-indigo">finishing</span> problem.
      </h2>
      <DashDivider />

      <div className="container-content text-left space-y-8 mt-10">
        {PAIN_POINTS.map((p, i) => (
          <div key={p.lead} className="flex items-start gap-5">
            <div className="font-serif text-h3 text-wtl-indigo/50 shrink-0 w-8">{i + 1}.</div>
            <p className="text-ink/80">
              <strong className="text-ink">{p.lead}</strong> {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

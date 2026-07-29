import { DashDivider } from '../components/DashDivider'

/*
  Where the reference site puts a founder photo + personal narrative ("My
  story"), WTL stays faceless, so this slot holds the research behind why
  the sprint is cohort-based and synchronous instead of self-paced, styled
  with the same white-card-on-tint, script-label, pull-quote language the
  reference uses for its founder section.
*/
const POINTS = [
  {
    lead: "Task initiation isn't a discipline problem.",
    body: 'ADHD brains show delayed prefrontal cortex maturation and altered dopamine/norepinephrine transmission, the exact systems responsible for starting a task and staying with it. Measurable in brain-imaging research, not a character flaw.',
  },
  {
    lead: 'Body doubling has real measured effect.',
    body: 'A 2025 VR-based study found ADHD participants working alongside a body double completed tasks 27–30% faster than working alone, with better sustained attention. An AI body double performed nearly as well as a human one.',
  },
  {
    lead: 'It bypasses executive dysfunction where willpower fails.',
    body: 'Research on ADHD adults found body doubling was the single most-cited factor that got people to actually exercise, not because it motivated them harder, but because it sidestepped the initiation barrier entirely.',
  },
]

export function ClinicalEvidence() {
  return (
    <section className="bg-cream px-6 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="script text-wtl-sage text-xl mb-2">Why this works</div>
        <h2 className="text-3xl md:text-4xl text-ink">
          Not another course. <span className="script text-wtl-indigo">A body double for your launch.</span>
        </h2>
        <DashDivider />
      </div>

      <div className="max-w-2xl mx-auto rounded-3xl bg-white border border-ink/10 shadow-xl shadow-ink/5 p-8 md:p-10 mt-10">
        <div className="space-y-8">
          {POINTS.map((p, i) => (
            <div key={p.lead} className="flex gap-4">
              <div className="font-serif text-2xl text-wtl-indigo/50 shrink-0 w-8">{i + 1}.</div>
              <p className="text-ink/80">
                <strong className="text-ink font-serif text-lg block mb-1">{p.lead}</strong>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <blockquote className="mt-8 pt-8 border-t border-ink/10 text-center">
          <p className="script text-2xl text-wtl-sage">
            "This is why the sprint is cohort-based and synchronous, done alongside others in triads, not a course you complete alone."
          </p>
        </blockquote>
      </div>
    </section>
  )
}

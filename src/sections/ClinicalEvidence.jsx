import { DashDivider } from '../components/DashDivider'

/*
  Where the reference site puts a founder photo + personal narrative ("My
  story"), WTL stays faceless, so this slot holds the research behind why
  the sprint is cohort-based and synchronous instead of self-paced, styled
  with the same white-card-on-tint, script-label, pull-quote language the
  reference uses for its founder section.

  Fact-check pass (this session): all three claims below were rewritten
  against their actual underlying research rather than the original,
  overstated copy.
  - Claim 1 (task initiation) is genuinely supported by the literature,
    softened here to "research suggests" instead of a flat assertion.
  - Claim 2 (VR body-doubling study) is a real study, but a 12-person,
    non-peer-reviewed preprint. The qualifier sits directly beside the
    stat rather than in fine print, so it can't be misread as a
    peer-reviewed, large-sample result.
  - Claim 3 previously claimed body doubling was "the single most-cited
    factor" in getting ADHD adults to exercise. That does not match the
    real underlying study and has been replaced (not just reworded) with
    the actual finding: a 2023 qualitative study of 30 adults with ADHD,
    where exercising alongside others was one of several factors that made
    activity easier to sustain.
*/
const POINTS = [
  {
    lead: "Task initiation isn't a discipline problem.",
    body: 'Research suggests ADHD brains show delayed prefrontal cortex maturation and altered dopamine/norepinephrine transmission, the systems most linked to starting a task and staying with it. A pattern seen in brain-imaging research, not a character flaw.',
  },
  {
    lead: 'Body doubling shows a measurable effect.',
    body: (
      <>
        A 2025 VR-based study found ADHD participants working alongside a body double completed tasks{' '}
        <strong className="text-ink">27 to 30% faster</strong> than working alone, with better sustained
        attention.{' '}
        <span className="text-ink/50 text-small">
          (A small, preliminary 12-person study, not yet peer-reviewed.)
        </span>{' '}
        An AI body double performed nearly as well as a human one.
      </>
    ),
  },
  {
    lead: 'It gives structure where willpower alone falls short.',
    body: "A 2023 qualitative study of 30 adults with ADHD found that exercising alongside others was one of several factors that made physical activity easier to sustain, alongside people noticing real mood and focus improvements from the exercise itself. The sprint borrows the same principle: shared, scheduled sessions instead of a solo to-do list.",
  },
]

export function ClinicalEvidence() {
  return (
    <section className="section bg-cream">
      <div className="container-content text-center">
        <div className="script text-wtl-sage text-script-sm mb-2">Why this works</div>
        <h2 className="text-h2 text-ink">
          Not another course. <span className="script text-wtl-indigo">A body double for your launch.</span>
        </h2>
        <DashDivider />
      </div>

      <div className="container-content rounded-panel bg-white border border-ink/10 shadow-card p-8 md:p-10 mt-10">
        <div className="space-y-8">
          {POINTS.map((p, i) => (
            <div key={p.lead} className="flex gap-4">
              <div className="font-serif text-h3 text-wtl-indigo/50 shrink-0 w-8">{i + 1}.</div>
              <p className="text-ink/80">
                <strong className="text-ink font-serif text-h3 block mb-1">{p.lead}</strong>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <blockquote className="mt-8 pt-8 border-t border-ink/10 text-center">
          <p className="font-serif italic text-ink/70 text-body-lg">
            "This is why the sprint is cohort-based and synchronous, done alongside others in triads, not a
            course you complete alone."
          </p>
        </blockquote>
      </div>
    </section>
  )
}

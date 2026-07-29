import { DashDivider } from '../components/DashDivider'

/*
  Added by the design pass: the reference site has a value-stack recap
  right before its FAQ (a section listing what's included). Our version has
  no equivalent. Since the sprint is free (no purchase on the main path,
  no guarantee section to pair it with), this reads as "everything included
  in your free spot" rather than a pricing/guarantee reframe.
*/
const INCLUDED = [
  { title: '3 days of structured sprint PDFs', body: 'Lock the idea, build the funnel, do the outreach, one focused PDF per day.' },
  { title: 'A triad matched by chronotype', body: 'Two other founders working the same sprint alongside you, not a solo course.' },
  { title: 'Daily WhatsApp nudges', body: 'Short check-ins to keep momentum between sessions, no calls, no spam.' },
  { title: '₹10,000 prize eligibility', body: "Every triad competes for the pool by Sunday night, free to enter." },
]

export function ValueStack() {
  return (
    <section className="section bg-cream text-center">
      <div className="script text-wtl-sage text-script-sm mb-2">Everything in your free spot</div>
      <h2 className="text-h2 text-ink">
        No purchase needed. <span className="script text-wtl-indigo">Just show up.</span>
      </h2>
      <DashDivider />

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 container-content text-left mt-10">
        {INCLUDED.map((item) => (
          <div key={item.title} className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-wtl-sage flex items-center justify-center text-white text-micro shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <div className="font-serif text-h3 text-ink">{item.title}</div>
              <div className="text-ink/60 text-small">{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

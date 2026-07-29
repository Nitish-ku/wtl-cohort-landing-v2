import { Wave } from '../components/Wave'
import { DashDivider } from '../components/DashDivider'

const DAYS = [
  {
    label: 'Day 1 · Friday',
    title: 'Lock the idea',
    body: "No more 17 tabs. Pick one idea, pressure-test it, and commit.",
    stat: "You leave Day 1 knowing exactly what you're building and who it's for.",
  },
  {
    label: 'Day 2 · Saturday',
    title: 'Build the funnel',
    body: 'Landing page, offer, and the path from stranger to buyer.',
    stat: 'By end of day you have something a real person can click and pay for.',
  },
  {
    label: 'Day 3 · Sunday',
    title: 'Do the outreach',
    body: 'The part everyone skips. Your first real outreach, sent for real.',
    stat: "You get your offer in front of actual humans before the 72 hours run out.",
  },
]

/*
  One of only two dark (#1a2e25) sections on this page, per the landing-page
  v4 rule: dark is reserved for "How it works" and "FAQ" only, everything
  else stays light. Mirrors the reference site's phase-detail treatment:
  numbered circle badges on a vertical line, white serif sub-heads, a
  script-styled payoff line under each step.
*/
export function HowItWorks() {
  return (
    <>
      <Wave fill="#1a2e25" />
      <section className="bg-wtl-dark px-6 py-20 text-center">
        <div className="script text-wtl-sage text-xl mb-2">You've seen the sprint. Here's what happens each day.</div>
        <h2 className="text-3xl md:text-4xl text-white">Three days. One push. A real launch.</h2>
        <DashDivider />

        <div className="max-w-2xl mx-auto text-left mt-10">
          {DAYS.map((day, i) => (
            <div key={day.label} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full border-2 border-wtl-sage text-wtl-sage font-serif text-lg flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                {i < DAYS.length - 1 && <div className="w-px flex-1 bg-white/15 my-1" />}
              </div>
              <div className={i < DAYS.length - 1 ? 'pb-8 border-b border-white/10 mb-0 flex-1' : 'flex-1'}>
                <div className="text-xs font-mono text-white/40 mb-1">{day.label}</div>
                <h3 className="font-serif text-xl text-white mb-2">{day.title}</h3>
                <p className="text-white/70 text-sm mb-2">{day.body}</p>
                <p className="script text-wtl-sage text-lg">{day.stat}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Wave fill="#faf5ef" flip />
    </>
  )
}

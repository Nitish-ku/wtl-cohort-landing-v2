import { Wave } from '../components/Wave'
import { DashDivider } from '../components/DashDivider'

const QUESTIONS = [
  {
    q: 'Is it really free?',
    a: "Yes. The sprint is 100% free. There's an optional ₹499 AI tool upgrade inside the sign-up form, but you can complete the full sprint and compete for the ₹10,000 prize without it.",
  },
  {
    q: "What's a triad?",
    a: "You're matched with 2 other founders after signing up. Your triad score is the sum of all 3 members' points. The triad with the highest combined score wins ₹3,333 each.",
  },
  {
    q: "What if I don't have an idea yet?",
    a: "Day 1 is built to solve exactly this. You'll run a structured audit to surface ideas from your own life, then pick and validate one before Day 2 starts.",
  },
  {
    q: 'How much time does it take?',
    a: '3 to 4 focused hours per day. Designed for sprint-style, burst-focused work, not marathon sessions.',
  },
  {
    q: 'Where does it happen?',
    a: "Fully virtual. You'll get daily PDFs (free tier) or access to the AI tool (paid upgrade), plus WhatsApp nudges to keep you on track.",
  },
  {
    q: "What if I can't make it every day?",
    a: "Do your best to show up for all three days. If you miss part of a day, you'll still get that day's PDF (or Sprint Copilot access) and WhatsApp nudges to catch up. Missing time just makes it harder to hit your triad's target by Sunday night.",
  },
  {
    q: 'Do I need a team or co-founder to join?',
    a: "No. You join solo and get matched into a triad of 3 founders by chronotype after signing up. You don't need a team, a validated idea, or prior experience going in.",
  },
]

/*
  Second and last of the two permitted dark sections (see HowItWorks.jsx).
  Flat rows with a hairline divider and a circular +/× toggle, matching the
  reference site's FAQ pattern, rather than the boxed dark cards the first
  draft used.
*/
export function FAQ() {
  return (
    <>
      <Wave fill="#1a2e25" />
      <section className="section bg-wtl-dark text-center">
        <h2 className="text-h2 text-white">The questions we hear most.</h2>
        <DashDivider />

        <div className="container-content text-left mt-10">
          {QUESTIONS.map(({ q, a }) => (
            <details key={q} className="group border-b border-white/10 py-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-white">
                {q}
                <span className="shrink-0 w-7 h-7 rounded-full bg-wtl-sage/15 text-wtl-sage flex items-center justify-center text-small group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-white/60 text-small mt-3">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <Wave fill="#faf5ef" flip />
    </>
  )
}

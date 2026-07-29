import { DashDivider } from '../components/DashDivider'

const FITS = [
  { title: 'You have ideas but struggle to ship', body: '17 tabs open, nothing live. Sound familiar.' },
  { title: 'You work best with a deadline and momentum', body: 'Bursts of focus, not slow-and-steady grinding.' },
  { title: 'You want a real launch, not another course', body: 'Something a stranger can click and pay for by Sunday.' },
]

export function FitCheck() {
  return (
    <section className="section bg-cream text-center">
      <h2 className="text-h2 text-ink">Built for founders who move in bursts.</h2>
      <DashDivider />

      <div className="grid sm:grid-cols-3 gap-6 container-wide mt-10 text-left">
        {FITS.map((f) => (
          <div key={f.title} className="rounded-card bg-white border-t-4 border-wtl-sage shadow-card-sm p-6">
            <div className="w-8 h-8 rounded-full bg-wtl-sage flex items-center justify-center text-white text-small mb-4">
              ✓
            </div>
            <h4 className="font-serif text-h3 text-ink mb-2">{f.title}</h4>
            <p className="text-ink/60 text-small">{f.body}</p>
          </div>
        ))}
      </div>

      <p className="text-ink/50 text-small mt-8 max-w-narrow mx-auto">
        Skip it if you want passive theory to watch later, you're not free across the weekend, or you'd rather
        plan for six more months.
      </p>
    </section>
  )
}

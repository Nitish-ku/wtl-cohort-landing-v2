export function SocialProof({ isLive }) {
  return (
    <section className="bg-cream px-6 pt-4 pb-20 text-center">
      <div className="max-w-md mx-auto rounded-2xl bg-wtl-sage/10 border border-wtl-sage/20 p-6">
        <div className="script text-wtl-sage text-2xl mb-1">216 founders</div>
        <p className="text-ink/70 text-sm">registered for Cohort 01. Triads are matched by chronotype.</p>
        <p className="text-xs font-mono text-ink/40 mt-2">
          {isLive ? 'Cohort is live now · join in progress.' : 'Spots close Friday 9 AM IST.'}
        </p>
      </div>
    </section>
  )
}

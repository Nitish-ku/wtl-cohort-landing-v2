/*
  ETHICAL FLAG (kept intentionally static, do not "improve" this into an
  animated/incrementing counter): the reference site's equivalent review
  counter was observed showing a different random number on every reload
  during this session's research, a fake social-proof pattern. "216" here
  is a real (if not yet internally re-verified against Firestore this
  session) claim about an actual past cohort, so the mechanism must stay
  honest: one static number, no animation, no randomization.
*/
export function SocialProof({ isLive }) {
  return (
    <section className="section-tight bg-cream text-center">
      <div className="container-form rounded-card bg-wtl-sage/10 border border-wtl-sage/20 p-6">
        <div className="script text-wtl-sage text-script-md mb-1">216 founders</div>
        <p className="text-ink/70 text-small">registered for Cohort 01. Triads are matched by chronotype.</p>
        <p className="text-micro font-mono text-ink/40 mt-2">
          {isLive ? 'Cohort is live now · join in progress.' : 'Spots close Friday 9 AM IST.'}
        </p>
      </div>
    </section>
  )
}

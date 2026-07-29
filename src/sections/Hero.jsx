export function Hero({ isLive, countdownText, onClaimClick }) {
  return (
    /*
      Hero is the one documented top-padding exception (see index.css's
      --spacing-hero-pt): it sits directly under the viewport edge with no
      header above it, so it composes pt-hero-pt instead of the shared
      .section class, which would apply the same value to both edges.
    */
    <section className="bg-cream pt-hero-pt pb-section-y px-section-x">
      <div className="container-hero grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-micro font-mono tracking-wide text-ink/50 mb-6">Wired to Launch</div>

          <span className="inline-flex items-center gap-2 rounded-pill border border-wtl-sage/40 bg-wtl-sage/10 px-4 py-1.5 text-small font-mono text-wtl-sage mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-wtl-sage" />
            {isLive ? 'Live now · join in progress' : 'Cohort 02 · Starts Friday 9:00 AM IST'}
          </span>

          <h1 className="text-display leading-tight text-ink mb-2">
            The 72-Hour Founder Sprint.
          </h1>
          <div className="script text-script-lg text-wtl-indigo mb-6">Free.</div>

          <p className="text-body-lg text-ink/70 mb-8 max-w-form">
            Pick your idea. Build your funnel. Get your first outreach done. In three days, you go
            from <strong className="text-ink">"I should start something"</strong> to{' '}
            <strong className="text-ink">a live offer with real people in the pipeline.</strong>
          </p>

          <div className="flex flex-wrap gap-3 text-micro font-mono uppercase tracking-wide text-ink/60 mb-8">
            <span className="rounded-pill border border-ink/15 px-3 py-1.5">72 Hours</span>
            <span className="rounded-pill border border-ink/15 px-3 py-1.5">₹10,000 Prize</span>
            <span className="rounded-pill border border-ink/15 px-3 py-1.5">Free Entry</span>
            <span className="rounded-pill border border-ink/15 px-3 py-1.5">Virtual</span>
          </div>

          <button
            onClick={onClaimClick}
            className="rounded-pill bg-wtl-indigo text-white font-semibold px-8 py-4 text-body-lg hover:brightness-110 transition shadow-cta"
          >
            Claim my free spot →
          </button>
        </div>

        {/* Where the reference site places a founder photo in a rounded frame with an
            accent panel behind it. Faceless brand, so this well holds the live countdown
            instead, same visual weight, no personal photo needed. */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-showcase bg-wtl-sage/20 -z-10" />
          <div className="rounded-showcase border border-ink/10 bg-white p-8 text-center shadow-card">
            <div className="text-micro font-mono uppercase tracking-wide text-ink/50 mb-3">
              {isLive ? 'Cohort status' : 'Sprint starts in'}
            </div>
            <div className="font-serif text-display text-wtl-indigo mb-3">{countdownText}</div>
            <div className="text-small text-ink/60">
              {isLive ? 'Cohort is live now · join in progress' : 'Spots close Friday 9 AM IST'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

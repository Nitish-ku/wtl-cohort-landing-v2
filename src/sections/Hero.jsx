export function Hero({ isLive, countdownText, onClaimClick }) {
  return (
    <section className="bg-cream px-6 pt-8 pb-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-mono tracking-wide text-ink/50 mb-6">Wired to Launch</div>

          <span className="inline-flex items-center gap-2 rounded-full border border-wtl-sage/40 bg-wtl-sage/10 px-4 py-1.5 text-sm font-mono text-wtl-sage mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-wtl-sage" />
            {isLive ? 'Live now · join in progress' : 'Cohort 02 · Starts Friday 9:00 AM IST'}
          </span>

          <h1 className="text-4xl md:text-5xl leading-tight text-ink mb-2">
            The 72-Hour Founder Sprint.
          </h1>
          <div className="script text-5xl md:text-6xl text-wtl-indigo mb-6">Free.</div>

          <p className="text-lg text-ink/70 mb-8 max-w-md">
            Pick your idea. Build your funnel. Get your first outreach done. In three days, you go
            from <strong className="text-ink">"I should start something"</strong> to{' '}
            <strong className="text-ink">a live offer with real people in the pipeline.</strong>
          </p>

          <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wide text-ink/60 mb-8">
            <span className="rounded-full border border-ink/15 px-3 py-1.5">72 Hours</span>
            <span className="rounded-full border border-ink/15 px-3 py-1.5">₹10,000 Prize</span>
            <span className="rounded-full border border-ink/15 px-3 py-1.5">Free Entry</span>
            <span className="rounded-full border border-ink/15 px-3 py-1.5">Virtual</span>
          </div>

          <button
            onClick={onClaimClick}
            className="rounded-full bg-wtl-indigo text-white font-semibold px-8 py-4 text-lg hover:brightness-110 transition shadow-lg shadow-wtl-indigo/20"
          >
            Claim my free spot →
          </button>
        </div>

        {/* Where the reference site places a founder photo in a rounded frame with an
            accent panel behind it. Faceless brand, so this well holds the live countdown
            instead, same visual weight, no personal photo needed. */}
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-wtl-sage/20 -z-10" />
          <div className="rounded-[2rem] border border-ink/10 bg-white p-8 text-center shadow-xl shadow-ink/5">
            <div className="text-xs font-mono uppercase tracking-wide text-ink/50 mb-3">
              {isLive ? 'Cohort status' : 'Sprint starts in'}
            </div>
            <div className="font-serif text-4xl md:text-5xl text-wtl-indigo mb-3">{countdownText}</div>
            <div className="text-sm text-ink/60">
              {isLive ? 'Cohort is live now · join in progress' : 'Spots close Friday 9 AM IST'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

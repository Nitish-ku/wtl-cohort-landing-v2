export function ConfirmOverlay({ confirmState }) {
  const { heading, message, badge, url, fallbackText } = confirmState

  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-6">
      <div className="max-w-sm w-full rounded-3xl bg-white border border-ink/10 shadow-2xl p-8 text-center">
        <div className="inline-block rounded-full bg-wtl-sage/10 text-wtl-sage text-xs font-mono px-3 py-1 mb-4">
          {badge}
        </div>
        <h2 className="font-serif text-2xl text-ink mb-2">{heading}</h2>
        <p className="text-ink/60 text-sm mb-6">{message}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="inline-block w-full rounded-full bg-wtl-indigo text-white font-semibold py-3 hover:brightness-110 transition"
        >
          Didn't get redirected? {fallbackText} →
        </a>
      </div>
    </div>
  )
}

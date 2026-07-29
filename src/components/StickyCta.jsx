export function StickyCta({ isLive, onClick }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-ink/10 bg-white/95 backdrop-blur px-6 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        <div className="text-sm text-left">
          <div className="font-serif text-ink">Free 72-Hour Sprint</div>
          <div className="text-xs text-ink/50">
            {isLive ? 'Live now · join in progress' : 'Starts Friday 9 AM · ₹10,000 prize pool'}
          </div>
        </div>
        <button
          onClick={onClick}
          className="shrink-0 rounded-full bg-wtl-indigo text-white font-semibold px-5 py-2.5 hover:brightness-110 transition"
        >
          {isLive ? 'Join now →' : 'Claim spot →'}
        </button>
      </div>
    </div>
  )
}

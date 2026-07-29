export function Footer({ src }) {
  return (
    <footer className="section-compact bg-cream text-center text-micro text-ink/40 border-t border-ink/10">
      <div className="container-content">
        <div className="font-mono mb-2">src: {src}</div>
        <div>
          WiredToLaunch · MSME Registered ·{' '}
          <a href="mailto:hello@wiredtolaunch.in" className="underline">hello@wiredtolaunch.in</a> ·{' '}
          <a href="/privacy.html" target="_blank" rel="noopener" className="underline">Privacy</a> ·{' '}
          <a href="/terms.html" target="_blank" rel="noopener" className="underline">Terms</a>
        </div>
      </div>
    </footer>
  )
}

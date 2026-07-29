import { useRef } from 'react'
import './index.css'
import { useCohortWindow } from './hooks/useCohortWindow'
import { useRegistrationFlow } from './hooks/useRegistrationFlow'
import { getSrcFromHostname } from './lib/srcMap'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { ClinicalEvidence } from './sections/ClinicalEvidence'
import { HowItWorks } from './sections/HowItWorks'
import { Outcomes } from './sections/Outcomes'
import { FitCheck } from './sections/FitCheck'
import { SocialProof } from './sections/SocialProof'
import { RegistrationForm } from './sections/RegistrationForm'
import { FAQ } from './sections/FAQ'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { StickyCta } from './components/StickyCta'
import { Interstitial } from './components/Interstitial'
import { ConfirmOverlay } from './components/ConfirmOverlay'

/*
  This is the composition root: every section is a dumb function of props,
  and all the actual state (countdown, form fields, overlays) lives in the
  two hooks below. That split is the whole point of the rebuild: the old
  index.html had state and markup tangled into one 877-line file with global
  `let`s; here you can read App.jsx top-to-bottom and understand the whole
  page's data flow without touching a single section's internals.
*/
function App() {
  const { isLive, countdownText } = useCohortWindow()
  const flow = useRegistrationFlow({ isLive })
  const formRef = useRef(null)

  const overlayOpen = flow.overlay !== null

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function attemptSubmit() {
    const result = await flow.handleSubmit()
    if (result.validationFailed) scrollToForm()
  }

  return (
    <>
      {/* `inert` mirrors the original page's setContentInert(): while an overlay is up,
          this whole subtree becomes unfocusable/unclickable, so a keyboard user can't
          fire a second submit behind the modal. */}
      <main inert={overlayOpen} className="min-h-screen bg-cream text-ink pb-24">
        <Hero isLive={isLive} countdownText={countdownText} onClaimClick={scrollToForm} />
        <Problem />
        <ClinicalEvidence />
        <FitCheck />
        <Outcomes />
        <SocialProof isLive={isLive} />
        <HowItWorks />
        <RegistrationForm ref={formRef} isLive={isLive} flow={flow} />
        <FAQ />
        <FinalCta isLive={isLive} flow={flow} onSubmit={attemptSubmit} />
        <Footer src={getSrcFromHostname(window.location.hostname)} />
      </main>

      <div inert={overlayOpen}>
        <StickyCta isLive={isLive} onClick={scrollToForm} />
      </div>

      {flow.overlay === 'interstitial' && (
        <Interstitial onUpgrade={flow.confirmPaidUpgrade} onSkip={flow.skipUpgrade} />
      )}
      {flow.overlay === 'confirm' && flow.confirmState && <ConfirmOverlay confirmState={flow.confirmState} />}
    </>
  )
}

export default App

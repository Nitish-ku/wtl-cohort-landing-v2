// Submit-button label/note text depends on 3 independent things (isLive,
// bumpIntent, submitting) and is needed by 3 different CTAs on the page
// (the form's own button, the repeat CTA after the FAQ, and the sticky bar).
// Centralizing it here means those 3 places can never drift out of sync,
// which is exactly the bug class the original page had to guard against
// manually (submitBtn/submitBtn2/stickyBtn each updated by hand every time).
export function getSubmitLabel({ isLive, bumpIntent, submitting }) {
  if (submitting) return 'Saving your spot...'
  if (isLive) return 'Join now, sprint in progress →'
  if (bumpIntent) return 'Claim my spot + Sprint Copilot → ₹499'
  return 'Claim my free spot →'
}

export function getSubmitNote({ isLive, bumpIntent }) {
  if (isLive) return "This cohort is already underway. You'll jump in and catch up fast."
  if (bumpIntent) return 'Sprint is free · Sprint Copilot billed at ₹499'
  return 'No payment to join the free sprint.'
}

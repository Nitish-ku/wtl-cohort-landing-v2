// Mirrors wtl-backend's own validatePayload() (routes/register.js) so the
// user sees the same rejection client-side, instantly, instead of waiting on
// a round-trip to find out their phone number is wrong.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^[6-9]\d{9}$/ // 10 digits, no +91 prefix yet (added at submit time)

export function validateRegistration({ name, email, phone, chronotype }) {
  return {
    name: !name.trim() ? 'Enter your name' : null,
    email: !EMAIL_RE.test(email.trim()) ? 'Enter a valid email' : null,
    phone: !PHONE_RE.test(phone.trim()) ? 'Enter a valid 10-digit number' : null,
    chronotype: !chronotype ? 'Pick one' : null,
  }
}

export function isValid(errors) {
  return Object.values(errors).every((e) => e === null)
}

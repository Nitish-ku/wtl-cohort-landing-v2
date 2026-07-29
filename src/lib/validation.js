// Mirrors wtl-backend's own validatePayload() (routes/register.js) so the
// user sees the same rejection client-side, instantly, instead of waiting on
// a round-trip to find out their phone number is wrong.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^[6-9]\d{9}$/ // 10 digits, no +91 prefix yet (added at submit time)

// Zero-width space, zero-width non-joiner, zero-width joiner, byte-order
// mark. A name made only of these (plus real whitespace) looks blank on
// screen but isn't caught by name.trim() alone, since JS's trim() only
// strips actual whitespace/line-terminator code points, not these. The
// backend rejects that case as missing, so the client mirrors it here using
// code points rather than a regex literal, to keep the invisible characters
// unambiguous in source.
const ZERO_WIDTH_CODE_POINTS = new Set([0x200b, 0x200c, 0x200d, 0xfeff])

const NAME_MAX_LENGTH = 100
const EMAIL_MAX_LENGTH = 254

// Canonical list of chronotype options. The registration form builds its
// three option cards from this same array (see RegistrationForm.jsx) so the
// UI and this validation can never drift apart on what a valid value is.
export const CHRONOTYPES = [
  { value: 'early_bird', name: 'Early Bird', time: 'Before 9 AM' },
  { value: 'day_operator', name: 'Day Operator', time: '9 AM – 3 PM' },
  { value: 'night_owl', name: 'Night Owl', time: '6 PM – 2 AM' },
]

const CHRONOTYPE_VALUES = new Set(CHRONOTYPES.map((c) => c.value))

function hasVisibleCharacters(value) {
  for (const char of value.trim()) {
    if (!ZERO_WIDTH_CODE_POINTS.has(char.codePointAt(0))) return true
  }
  return false
}

function validateName(name) {
  if (!hasVisibleCharacters(name)) return 'Enter your name'
  if (name.trim().length > NAME_MAX_LENGTH) return `Name must be ${NAME_MAX_LENGTH} characters or fewer`
  return null
}

function validateEmail(email) {
  const trimmed = email.trim().toLowerCase()
  if (!trimmed) return 'Enter a valid email'
  if (trimmed.length > EMAIL_MAX_LENGTH) return `Email must be ${EMAIL_MAX_LENGTH} characters or fewer`
  if (!EMAIL_RE.test(trimmed)) return 'Enter a valid email'
  return null
}

function validatePhone(phone) {
  return PHONE_RE.test(phone.trim()) ? null : 'Enter a valid 10-digit number'
}

function validateChronotype(chronotype) {
  return CHRONOTYPE_VALUES.has(chronotype) ? null : 'Pick one'
}

export function validateRegistration({ name, email, phone, chronotype }) {
  return {
    name: validateName(name),
    email: validateEmail(email),
    phone: validatePhone(phone),
    chronotype: validateChronotype(chronotype),
  }
}

export function isValid(errors) {
  return Object.values(errors).every((e) => e === null)
}

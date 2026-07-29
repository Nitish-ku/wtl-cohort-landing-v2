import { describe, it, expect } from 'vitest'
import { validateRegistration, isValid, CHRONOTYPES, EMAIL_RE, PHONE_RE } from './validation'

const VALID_FIELDS = {
  name: 'Nitish Kumar Sharma',
  email: 'nitish@example.com',
  phone: '9876543210',
  chronotype: 'early_bird',
}

describe('validateRegistration', () => {
  it('accepts a fully valid submission', () => {
    const errors = validateRegistration(VALID_FIELDS)
    expect(isValid(errors)).toBe(true)
  })

  describe('name', () => {
    it('rejects an empty name', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, name: '' })
      expect(errors.name).toBe('Enter your name')
    })

    it('rejects a whitespace-only name', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, name: '   ' })
      expect(errors.name).toBe('Enter your name')
    })

    it('rejects a name made only of zero-width characters', () => {
      const zeroWidthOnly = String.fromCodePoint(0x200b, 0x200c, 0x200d, 0xfeff)
      const errors = validateRegistration({ ...VALID_FIELDS, name: zeroWidthOnly })
      expect(errors.name).toBe('Enter your name')
    })

    it('rejects zero-width characters mixed with real whitespace', () => {
      const errors = validateRegistration({
        ...VALID_FIELDS,
        name: '  ' + String.fromCodePoint(0x200b) + '  ',
      })
      expect(errors.name).toBe('Enter your name')
    })

    it('accepts a name containing a zero-width character alongside visible text', () => {
      const errors = validateRegistration({
        ...VALID_FIELDS,
        name: 'Nitish' + String.fromCodePoint(0x200b) + 'Sharma',
      })
      expect(errors.name).toBeNull()
    })

    it('accepts a name exactly at the 100-character limit', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, name: 'a'.repeat(100) })
      expect(errors.name).toBeNull()
    })

    it('rejects a name over the 100-character limit', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, name: 'a'.repeat(101) })
      expect(errors.name).toBe('Name must be 100 characters or fewer')
    })
  })

  describe('email', () => {
    it('rejects an empty email', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, email: '' })
      expect(errors.email).toBe('Enter a valid email')
    })

    it('rejects an email missing the @', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, email: 'nitishexample.com' })
      expect(errors.email).toBe('Enter a valid email')
    })

    it('rejects an email missing a dot in the domain', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, email: 'nitish@examplecom' })
      expect(errors.email).toBe('Enter a valid email')
    })

    it('accepts an email exactly at the 254-character limit', () => {
      const localPart = 'a'.repeat(254 - '@b.com'.length)
      const email = `${localPart}@b.com`
      expect(email.length).toBe(254)
      const errors = validateRegistration({ ...VALID_FIELDS, email })
      expect(errors.email).toBeNull()
    })

    it('rejects an email over the 254-character limit', () => {
      const localPart = 'a'.repeat(255 - '@b.com'.length)
      const email = `${localPart}@b.com`
      expect(email.length).toBe(255)
      const errors = validateRegistration({ ...VALID_FIELDS, email })
      expect(errors.email).toBe('Email must be 254 characters or fewer')
    })
  })

  describe('phone', () => {
    it('accepts a valid 10-digit number starting with 6-9', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, phone: '6000000000' })
      expect(errors.phone).toBeNull()
    })

    it('rejects a number starting with 0-5', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, phone: '5876543210' })
      expect(errors.phone).toBe('Enter a valid 10-digit number')
    })

    it('rejects a number with fewer than 10 digits', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, phone: '987654321' })
      expect(errors.phone).toBe('Enter a valid 10-digit number')
    })
  })

  describe('chronotype', () => {
    it('rejects a null chronotype', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, chronotype: null })
      expect(errors.chronotype).toBe('Pick one')
    })

    it('rejects a value not in the canonical list', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, chronotype: 'vampire' })
      expect(errors.chronotype).toBe('Pick one')
    })

    it('rejects a case mismatch against the canonical list', () => {
      const errors = validateRegistration({ ...VALID_FIELDS, chronotype: 'Early_Bird' })
      expect(errors.chronotype).toBe('Pick one')
    })

    it('accepts every value from the canonical CHRONOTYPES list', () => {
      for (const { value } of CHRONOTYPES) {
        const errors = validateRegistration({ ...VALID_FIELDS, chronotype: value })
        expect(errors.chronotype).toBeNull()
      }
    })
  })
})

describe('CHRONOTYPES', () => {
  it('exposes exactly the three backend-accepted values', () => {
    expect(CHRONOTYPES.map((c) => c.value)).toEqual(['early_bird', 'day_operator', 'night_owl'])
  })
})

describe('EMAIL_RE / PHONE_RE', () => {
  it('EMAIL_RE matches the backend contract shape', () => {
    expect(EMAIL_RE.test('a@b.com')).toBe(true)
    expect(EMAIL_RE.test('a b@c.com')).toBe(false)
  })

  it('PHONE_RE matches only 10 digits starting with 6-9', () => {
    expect(PHONE_RE.test('9123456789')).toBe(true)
    expect(PHONE_RE.test('1123456789')).toBe(false)
  })
})

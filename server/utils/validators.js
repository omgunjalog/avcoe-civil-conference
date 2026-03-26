const { PAPER_STATUSES } = require('../models/Paper')
const { PAYMENT_STATUSES } = require('../models/Registration')

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '')

const validateRegistrationPayload = (payload) => {
  const name = normalizeText(payload.name)
  const email = normalizeText(payload.email).toLowerCase()
  const phone = normalizeText(payload.phone)
  const college = normalizeText(payload.college)
  const category = normalizeText(payload.category)
  const paymentReference = normalizeText(payload.paymentReference)
  const paymentStatus = normalizeText(payload.paymentStatus) || 'proof_submitted'

  if (!name || !email || !phone || !college || !category || !paymentReference) {
    throw new Error('All registration fields and payment reference are required.')
  }

  if (!isValidEmail(email)) {
    throw new Error('Please provide a valid email address.')
  }

  if (!['Faculty', 'Students', 'Attendee'].includes(category)) {
    throw new Error('Invalid registration category.')
  }

  if (!PAYMENT_STATUSES.includes(paymentStatus)) {
    throw new Error('Invalid payment status.')
  }

  return { name, email, phone, college, category, paymentReference, paymentStatus }
}

const validatePaperPayload = (payload) => {
  const name = normalizeText(payload.name)
  const email = normalizeText(payload.email).toLowerCase()
  const title = normalizeText(payload.title)
  const abstract = normalizeText(payload.abstract)

  if (!name || !email || !title || !abstract) {
    throw new Error('All paper submission fields are required.')
  }

  if (!isValidEmail(email)) {
    throw new Error('Please provide a valid email address.')
  }

  if (abstract.length < 80) {
    throw new Error('Abstract should be at least 80 characters long.')
  }

  return { name, email, title, abstract }
}

const validatePaperStatusPayload = (payload) => {
  const status = normalizeText(payload.status)
  const reviewNote = normalizeText(payload.reviewNote)

  if (!status) {
    throw new Error('Paper status is required.')
  }

  if (!PAPER_STATUSES.includes(status)) {
    throw new Error('Invalid paper status.')
  }

  return { status, reviewNote }
}

const validatePaperTrackingPayload = (payload) => {
  const trackingId = normalizeText(payload.trackingId).toUpperCase()
  const email = normalizeText(payload.email).toLowerCase()

  if (!trackingId || !email) {
    throw new Error('Tracking ID and email are required.')
  }

  if (!isValidEmail(email)) {
    throw new Error('Please provide a valid email address.')
  }

  return { trackingId, email }
}

module.exports = {
  normalizeText,
  validatePaperPayload,
  validatePaperStatusPayload,
  validatePaperTrackingPayload,
  validateRegistrationPayload,
}

const fs = require('fs')
const path = require('path')
const { Registration } = require('../models/Registration')
const {
  queueNotification,
  sendRegistrationStatusEmail,
  sendRegistrationSubmittedEmail,
} = require('../services/notificationService')
const { validateRegistrationPayload } = require('../utils/validators')

const removeUploadedFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

const createRegistration = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400)
      throw new Error('Payment proof is required for registration.')
    }

    const payload = validateRegistrationPayload(req.body)

    const registration = await Registration.create({
      ...payload,
      paymentProofUrl: `/uploads/${req.file.filename}`,
    })

    res.status(201).json(registration)
    queueNotification('Registration submission email', () => sendRegistrationSubmittedEmail(registration))
  } catch (error) {
    removeUploadedFile(req.file?.path)
    if (!res.statusCode || res.statusCode === 200) {
      res.status(400)
    }
    next(error)
  }
}

const getRegistrations = async (_req, res, next) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 })
    res.json(registrations)
  } catch (error) {
    next(error)
  }
}

const updateRegistration = async (req, res, next) => {
  try {
    const payload = validateRegistrationPayload(req.body)
    const existingRegistration = await Registration.findById(req.params.id)

    if (!existingRegistration) {
      res.status(404)
      throw new Error('Registration not found.')
    }

    const paymentReviewedAt =
      payload.paymentStatus === 'proof_submitted'
        ? null
        : payload.paymentStatus !== existingRegistration.paymentStatus
          ? new Date()
          : existingRegistration.paymentReviewedAt

    const updatePayload = {
      ...payload,
      paymentReviewedAt,
    }

    const registration = await Registration.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
      runValidators: true,
    })

    res.json(registration)
    if (payload.paymentStatus !== existingRegistration.paymentStatus) {
      queueNotification('Registration status email', () => sendRegistrationStatusEmail(registration))
    }
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) {
      res.status(400)
    }
    next(error)
  }
}

const deleteRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id)
    if (!registration) {
      res.status(404)
      throw new Error('Registration not found.')
    }

    const filePath = path.join(__dirname, '..', registration.paymentProofUrl.replace(/^\//, ''))
    removeUploadedFile(filePath)

    res.json({ message: 'Registration deleted.' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createRegistration,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
}

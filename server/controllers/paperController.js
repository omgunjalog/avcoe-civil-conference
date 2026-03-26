const fs = require('fs')
const path = require('path')
const { Paper } = require('../models/Paper')
const { Registration } = require('../models/Registration')
const {
  sendPaperStatusEmail,
  sendPaperSubmittedEmail,
} = require('../services/notificationService')
const {
  validatePaperPayload,
  validatePaperStatusPayload,
  validatePaperTrackingPayload,
} = require('../utils/validators')

const removeUploadedFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

const buildTrackingId = () => `CIV-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString().slice(-6)}`

const generateTrackingId = async () => {
  let trackingId = buildTrackingId()
  let existingPaper = await Paper.findOne({ trackingId }).lean()

  while (existingPaper) {
    trackingId = buildTrackingId()
    existingPaper = await Paper.findOne({ trackingId }).lean()
  }

  return trackingId
}

const ensurePaperWorkflowFields = async (paper) => {
  let shouldSave = false

  if (!paper.trackingId) {
    paper.trackingId = await generateTrackingId()
    shouldSave = true
  }

  if (!paper.status) {
    paper.status = 'submitted'
    shouldSave = true
  }

  if (!paper.statusUpdatedAt) {
    paper.statusUpdatedAt = paper.updatedAt || paper.createdAt || new Date()
    shouldSave = true
  }

  if (!Array.isArray(paper.history) || !paper.history.length) {
    paper.history = [
      {
        status: paper.status,
        note: 'Submission received.',
        changedAt: paper.createdAt || new Date(),
      },
    ]
    shouldSave = true
  }

  if (typeof paper.reviewNote !== 'string') {
    paper.reviewNote = ''
    shouldSave = true
  }

  if (shouldSave) {
    await paper.save()
  }

  return paper
}

const getRegistrationSnapshot = async (email) => {
  const registrations = await Registration.find({ email }).sort({ createdAt: -1 }).lean()
  const matchedRegistration =
    registrations.find((item) => item.paymentStatus === 'verified') || registrations[0]

  if (!matchedRegistration) {
    return {
      hasRegistration: false,
      isVerified: false,
      paymentStatus: 'not_registered',
      category: null,
      paymentReviewedAt: null,
      createdAt: null,
      paymentProofUrl: null,
      message: 'No completed registration is linked to this author email yet.',
    }
  }

  return {
    hasRegistration: true,
    isVerified: matchedRegistration.paymentStatus === 'verified',
    registrationId: matchedRegistration._id,
    paymentStatus: matchedRegistration.paymentStatus,
    category: matchedRegistration.category,
    paymentReviewedAt: matchedRegistration.paymentReviewedAt || null,
    createdAt: matchedRegistration.createdAt || null,
    paymentProofUrl: matchedRegistration.paymentProofUrl || null,
    message:
      matchedRegistration.paymentStatus === 'verified'
        ? 'Registration is verified and satisfies publication readiness.'
        : 'Registration exists, but payment verification is still pending.',
  }
}

const enrichPaper = async (paperDocument) => {
  const paper = paperDocument.toObject ? paperDocument.toObject() : paperDocument

  return {
    ...paper,
    registration: await getRegistrationSnapshot(paper.email),
  }
}

const sanitizePaperForTracking = (paper) => ({
  trackingId: paper.trackingId,
  title: paper.title,
  author: paper.name,
  email: paper.email,
  status: paper.status,
  statusUpdatedAt: paper.statusUpdatedAt,
  reviewNote: paper.reviewNote,
  createdAt: paper.createdAt,
  updatedAt: paper.updatedAt,
  history: paper.history,
  registration: paper.registration,
})

const createPaper = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400)
      throw new Error('PDF file is required.')
    }

    const payload = validatePaperPayload(req.body)
    const trackingId = await generateTrackingId()
    const now = new Date()

    const paper = await Paper.create({
      ...payload,
      fileUrl: `/uploads/${req.file.filename}`,
      trackingId,
      status: 'submitted',
      statusUpdatedAt: now,
      history: [{ status: 'submitted', note: 'Paper submitted successfully.', changedAt: now }],
    })

    const enrichedPaper = await enrichPaper(paper)
    await sendPaperSubmittedEmail(enrichedPaper)
    res.status(201).json(enrichedPaper)
  } catch (error) {
    removeUploadedFile(req.file?.path)
    if (!res.statusCode || res.statusCode === 200) {
      res.status(400)
    }
    next(error)
  }
}

const getPapers = async (_req, res, next) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 })
    await Promise.all(papers.map((paper) => ensurePaperWorkflowFields(paper)))
    res.json(await Promise.all(papers.map((paper) => enrichPaper(paper))))
  } catch (error) {
    next(error)
  }
}

const updatePaper = async (req, res, next) => {
  try {
    const payload = validatePaperPayload(req.body)
    const paper = await Paper.findByIdAndUpdate(
      req.params.id,
      {
        name: payload.name,
        email: payload.email,
        title: payload.title,
        abstract: payload.abstract,
      },
      {
        new: true,
        runValidators: true,
      },
    )

    if (!paper) {
      res.status(404)
      throw new Error('Paper not found.')
    }

    res.json(await enrichPaper(paper))
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) {
      res.status(400)
    }
    next(error)
  }
}

const updatePaperStatus = async (req, res, next) => {
  try {
    const payload = validatePaperStatusPayload(req.body)
    const paper = await Paper.findById(req.params.id)

    if (!paper) {
      res.status(404)
      throw new Error('Paper not found.')
    }

    await ensurePaperWorkflowFields(paper)
    const registration = await getRegistrationSnapshot(paper.email)

    if (payload.status === 'published' && !registration.isVerified) {
      res.status(400)
      throw new Error('A verified registration is required before marking a paper as published.')
    }

    const now = new Date()
    paper.status = payload.status
    paper.reviewNote = payload.reviewNote
    paper.statusUpdatedAt = now
    paper.history.push({
      status: payload.status,
      note: payload.reviewNote,
      changedAt: now,
    })

    await paper.save()
    const enrichedPaper = await enrichPaper(paper)
    await sendPaperStatusEmail(enrichedPaper)
    res.json(enrichedPaper)
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) {
      res.status(400)
    }
    next(error)
  }
}

const trackPaper = async (req, res, next) => {
  try {
    const payload = validatePaperTrackingPayload(req.body)
    const paper = await Paper.findOne({
      trackingId: payload.trackingId,
      email: payload.email,
    }).lean()

    if (!paper) {
      res.status(404)
      throw new Error('No paper was found for that tracking ID and email.')
    }

    res.json(sanitizePaperForTracking(await enrichPaper(paper)))
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) {
      res.status(400)
    }
    next(error)
  }
}

const deletePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findByIdAndDelete(req.params.id)

    if (!paper) {
      res.status(404)
      throw new Error('Paper not found.')
    }

    const filePath = path.join(__dirname, '..', paper.fileUrl.replace(/^\//, ''))
    removeUploadedFile(filePath)

    res.json({ message: 'Paper deleted.' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createPaper,
  getPapers,
  trackPaper,
  updatePaper,
  updatePaperStatus,
  deletePaper,
}

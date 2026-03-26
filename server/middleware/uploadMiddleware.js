const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { uploadDirectory } = require('../config/paths')

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true })
}

const createStorage = (prefix, extensionResolver) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDirectory),
    filename: (_req, file, cb) => {
      const safeBase = path.parse(file.originalname).name.replace(/[^a-z0-9-_]/gi, '-').toLowerCase()
      cb(null, `${prefix}-${Date.now()}-${safeBase}${extensionResolver(file)}`)
    },
  })

const pdfOnlyFilter = (_req, file, cb) => {
  if (file.mimetype !== 'application/pdf') {
    return cb(new Error('Only PDF files are allowed.'))
  }
  return cb(null, true)
}

const paymentProofFilter = (_req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Upload a PDF, JPG, PNG, or WEBP payment proof file.'))
  }
  return cb(null, true)
}

const uploadPaper = multer({
  storage: createStorage('paper', () => '.pdf'),
  fileFilter: pdfOnlyFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
})

const uploadRegistrationProof = multer({
  storage: createStorage('payment', (file) => path.extname(file.originalname).toLowerCase() || '.pdf'),
  fileFilter: paymentProofFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

module.exports = { uploadPaper, uploadRegistrationProof }

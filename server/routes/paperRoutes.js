const express = require('express')
const {
  createPaper,
  deletePaper,
  getPapers,
  trackPaper,
  updatePaper,
  updatePaperStatus,
} = require('../controllers/paperController')
const { protectAdmin } = require('../middleware/authMiddleware')
const { uploadPaper } = require('../middleware/uploadMiddleware')

const router = express.Router()

router.post('/submit-paper', uploadPaper.single('file'), createPaper)
router.post('/track-paper', trackPaper)
router.get('/papers', protectAdmin, getPapers)
router.patch('/papers/:id', protectAdmin, updatePaper)
router.patch('/papers/:id/status', protectAdmin, updatePaperStatus)
router.delete('/papers/:id', protectAdmin, deletePaper)

module.exports = router

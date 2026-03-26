const express = require('express')
const { getOverview, loginAdmin } = require('../controllers/adminController')
const { protectAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login', loginAdmin)
router.get('/overview', protectAdmin, getOverview)

module.exports = router

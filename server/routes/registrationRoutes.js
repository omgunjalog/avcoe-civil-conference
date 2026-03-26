const express = require('express')
const {
  createRegistration,
  deleteRegistration,
  getRegistrations,
  updateRegistration,
} = require('../controllers/registrationController')
const { protectAdmin } = require('../middleware/authMiddleware')
const { uploadRegistrationProof } = require('../middleware/uploadMiddleware')

const router = express.Router()

router.route('/').post(uploadRegistrationProof.single('paymentProof'), createRegistration).get(protectAdmin, getRegistrations)
router.route('/:id').patch(protectAdmin, updateRegistration).delete(protectAdmin, deleteRegistration)

module.exports = router

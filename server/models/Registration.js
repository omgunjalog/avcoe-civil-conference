const mongoose = require('mongoose')

const PAYMENT_STATUSES = ['proof_submitted', 'verified', 'rejected']

const registrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['Faculty', 'Students', 'Attendee'] },
    paymentReference: { type: String, required: true, trim: true },
    paymentProofUrl: { type: String, required: true, trim: true },
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: 'proof_submitted',
    },
    paymentReviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
)

module.exports = {
  Registration: mongoose.model('Registration', registrationSchema),
  PAYMENT_STATUSES,
}

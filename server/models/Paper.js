const mongoose = require('mongoose')

const PAPER_STATUSES = [
  'submitted',
  'under_review',
  'revision_requested',
  'accepted',
  'rejected',
  'camera_ready_pending',
  'published',
]

const paperHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: PAPER_STATUSES,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const paperSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    abstract: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
    trackingId: { type: String, required: true, index: true, trim: true },
    status: {
      type: String,
      enum: PAPER_STATUSES,
      default: 'submitted',
    },
    statusUpdatedAt: {
      type: Date,
      default: Date.now,
    },
    reviewNote: {
      type: String,
      trim: true,
      default: '',
    },
    history: {
      type: [paperHistorySchema],
      default: [],
    },
  },
  { timestamps: true },
)

module.exports = {
  Paper: mongoose.model('Paper', paperSchema),
  PAPER_STATUSES,
}

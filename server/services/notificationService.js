const { sendEmail } = require('./emailService')

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

const sendSafely = async (payload) => {
  try {
    await sendEmail(payload)
  } catch (error) {
    console.error('Email delivery failed:', error.message)
  }
}

const queueNotification = (label, task) => {
  setImmediate(async () => {
    try {
      await task()
    } catch (error) {
      console.error(`${label} dispatch failed:`, error.message)
    }
  })
}

const buildHtml = (title, intro, lines, actionLabel, actionHref) => `
  <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
    <h2 style="margin-bottom: 12px;">${title}</h2>
    <p>${intro}</p>
    <ul style="padding-left: 18px;">
      ${lines.map((line) => `<li>${line}</li>`).join('')}
    </ul>
    ${
      actionHref
        ? `<p style="margin-top: 24px;"><a href="${actionHref}" style="display: inline-block; background: #0a192f; color: #ffffff; padding: 12px 18px; border-radius: 999px; text-decoration: none;">${actionLabel}</a></p>`
        : ''
    }
    <p style="margin-top: 24px; color: #475569;">SRES-26<br/>Amrutvahini College of Engineering, Civil Department</p>
  </div>
`

const sendRegistrationSubmittedEmail = async (registration) => {
  const subject = 'SRES-26 registration received'
  const lines = [
    `Name: ${registration.name}`,
    `Category: ${registration.category}`,
    `Payment reference: ${registration.paymentReference}`,
      'Current payment state: Proof submitted',
  ]

  await sendSafely({
    to: registration.email,
    subject,
    text: [
      'Your SRES-26 registration has been received.',
      ...lines,
      'Next step: the organizing team will review your payment proof and update your verification status.',
      `Registration page: ${clientUrl}/registration`,
    ].join('\n'),
    html: buildHtml(
      'Registration received',
      'Your SRES-26 registration has been recorded successfully.',
      [
        ...lines,
        'Next step: the organizing team will review your payment proof and update your verification status.',
      ],
      'View Registration Page',
      `${clientUrl}/registration`,
    ),
  })
}

const sendRegistrationStatusEmail = async (registration) => {
  const subject = `SRES-26 registration ${registration.paymentStatus.replaceAll('_', ' ')}`
  const lines = [
    `Name: ${registration.name}`,
    `Category: ${registration.category}`,
    `Payment reference: ${registration.paymentReference}`,
    `Current payment state: ${registration.paymentStatus.replaceAll('_', ' ')}`,
  ]

  await sendSafely({
    to: registration.email,
    subject,
    text: [
      'Your SRES-26 registration has been updated.',
      ...lines,
      registration.paymentStatus === 'verified'
        ? 'Your registration is verified. You are now ready for the next conference steps tied to participation or publication.'
        : 'Your payment review status has changed. Please check with the organizing team if action is required.',
      `Registration page: ${clientUrl}/registration`,
    ].join('\n'),
    html: buildHtml(
      'Registration updated',
      'The organizing team updated your registration record.',
      [
        ...lines,
        registration.paymentStatus === 'verified'
          ? 'Your registration is verified. You are now ready for the next conference steps tied to participation or publication.'
          : 'Your payment review status has changed. Please check with the organizing team if action is required.',
      ],
      'Open Registration Page',
      `${clientUrl}/registration`,
    ),
  })
}

const sendPaperSubmittedEmail = async (paper) => {
  const subject = 'SRES-26 paper submission received'
  const lines = [
    `Title: ${paper.title}`,
    `Tracking ID: ${paper.trackingId}`,
    'Current status: submitted',
    'Submission tracked without a separate account',
  ]

  await sendSafely({
    to: paper.email,
    subject,
    text: [
      'Your paper submission for SRES-26 has been received.',
      ...lines,
      'Next step: keep the tracking ID safe and use it to monitor review progress.',
      `Track your paper: ${clientUrl}/track-paper`,
      'Reminder: verified registration is required before final publication or presentation readiness.',
    ].join('\n'),
    html: buildHtml(
      'Paper submission received',
      'Your manuscript is now in the SRES-26 system.',
      [
        ...lines,
        'Next step: keep the tracking ID safe and use it to monitor review progress.',
        'Reminder: verified registration is required before final publication or presentation readiness.',
      ],
      'Track Submission',
      `${clientUrl}/track-paper`,
    ),
  })
}

const sendPaperStatusEmail = async (paper) => {
  const subject = `SRES-26 paper status: ${paper.status.replaceAll('_', ' ')}`
  const lines = [
    `Title: ${paper.title}`,
    `Tracking ID: ${paper.trackingId}`,
    `Current status: ${paper.status.replaceAll('_', ' ')}`,
    `Registration readiness: ${paper.registration?.paymentStatus?.replaceAll('_', ' ') || 'not registered'}`,
  ]

  await sendSafely({
    to: paper.email,
    subject,
    text: [
      'Your paper status has been updated.',
      ...lines,
      paper.reviewNote ? `Committee note: ${paper.reviewNote}` : 'No committee note was provided.',
      `Track your paper: ${clientUrl}/track-paper`,
    ].join('\n'),
    html: buildHtml(
      'Paper status updated',
      'The review team updated the status of your submission.',
      [
        ...lines,
        paper.reviewNote ? `Committee note: ${paper.reviewNote}` : 'No committee note was provided.',
      ],
      'Track Submission',
      `${clientUrl}/track-paper`,
    ),
  })
}

module.exports = {
  queueNotification,
  sendPaperStatusEmail,
  sendPaperSubmittedEmail,
  sendRegistrationStatusEmail,
  sendRegistrationSubmittedEmail,
}

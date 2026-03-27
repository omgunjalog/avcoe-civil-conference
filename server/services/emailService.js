const fs = require('fs')
const path = require('path')

let nodemailer = null

try {
  nodemailer = require('nodemailer')
} catch (_error) {
  nodemailer = null
}

let transporter = null
let warnedMissingTransport = false
const outboxDirectory = path.join(__dirname, '..', 'email-outbox')

const getDeliveryMode = () => {
  const configuredMode = String(process.env.EMAIL_DELIVERY_MODE || '').toLowerCase().trim()
  if (configuredMode) {
    return configuredMode
  }

  return String(process.env.EMAIL_NOTIFICATIONS_ENABLED || 'false').toLowerCase() === 'true'
    ? 'smtp'
    : 'off'
}

const getTransporter = () => {
  if (getDeliveryMode() !== 'smtp') {
    return null
  }

  if (!nodemailer) {
    if (!warnedMissingTransport) {
      console.warn('Email notifications are enabled, but nodemailer is not installed. Run `npm install` in the server directory.')
      warnedMissingTransport = true
    }
    return null
  }

  if (transporter) {
    return transporter
  }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    if (!warnedMissingTransport) {
      console.warn('Email notifications are enabled, but SMTP credentials are incomplete. Emails will be skipped.')
      warnedMissingTransport = true
    }
    return null
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    auth: { user, pass },
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 10000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 10000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 20000),
  })

  return transporter
}

const ensureOutboxDirectory = () => {
  if (!fs.existsSync(outboxDirectory)) {
    fs.mkdirSync(outboxDirectory, { recursive: true })
  }
}

const writePreviewEmail = async ({ to, subject, text, html }) => {
  ensureOutboxDirectory()

  const filename = `${Date.now()}-${String(to).replace(/[^a-z0-9@._-]/gi, '_')}.json`
  const filePath = path.join(outboxDirectory, filename)

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      {
        to,
        subject,
        text,
        html,
        createdAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  )

  console.info(`Email preview written to ${filePath}`)
  return { sent: false, preview: true, filePath }
}

const sendEmail = async ({ to, subject, text, html }) => {
  const deliveryMode = getDeliveryMode()

  if (deliveryMode === 'off') {
    console.info(`Email skipped for ${to}: ${subject}`)
    return { sent: false, skipped: true }
  }

  if (deliveryMode === 'preview') {
    return writePreviewEmail({ to, subject, text, html })
  }

  const activeTransporter = getTransporter()

  if (!activeTransporter) {
    console.info(`Email skipped for ${to}: ${subject}`)
    return { sent: false, skipped: true }
  }

  await activeTransporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  })

  return { sent: true }
}

module.exports = {
  sendEmail,
}

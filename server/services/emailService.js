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
const brevoApiUrl = 'https://api.brevo.com/v3/smtp/email'

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

const parseFromAddress = () => {
  const fallbackEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || 'no-reply@example.com'
  const fallbackName = process.env.BREVO_SENDER_NAME || 'SRES-26'
  const configuredFrom = String(process.env.MAIL_FROM || '').trim()

  if (!configuredFrom) {
    return { email: fallbackEmail, name: fallbackName }
  }

  const match = configuredFrom.match(/^(.*)<([^>]+)>$/)
  if (!match) {
    return { email: configuredFrom, name: fallbackName }
  }

  const name = match[1].trim().replace(/^"|"$/g, '') || fallbackName
  const email = match[2].trim() || fallbackEmail
  return { email, name }
}

const sendViaBrevoApi = async ({ to, subject, text, html }) => {
  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    if (!warnedMissingTransport) {
      console.warn('Brevo API delivery is enabled, but BREVO_API_KEY is missing. Emails will be skipped.')
      warnedMissingTransport = true
    }
    return { sent: false, skipped: true }
  }

  const sender = parseFromAddress()
  const response = await fetch(brevoApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender,
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
    signal: AbortSignal.timeout(Number(process.env.BREVO_API_TIMEOUT || 15000)),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Brevo API ${response.status}: ${errorBody}`)
  }

  return { sent: true }
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

  if (deliveryMode === 'brevo_api') {
    return sendViaBrevoApi({ to, subject, text, html })
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

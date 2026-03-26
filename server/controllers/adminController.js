const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Registration } = require('../models/Registration')
const { Paper } = require('../models/Paper')
const { normalizeText } = require('../utils/validators')

const loginAdmin = async (req, res, next) => {
  try {
    const email = normalizeText(req.body.email).toLowerCase()
    const password = normalizeText(req.body.password)
    const adminEmail = normalizeText(process.env.ADMIN_EMAIL).toLowerCase()
    const adminPassword = process.env.ADMIN_PASSWORD || ''
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''

    if (!email || !password) {
      res.status(400)
      throw new Error('Email and password are required.')
    }

    const passwordMatches = adminPasswordHash
      ? await bcrypt.compare(password, adminPasswordHash)
      : password === adminPassword

    if (email !== adminEmail || !passwordMatches) {
      res.status(401)
      throw new Error('Invalid admin credentials.')
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '12h' })
    res.json({ token })
  } catch (error) {
    if (!res.statusCode || res.statusCode === 200) {
      res.status(400)
    }
    next(error)
  }
}

const getOverview = async (_req, res, next) => {
  try {
    const [registrations, papers] = await Promise.all([
      Registration.countDocuments(),
      Paper.countDocuments(),
    ])
    res.json({ registrations, papers })
  } catch (error) {
    next(error)
  }
}

module.exports = { loginAdmin, getOverview }

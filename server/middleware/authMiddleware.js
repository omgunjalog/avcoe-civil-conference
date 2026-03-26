const jwt = require('jsonwebtoken')

const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized access.' })
  }

  try {
    const token = authHeader.split(' ')[1]
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

module.exports = { protectAdmin }

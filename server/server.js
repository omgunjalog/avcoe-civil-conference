const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const { uploadDirectory } = require('./config/paths')
const registrationRoutes = require('./routes/registrationRoutes')
const paperRoutes = require('./routes/paperRoutes')
const adminRoutes = require('./routes/adminRoutes')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')

dotenv.config()
connectDB()

const app = express()

const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Origin not allowed by CORS'))
    },
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/uploads', express.static(uploadDirectory))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/register', registrationRoutes)
app.use('/api', paperRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

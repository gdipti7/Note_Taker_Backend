import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import noteRoutes from './routes/noteRoutes.js'
import authRoutes from './routes/authRoutes.js'
import aiRoutes from './routes/aiRoutes.js'

const app = express()

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL]
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('CORS origin not allowed'))
    },
    credentials: true,
  })
)

app.use(express.json())
app.get('/health', (req, res) => res.status(200).json({ ok: true }))
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/ai', aiRoutes)

export default app
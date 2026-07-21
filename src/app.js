import express from 'express'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js'
import authRoutes from './routes/authRoutes.js'
import verifyToken from './middleware/verifyToken.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/notes', verifyToken, noteRoutes)

export default app
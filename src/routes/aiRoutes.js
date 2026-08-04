import { Router } from 'express'
import { summariseNote } from '../controllers/aiController.js'
import verifyToken from '../middleware/verifyToken.js'

const router = Router()

router.post('/summarise', verifyToken, summariseNote)

export default router
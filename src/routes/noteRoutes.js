import express from 'express'
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js'
import { noteRules, noteUpdateRules, validateNote } from '../validator/noteValidator.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/', getAllNotes)
router.get('/:id', getNoteById)
router.post('/', verifyToken, noteRules, validateNote, createNote)   // ← protect भयो
router.put('/:id', verifyToken, noteUpdateRules, validateNote, updateNote)
router.delete('/:id', verifyToken, deleteNote)

export default router
import express from 'express'
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/noteController.js'
import { noteRules, noteUpdateRules, validateNote } from '../validator/noteValidator.js'

const router = express.Router()

router.get('/', getAllNotes)
router.get('/:id', getNoteById)
router.post('/', noteRules, validateNote, createNote)
router.put('/:id', noteUpdateRules, validateNote, updateNote)
router.delete('/:id', deleteNote)

export default router
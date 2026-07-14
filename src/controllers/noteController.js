import * as noteModel from '../models/noteModel.js'

export async function getAllNotes(req, res) {
  try {
    const notes = await noteModel.getAll()
    res.status(200).json(notes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await noteModel.getById(req.params.id)
    if (!note) return res.status(404).json({ error: 'Note not found' })
    res.status(200).json(note)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createNote(req, res) {
  try {
    const { title, content, category } = req.body
    if (!title || !content || !category)
      return res.status(400).json({ error: 'Title, content and category are required' })
    const newNote = await noteModel.create(title, content, category)
    res.status(201).json(newNote)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function updateNote(req, res) {
  try {
    const updated = await noteModel.update(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Note not found' })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export async function deleteNote(req, res) {
  try {
    const deleted = await noteModel.remove(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Note not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
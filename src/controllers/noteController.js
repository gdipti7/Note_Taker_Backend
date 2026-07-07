import * as noteModel from '../models/noteModel.js';

export function getAllNotes(req, res) {
  res.json(noteModel.getAll());
}

export function getNoteById(req, res) {
  const note = noteModel.getById(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
}

export function createNote(req, res) {
  const { title, body, category } = req.body;
  if (!title || !body) return res.status(400).json({ error: "Title and body are required" });
  const newNote = noteModel.create(title, body, category);
  res.status(201).json(newNote);
}

export function updateNote(req, res) {
  const updated = noteModel.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Note not found" });
  res.json(updated);
}

export function deleteNote(req, res) {
  const deleted = noteModel.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Note not found" });
  res.status(204).send();
}
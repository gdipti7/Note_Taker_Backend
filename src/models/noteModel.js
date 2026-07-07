import notes from '../../data/notes.js';

export function getAll() {
  return notes;
}

export function getById(id) {
  return notes.find((n) => n.id === Number(id));
}

export function create(title, body, category) {
  const newNote = {
    id: Date.now(),
    title,
    body,
    category: category || "Personal",
  };
  notes.push(newNote);
  return newNote;
}

export function update(id, data) {
  const note = notes.find((n) => n.id === Number(id));
  if (!note) return null;
  if (data.title !== undefined) note.title = data.title;
  if (data.body !== undefined) note.body = data.body;
  if (data.category !== undefined) note.category = data.category;
  return note;
}

export function remove(id) {
  const index = notes.findIndex((n) => n.id === Number(id));
  if (index === -1) return false;
  notes.splice(index, 1);
  return true;
}
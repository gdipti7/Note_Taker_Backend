import Note from '../../data/note.js'

export async function getAll() {
  return await Note.find()
}

export async function getById(id) {
  return await Note.findById(id)
}

export async function create(title, content, category) {
  return await Note.create({ title, content, category })
}

export async function update(id, data) {
  return await Note.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
}

export async function remove(id) {
  return await Note.findByIdAndDelete(id)
}
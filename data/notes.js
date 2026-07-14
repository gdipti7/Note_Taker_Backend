import dbConnection from '../src/config/db.js'
import Note from './note.js'

const initialNotes = [
  {
    title: 'Meeting with Team',
    category: 'Work',
    content: 'Discuss project progress',
  },
  {
    title: 'Buy Groceries',
    category: 'Personal',
    content: 'Milk, Bread, Eggs',
  },
  {
    title: 'React Revision',
    category: 'Study',
    content: 'Hooks and Components',
  },
  {
    title: 'Workout Plan',
    category: 'Health',
    content: 'Gym at 6 PM',
  },
]

await dbConnection()
await Note.deleteMany({})
await Note.insertMany(initialNotes)
process.exit()
export default initialNotes
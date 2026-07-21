import User from '../../data/user.js'
import bcrypt from 'bcrypt'

export async function findByEmail(email) {
  return await User.findOne({ email })
}

export async function findById(id) {
  return await User.findById(id)
}

export async function register(userData) {   
  return await User.create(userData)
}

export async function isValidPassword(enteredPassword, hashedPassword) {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}
import * as authModel from '../models/authModel.js'
import { generateToken } from '../utils/auth.js'

export const registerUser = async (req, res) => {
  console.log('auth routes check')
  const { first_name, last_name, email, password, confirm_password, accept_terms } = req.body

  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' })
  }

  if (!accept_terms) {
    return res.status(400).json({ message: 'You must accept the terms and conditions' })
  }

  try {
    const existingUser = await authModel.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const newUser = await authModel.register({
      first_name,
      last_name,
      email,
      password,
    })

    const token = generateToken(newUser)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error('Error registering user:', error.message)
    res.status(500).json({ message: 'Error registering user', error: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const user = await authModel.findByEmail(email)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await authModel.isValidPassword(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = generateToken(user)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Error logging in:', error.message)
    res.status(500).json({ message: 'Error logging in', error: error.message })
  }
}
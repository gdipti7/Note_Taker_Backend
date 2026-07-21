import { verifyToken as verifyJWT } from '../utils/auth.js'

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const verified = verifyJWT(token)
    req.user = verified
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token Expired' })
    }
    res.status(400).json({ message: 'Invalid Token' })
  }
}

export default verifyToken
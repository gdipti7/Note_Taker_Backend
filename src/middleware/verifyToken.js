import { verifyToken as verifyJWT } from '../utils/auth.js'

const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

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
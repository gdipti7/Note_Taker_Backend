import { generateAIResponse } from '../services/groqAPI.js'

export const summariseNote = async (req, res) => {
  try {
    const response = await generateAIResponse(req.body.content)
    return res.status(200).json({ data: response })
  } catch (error) {
    if (error.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded.' })
    } else if (error.status === 500) {
      return res.status(500).json({ error: 'Internal server error.' })
    }
    return res.status(400).json({ error: error.message })
  }
}
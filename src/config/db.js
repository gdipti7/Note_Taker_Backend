import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({
  path: './.env',
})

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB successfully connected!`)
  } catch (error) {
    console.log(`MongoDB cannot be connected ${error.message}`)
    process.exit()
  }
}

export default dbConnection
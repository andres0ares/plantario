import mongoose from 'mongoose'
const { MONGODB_URI } = process.env

const connection = {}

async function dbConnect() {
    if(connection.isConnected) return

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }

    const db = await mongoose.connect(MONGODB_URI, opts)

    connection.isConnected = db.connections[0].readyState
    console.log(connection.isConnected)
}

export default dbConnect
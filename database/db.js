require('dotenv').config()
const mongoose = require('mongoose')


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database is successfully connected')
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectDb;
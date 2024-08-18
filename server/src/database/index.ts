import mongoose from 'mongoose'
import 'dotenv/config'
import ApiResponse from '../utilities/responseHandler'


const connectDB = async() => {
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
        console.log("Server is running on: " +instance.connection.host)

    } catch (error) {
        console.log("E:" +error)
    }
}

export {
    connectDB
}
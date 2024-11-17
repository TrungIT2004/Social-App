import mongoose from "mongoose"
import { env } from "../configs/config"

const connectToMongoDB = async () => {
    console.log(env.MONGO_URL)
    return await mongoose.connect(env.MONGO_URL).then( () => {console.log('Connected to MongoDB')})
}

export default connectToMongoDB
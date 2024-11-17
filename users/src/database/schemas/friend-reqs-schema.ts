import mongoose from "mongoose"

const friendReqSchema = new mongoose.Schema({
    senderid: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true
    },
    receiverid: {
        type: String,
        required: true,
    },
    receiverName: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const friendReqModel = mongoose.model('friendReq', friendReqSchema)

export default friendReqModel

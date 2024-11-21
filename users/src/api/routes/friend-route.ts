import express from 'express'
import { addFriend, deleteFriendRequest, getFriends, getReceiverRequests, getSenderRequests, sendFriendRequest, unfriend } from '../controllers/friendsController'

const friendRouter = express.Router()

friendRouter.get('/get-sender-requests', getSenderRequests)
friendRouter.get('/get-receiver-requests', getReceiverRequests)
friendRouter.post('/send-request', sendFriendRequest)
friendRouter.delete('/:requestid', deleteFriendRequest)
friendRouter.post('/accept-request', addFriend)
friendRouter.patch('/unfriend', unfriend)
friendRouter.get('/list', getFriends)

export default friendRouter
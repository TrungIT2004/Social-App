import express from 'express'
import { addFriend, deleteFriendRequest, getFriends, getSentFriendRequests, getReceivedFriendRequests, sendFriendRequest, unfriend, checkFriendRequest } from '../controllers/friendsController'

const friendRouter = express.Router()

friendRouter.get('/get-sender-requests', getSentFriendRequests)
friendRouter.get('/get-receiver-requests', getReceivedFriendRequests)
friendRouter.post('/send-request', sendFriendRequest)
friendRouter.delete('/:requestid', deleteFriendRequest)
friendRouter.post('/accept-request', addFriend)
friendRouter.patch('/unfriend', unfriend)
friendRouter.get('/list', getFriends)
friendRouter.get('/check-req', checkFriendRequest)

export default friendRouter
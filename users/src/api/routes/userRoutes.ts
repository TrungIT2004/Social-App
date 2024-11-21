import express from 'express'
import { addFriend, getFriendRequests, refresh, sendFriendRequest, signIn, signOut, signUp } from '../controllers/userControllers'
const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/refresh', refresh)
router.post('/signout', signOut)

router.get('/get-friend-requests', getFriendRequests)
router.post('/friend-request', sendFriendRequest)
router.post('/add-friend', addFriend)

export default router
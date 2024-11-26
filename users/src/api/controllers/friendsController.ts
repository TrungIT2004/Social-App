import { FriendService } from "../../services/friend-service"
import { Request, Response } from 'express'


const friendService = new FriendService()

export const getSentFriendRequests = async (req: Request, res: Response) => {
    const userid: any = req.headers['x-user-id']

    try {
        const friendReqs = await friendService.getSentFriendRequests(userid)
        res.status(200).json(friendReqs)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getReceivedFriendRequests = async (req: Request, res: Response) => {
    const userid: any = req.headers['x-user-id']

    try {
        const friendReqs: any = await friendService.getReceivedFriendRequests(userid)

        if (friendReqs.rowCount === 0) {
            res.status(400).json({"msg": "Either the receiver not exist or you already sent the friend request"})
            return
        }

        res.status(200).json(friendReqs)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const checkFriendRequest = async (req: Request, res: Response) => {
    // const { user1id, user2id } = req.body
    // console.log(user1id, user2id)
    const user1id: any = req.headers['x-user-id']
    const user2id: any = req.headers['x-user2-id']

    if (!user1id || !user2id) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    } 

    // if (userid !== user1id) {
    //     res.status(400).json({ "msg": "Who tf are you?!?" })
    //     return
    // }

    try {
        const exists = await friendService.checkFriendReq(user1id, user2id)
        console.log('Exists: ', exists)
        res.status(200).json(exists)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const sendFriendRequest = async (req: Request, res: Response) => {
    const { senderid, receiverid, status } = req.body
    const userid = req.headers['x-user-id']

    if (!senderid || !receiverid || !status) {
        res.status(400).json({ "msg": "Missing fields"}) 
        return
    }

    if (senderid !== userid) {
        res.status(400).json({ "msg": "Send the friend request yourself bruh" })
        return
    }

    if (senderid === receiverid) {
        res.status(400).json({ "msg": "You autistic or what?!?" })  
        return
    }

    try {
        const newFriendRequest: any = await friendService.sendFriendRequest({ senderid, receiverid, status })
        
        res.status(200).json(newFriendRequest)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const deleteFriendRequest = async (req: Request, res: Response) => {
    const { requestid } = req.params

    if (!requestid) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    }

    try {
        const deletedFriendRequest = await friendService.deleteFriendRequest(requestid)

        if (deletedFriendRequest.rowCount === 0) {
            res.status(404).json({ "msg": "Can't not find the request" })
            return
        }

        res.status(200).json(deletedFriendRequest)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const addFriend = async (req: Request, res: Response) => {
    const { requestid, senderid, receiverid } = req.body
    const userid = req.headers['x-user-id']

    if (!requestid || !senderid || !receiverid) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    }

    if (receiverid !== userid) {
        res.status(400).json({ "msg": "Only the receiver can accept friend request" })
        return
    }

    if (senderid === receiverid) {
        res.status(400).json({ "msg": "You autistic or what?!?" })
        return
    }

    try {
        const addFriend: any = await friendService.acceptFriendRequest(requestid, senderid, receiverid)
        
        if (!addFriend) {
            res.status(404).json({ "msg": "Can't not find friend request" })
            return 
        }

        if (addFriend.rowCount === 0) {
            res.status(404).json({ "msg": "Can't not find other user" })
            return 
        }

        res.status(200).json({"msg": "Friend added"})
    } catch (err) {
        res.status(500).json(err)
    }
}

export const unfriend = async (req: Request, res: Response) => {
    const { user1id, user2id } = req.body
    const userid = req.headers['x-user-id']

    if (!user1id || !user2id) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    } 

    if (userid !== user1id) {
        res.status(400).json({ "msg": "Who tf are you?!?" })
        return
    }

    try {
        const res = await friendService.unfriend(user1id, user2id)
        res.status(200).json({"msg": "Unfriend"})
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getFriends = async (req: Request, res: Response) => {
    const userid: any = req.headers['x-user-id']
    
    if (!userid) {
        res.status(400).json({ "msg": "Missing fields" })
        return 
    }

    try {
        const friendList = await friendService.getFriends(userid)
        console.log(friendList)
        res.status(200).json(friendList)
    } catch (err) {
        res.status(500).json(err)
    }
}


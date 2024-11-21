import friendReqModel from "../database/schemas/friend-reqs-schema"
import { UserRepository } from "../database/repository/user-repository"

export class FriendService {
    UserRepository: any

    constructor() {
        this.UserRepository = new UserRepository()
    }

    getSenderRequests = async (userid: string) => {
        try {
            const friendRequests = await friendReqModel.find({ senderid: userid })
            return friendRequests
        } catch (err) {
            console.log(err)
            return 
        }
    }

    getReceiverRequests = async (userid: string) => {
        try {
            const friendRequests = await friendReqModel.find({ receiverid: userid })
            return friendRequests
        } catch (err) {
            console.log(err)
            return 
        }
    }

    sendFriendRequest = async (senderid: string, senderProfilePic: string, senderName: string, receiverid: string, receiverProfilePic: string, receiverName: string) => {
        const receiver = await this.UserRepository.findUserByID(receiverid)

        if (!receiver) {
            return 1
        }

        const exists = await friendReqModel.findOne({
            $or: [
                { senderid: senderid, receiverid: receiverid },
                { senderid: receiverid, receiverid: senderid },
            ],
        })

        if (exists) {
            return 2
        }

        if (receiver.userid === receiverid && receiver.username === receiverName) {
            try {
            const newFriendRequest = await friendReqModel.create({
                senderid,
                senderProfilePic,
                senderName,
                receiverid,
                receiverProfilePic,
                receiverName,
            })
            console.log(newFriendRequest)
            return newFriendRequest
            } catch(err) {
                console.log(err)
                return 
            }
        } else {
            return 3
        }
    }

    deleteFriendRequest = async (requestid: string) => {
        try {
            const deletedFriendRequest = await friendReqModel.findByIdAndDelete(requestid)
            return deletedFriendRequest
        } catch (err) {
            console.log(err)
            return
        }
    }

    acceptFriendRequest = async (requestid: string, senderid: string, receiverid: string) => {
        try {
            const deleteFriendRequest = await friendReqModel.findByIdAndDelete(requestid)
            if (!deleteFriendRequest) return null

            const addFriend = await this.UserRepository.addFriend(senderid, receiverid)
            return addFriend
        } catch(err) {
            console.log(err)
            return 
        }
    }

    unfriend = async (user1id: string, user2id: string) => {
        try {
            const res = await this.UserRepository.unfriend(user1id, user2id)
            return res
        } catch (err) {
            console.log(err)
            return
        }
    }

    getFriends = async (userid: string) => {
        try {
            const friendList = await this.UserRepository.getFriends(userid)
            return friendList
        } catch (err) {
            console.log(err)
            return 
        }
    }
}
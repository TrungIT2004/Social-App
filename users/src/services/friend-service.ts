// import friendReqModel from "../database/schemas/friend-reqs-schema"
// import { UserRepository } from "../database/repository/user-repository"

// export class FriendService {
//     static checkFriendRequest(user1id: any, user2id: any) {
//         throw new Error("Method not implemented.")
//     }
//     UserRepository: any

//     constructor() {
//         this.UserRepository = new UserRepository()
//     }

//     getSenderRequests = async (userid: string) => {
//         try {
//             const friendRequests = await friendReqModel.find({ senderid: userid })
//             return friendRequests
//         } catch (err) {
//             console.log(err)
//             return
//         }
//     }

//     getReceiverRequests = async (userid: string) => {
//         try {
//             const friendRequests = await friendReqModel.find({ receiverid: userid })
//             return friendRequests
//         } catch (err) {
//             console.log(err)
//             return
//         }
//     }

//     checkFriendRequest = async (user1id: string, user2id: string) => {
//         const exists = await friendReqModel.findOne({
//             $or: [
//                 { senderid: user1id, receiverid: user2id },
//                 { senderid: user2id, receiverid: user1id },
//             ],
//         })

//         console.log('RUN')

//         console.log(exists)
//         return exists
//     }

//     sendFriendRequest = async (senderid: string, senderProfilePic: string, senderName: string, receiverid: string, receiverProfilePic: string, receiverName: string) => {
//         const receiver = await this.UserRepository.findUserByID(receiverid)

//         if (!receiver) {
//             return 1
//         }

//         const exists = await friendReqModel.findOne({
//             $or: [
//                 { senderid: senderid, receiverid: receiverid },
//                 { senderid: receiverid, receiverid: senderid },
//             ],
//         })

//         if (exists) {
//             return 2
//         }

//         if (receiver.userid === receiverid && receiver.username === receiverName) {
//             try {
//             const newFriendRequest = await friendReqModel.create({
//                 senderid,
//                 senderProfilePic,
//                 senderName,
//                 receiverid,
//                 receiverProfilePic,
//                 receiverName,
//             })
//             console.log(newFriendRequest)
//             return newFriendRequest
//             } catch(err) {
//                 console.log(err)
//                 return
//             }
//         } else {
//             return 3
//         }
//     }

//     deleteFriendRequest = async (requestid: string) => {
//         try {
//             const deletedFriendRequest = await friendReqModel.findByIdAndDelete(requestid)
//             return deletedFriendRequest
//         } catch (err) {
//             console.log(err)
//             return
//         }
//     }

//     acceptFriendRequest = async (requestid: string, senderid: string, receiverid: string) => {
//         try {
//             const deleteFriendRequest = await friendReqModel.findByIdAndDelete(requestid)
//             if (!deleteFriendRequest) return null

//             const addFriend = await this.UserRepository.addFriend(senderid, receiverid)
//             return addFriend
//         } catch(err) {
//             console.log(err)
//             return
//         }
//     }

//     unfriend = async (user1id: string, user2id: string) => {
//         try {
//             const res = await this.UserRepository.unfriend(user1id, user2id)
//             return res
//         } catch (err) {
//             console.log(err)
//             return
//         }
//     }

//     getFriends = async (userid: string) => {
//         try {
//             const friendList = await this.UserRepository.getFriends(userid)
//             return friendList
//         } catch (err) {
//             console.log(err)
//             return
//         }
//     }
// }


import friendReqModel from "../database/schemas/friend-reqs-schema"
import { UserRepository } from "../database/repository/user-repository"
import { FriendRequest, FriendRequestRepository } from "../database/repository/friend-repository"

export class FriendService {
    UserRepository: any
    FriendRequestRepository: any

    constructor() {
        this.UserRepository = new UserRepository()
        this.FriendRequestRepository = new FriendRequestRepository()
    }

    getSentFriendRequests = async (userid: string) => {
        try {
            const friendRequests = await this.FriendRequestRepository.getSentFriendRequests(userid)
            return friendRequests
        } catch (err) {
            console.log(err)
            return 
        }
    }

    getReceivedFriendRequests = async (userid: string) => {
        try {
            const friendRequests = await this.FriendRequestRepository.getReceivedFriendRequests(userid)
            return friendRequests
        } catch (err) {
            console.log(err)
            return 
        }
    }

    checkFriendReq = async (user1id: string, user2id: string) => {
        try {
            const res = await this.FriendRequestRepository.checkFriendRequest(user1id, user2id)
            return res
        } catch (err) {
            console.log(err)
        }
    }

    sendFriendRequest = async (data: FriendRequest) => {
        try {
            const res = await this.FriendRequestRepository.createFriendReq(data)
            return res
        } catch (err) {
            console.log(err)
        }
    }

    deleteFriendRequest = async (requestid: string) => {
        try {
            const res = await this.FriendRequestRepository.deleteFriendRequest(requestid)
            return res
        } catch (err) {
            console.log(err)
            return
        }
    }

    acceptFriendRequest = async (requestid: string, senderid: string, receiverid: string) => {
        try {
            const res = await this.FriendRequestRepository.updateFriends(requestid, senderid, receiverid)
            console.log(res)
            return res
        } catch(err) {
            console.log(err)
            return 
        }
    }

    unfriend = async (user1id: string, user2id: string) => {
        try {
            const res = await this.FriendRequestRepository.unfriend(user1id, user2id)
            return res
        } catch (err) {
            console.log(err)
            return
        }
    }

    getFriends = async (userid: string) => {
        try {
            const friendList = await this.FriendRequestRepository.getFriends(userid)
            return friendList
        } catch (err) {
            console.log(err)
            return 
        }
    }
}
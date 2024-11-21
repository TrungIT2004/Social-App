import { UserService } from "../../services/user-services"
import e, { Request, Response } from 'express'
import { createToken, verifyToken } from "../../utils"
import { env } from "../../configs/config"
import { UserRepository } from "../../database/repository/user-repository"

const userService = new UserService()

export const signUp = async (req: Request, res: Response): Promise<void> => { 
    const { username, email, password, birthdate, gender } = req.body

    if (!username || !email || !password || !birthdate || !gender) {
        res.status(400).json({ "msg": "Missing fields" })
        return 
    }

    try {
        const result = await userService.createAccount(username, email, password, birthdate, gender)
        if (!result) res.status(400).json({"msg": "Account already exist!"})
        else res.status(201).json(result)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    }

    try {
        const result = await userService.login(email, password) as any
        let { refreshToken, ...rest } = result 
        if (result === 1) res.status(404).json({"msg": "Account doesn't exists"})
        if (result === 2) res.status(401).json({"msg": "Password incorrect"})
        if (typeof result === "object") {
            res.cookie('refreshToken', result.refreshToken, { secure: false, httpOnly: true, sameSite: 'lax' })
            res.status(200).json({...rest})
        }
    } catch(err) {
            res.status(500).json(err)
    }
}

export const refresh = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken
    console.log(refreshToken)

    if (!refreshToken) {
        res.status(402).json({ "msg": "Please Sign In" })
        return 
    }
   
    try {
        const payload = verifyToken(refreshToken, env.SECRET_REFRESH)

        if (!payload.email || !payload.password) {
            res.status(400).json({ "msg": "Please Sign In Again" })
            return 
        } 

        const userRepository = new UserRepository()
        const user: any = await userRepository.checkUser(payload.email)

        if (!user) {
            res.status(404).json({ "msg": "Can't find user. Please sign in again." })
            return
        }

        const newAccessToken = createToken(payload.email, payload.password, payload.userid, env.SECRET_ACCESS)
        res.status(200).json({accessToken: newAccessToken, ...user})
    } catch(err) {
        res.status(500).json(err)
    }
}

export const signOut = async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.status(401).json({ "msg": "Please Sign In" })
    }
    
    if (refreshToken) {
        try {
            res.clearCookie('refreshToken', { secure: false, httpOnly: false })
            res.status(200).json({"msg": "Sign Out"})
        } catch(err) {
            res.status(500).json(err)
        }
    }
}

export const getFriendRequests = async (req: Request, res: Response) => {
    const userid: any = req.headers['x-user-id']

    if (!userid) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    }

    try {
        const friendReqs = await userService.getFriendRequests(userid)
        res.status(200).json(friendReqs)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const sendFriendRequest = async (req: Request, res: Response) => {
    const { senderid, senderProfilePic, senderName, receiverid, receiverProfilePic, receiverName } = req.body
    const userid = req.headers['x-user-id']

    if (!senderid || !senderName || !receiverid || !receiverName) {
        res.status(400).json({ "msg": "Missing fields"}) 
        return
    }

    if (senderid !== userid) {
        res.status(400).json({ "msg": "Send the friend request yourself bruh" })
        return
    }

    if (senderid === receiverid && senderName === receiverName) {
        res.status(400).json({ "msg": "You autistic or what?!?" })  
        return
    }

    try {
        const newFriendRequest = await userService.sendFriendRequest(senderid, senderProfilePic, senderName, receiverid, receiverProfilePic, receiverName)

        if (!newFriendRequest) {
            res.status(404).json({ "msg": "Can't not find the receiver user" })
            return 
        }

        res.status(200).json(newFriendRequest)
    } catch(err) {
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
        const addFriend = await userService.acceptFriendRequest(requestid, senderid, receiverid)
        
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


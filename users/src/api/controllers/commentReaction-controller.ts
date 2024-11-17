import { CommentReactionRepository } from "../../database/repository/commentReaction-repository"
import { Request, Response } from "express"

const commentReactionService = new CommentReactionRepository()

export const react = async (req: Request, res: Response): Promise<void> => {
    const { userid, postid, commentid, reaction } = req.body

    if (!userid || !postid || !commentid || !reaction) {
        res.status(400).json({ "msg": "Missing fields" })
        return 
    }

    try {
        const query = await commentReactionService.createReaction(userid, postid, commentid, reaction)

        if (query.rowCount === 0) {
            res.status(409).json({ "msg": "User's already reacted to this comment" })
            return 
        }

        res.status(200).json({"msg": "Comment reacted"})
    } catch(err) {
        res.status(500).json(err)
    }   
}

export const changeReaction = async (req: Request, res: Response) => {
    const { commentreactionid } = req.params
    const { reaction, ownerid } = req.body
    const userid = req.headers['x-user-id']

    if (!commentreactionid || !ownerid || !reaction) {
        res.status(400).json({ "msg": "Missing fields" })
        return 
    }

    if (ownerid !== userid) {
        res.status(403).json({ "msg": "Can't update others comment's reaction" })
        return 
    }

    try {
        const query = await commentReactionService.updateReact(commentreactionid, reaction)

        if (query?.rowCount === 0) {
            res.status(404).json({ "msg": "Can't find reaction" })
            return 
        }

        res.status(200).json({"msg": "reaction updated"})
    } catch(err) {
        res.status(500).json(err)
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    const { commentreactionid } = req.params
    const { ownerid } = req.body
    const userid = req.headers['x-user-id']

     if (!commentreactionid || !ownerid) {
        res.status(400).json({ "msg": "Missing fields" })
        return 
    }

    if (ownerid !== userid) {
        res.status(403).json({ "msg": "Can't update others comment's reaction" })
        return 
    }

    try {
        const query = await commentReactionService.deleteReaction(commentreactionid)

        if (query?.rowCount === 0) {
            res.status(404).json({ "msg": "Can't find reaction" })
            return 
        }
        
        res.status(200).json('Deleted')
    } catch(err) {
        res.status(500).json(err)
    }
}
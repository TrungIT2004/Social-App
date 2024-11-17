import { PostReactionRepository } from "../../database/repository/postReaction-repository"
import { Request, Response } from 'express'


const postReaction = new PostReactionRepository()

export const react = async (req: Request, res: Response): Promise<void> => {
    const { userid, postid, reaction } = req.body

    if (!userid || !postid || !reaction) {
        res.status(400).json({ "msg": "Missing Fields" })
        return 
    }

    try {
        const query = await postReaction.createReaction(userid, postid, reaction)

        if (query.rowCount === 0) {
            res.status(409).json({ "msg": "User's already reacted to this post" })
            return 
        }
 
        res.status(201).json(query.rows[0])
    } catch(err) {
        res.status(500).json(err)
    }
}

export const changeReaction = async (req: Request, res: Response): Promise<void> => {
    const { postreactionid } = req.params
    const { reaction, ownerid } = req.body
    const userid = req.headers['x-user-id']


    if (!postreactionid || !reaction || !ownerid) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    }

    if (ownerid !== userid) {
        res.status(403).json({ "msg": "Can't delete others comments" })
        return
    }


    try {
        const updatedReaction = await postReaction.updateReaction(postreactionid, reaction)

        if (!updatedReaction) {
            res.status(404).json({ "msg": "Can't not find reaction" })
            return 
        }

        res.status(200).json(updatedReaction)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const undoReact = async (req: Request, res: Response): Promise<void> => {
    const { postreactionid } = req.params
    const { ownerid } = req.body
    const userid = req.headers['x-user-id']

    if (!postreactionid) {
        res.status(400).json({"msg": "Missing post reaction id"})
    }

     if (ownerid !== userid) {
        res.status(403).json({ "msg": "Can't delete others comments" })
        return
    }

    try {
        const query = await postReaction.deleteReaction(postreactionid)

        if (query.rowCount === 0) {
            res.status(404).json({ "msg": "Can't not find reaction" })
            return 
        }

        res.status(200).json({"msg": "Reaction deleted"})
    } catch(err) {
        res.status(500).json(err)
    }
}
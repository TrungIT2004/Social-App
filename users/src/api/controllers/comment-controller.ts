import { CommentService } from "../../services/comment-service"
import { Request, Response } from 'express'

const commentService = new CommentService()

export const comment = async (req: Request, res: Response): Promise<void> => {
    const { userid, postid, content } = req.body
    const media: any = req.files

    if (!userid || !postid || !content) {
        res.status(400).json({ "msg": "Missing fields" })
        return
    }

    try {
        await commentService.comment(userid, postid, content, media)
        res.status(200).json({"msg": "Comment uploaded"})
    } catch(err) {
        res.status(500).json(err)
    }
}

export const updateComment = async (req: Request, res: Response): Promise<void> => {
    const { commentid } = req.params
    const { ownerid, content } = req.body
    const media: any = req.file
    console.log([media])
    const userid = req.headers['x-user-id']

    if (!commentid || !ownerid || !userid) {
        res.status(400).json({"msg": "Missing fields"})
        return
    }

    if (ownerid !== userid) {
        res.status(403).json({ "msg": "Can't delete others comments" })
        return
    }

    try {
        const query = await commentService.updateComment(commentid, content, [media])

        if (query === 1) {
            res.status(400).json({"msg": "A problem occured while processing files"})
        }

        if (!query) {
            res.status(404).json({ "msg": "Can't find comment" })
            return
        }

        res.status(200).json({ "msg": "Comment updated" })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    const { commentid } = req.params
    const { ownerid } = req.body
    const userid = req.headers['x-user-id']

    if (!commentid || !ownerid || !userid) {
        res.status(400).json({"msg": "Missing fields"})
        return
    }

    if (ownerid !== userid) {
        res.status(403).json({ "msg": "Can't delete others comments" })
        return
    }

    try {
        const query = await commentService.deleteComment(commentid)

        if (query?.rowCount === 0) {
            res.status(404).json({ "msg": "Can't find comment" })
            return 
        }

        res.status(200).json({"msg": "Comment deleted"})
    } catch(err) {
        res.status(500).json(err)
    }
}
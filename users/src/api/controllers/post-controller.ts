import { Request, Response } from 'express'
import { PostService } from '../../services/post-service'
import { Post } from '../../database/repository/post-repository'

const postService = new PostService()


export const uploadPost = async (req: Request, res: Response): Promise<void> => {
    const { userid, description } = req.body
    const media = req.files 

    if (!userid || !description) {
        res.status(400).json({ "msg": "Missing fields" })
        return 
    }

    try {
        const newPost = await postService.uploadPost(userid, description, media)
        res.status(200).json(newPost)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const getPosts = async (req: Request, res: Response): Promise<void> => {
    const userid: any = req.headers['x-user-id']

    try {
        const posts = await postService.getPosts(userid)
        res.status(200).json(posts)
        return 
    } catch(err) {
        res.status(500).json(err)
    }
}

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const { postid }: any = req.params

    if (!postid) {
        res.status(400).json({ "msg": "Missing postid" })
        return 
    }
    
    try {
        const post = await postService.getPostById(postid)

        if (!post) {
            res.status(404).json({ "msg": "Can't not find post" })
            return 
        }

        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
}

export const updatePost = async (req: Request, res: Response): Promise<void> => {
    const { postid } = req.params
    const { ownerid, description } = req.body
    const media = req.files
    const userid = req.headers['x-user-id']

    if (!postid || !userid || !ownerid || !description) {
        res.status(400).json({ "msg": "Missing fields"})
        return
    }

    if (userid !== ownerid) {
        res.status(403).json({ "msg": "Can't delete other user's post" })
        return 
    }

    try {
        const query = await postService.updatePost(postid, description, media)

        if (query.rowCount === 0) {
            res.status(404).json({ "msg": "Can't find post" })
            return 
        }

        res.status(200).json({"msg": "Post updated"})
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deletePost = async (req: Request, res: Response): Promise<void> => {
    const { postid }: any = req.params
    const userid = req.body.userid
    const ownerid: any = req.headers['x-user-id']

    if (!postid || !userid || !ownerid) {
        res.status(400).json({"msg": "Missing fields"})
    }

    if (userid !== ownerid) {
        res.status(403).json({ "msg": "Can't delete other user's post" })
        return 
    }

    try {
        const deleteQuery: any = await postService.deletePost(postid, req.body.userid)
        const deletedPost: Post = deleteQuery.rows[0]

        console.log(deletedPost)

        if (!deletedPost) {
            res.status(404).json({ "msg": "Can't not find post" })
            return 
        }

        res.status(200).json({ "msg": "post deleted" })
    } catch(err) {
        res.status(500).json(err)
    }
} 
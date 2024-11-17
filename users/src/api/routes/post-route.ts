import express from 'express'
import { upload } from '../../configs/multer'
import { deletePost, getPostById, getPosts, updatePost, uploadPost } from '../controllers/post-controller'

const postRouter = express.Router()

// Routes
postRouter.get('/', getPosts)
postRouter.get('/:postid', getPostById)
postRouter.post('/', upload.array('media', 20), uploadPost)
postRouter.patch('/:postid', upload.array('media', 20), updatePost)
postRouter.delete('/:postid', deletePost)


export default postRouter
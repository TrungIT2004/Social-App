import express from 'express'
import { react, deleteReaction, changeReaction } from '../controllers/commentReaction-controller'

const commentReactionRouter = express.Router()

commentReactionRouter.post('/', react)
commentReactionRouter.patch('/:commentreactionid', changeReaction)
commentReactionRouter.delete('/:commentreactionid', deleteReaction)

export default commentReactionRouter 
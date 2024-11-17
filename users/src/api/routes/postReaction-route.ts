import express from "express"
import { changeReaction, react, undoReact } from "../controllers/postReaction-controller"

const postReactionRouter = express.Router()

postReactionRouter.post('/', react)
postReactionRouter.patch('/:postreactionid', changeReaction)
postReactionRouter.delete('/:postreactionid', undoReact)

export default postReactionRouter
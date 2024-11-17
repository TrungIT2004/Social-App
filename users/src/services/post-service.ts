import { Post, PostRepository } from "../database/repository/post-repository"
import { Media, processingMedias } from "../utils"

export class PostService {
    PostRepository: any 

    constructor() {
        this.PostRepository = new PostRepository()
    }

    getPosts = async (userid: string): Promise<Post[] | undefined> => {
        try {
            const posts = await this.PostRepository.selectPosts(userid)
            return posts
        } catch(err) {
            console.log(err)
            return 
        }
    }

    getPostById = async (postid: string): Promise<Post | undefined> => {
        try {
            const post = await this.PostRepository.selectOnePost(postid)
            console.log(post)
            return post
        } catch(err) {
            console.log(err)
            return 
        }
    }

    uploadPost = async (userid: string, description: string, media: any): Promise<Post | undefined> => {
        const processedImages = await processingMedias(media)

        try {
            const newPost = await this.PostRepository.createPost(userid, description, processedImages)
            return newPost
        } catch(err) {
            console.log(err)
            return 
        }
    }

    updatePost = async (postid: string, description: string, media: any) => {
        const processedMedias = await processingMedias(media)

        try {
            const newPost = await this.PostRepository.updatePost(postid, description, processedMedias)
            return newPost
        } catch(err) {
            console.log(err)
            return 
        } 
    }

    deletePost = async (postid: string, userid: string): Promise<undefined> => {
        try {
            const deletePostQuery = await this.PostRepository.deletePost(postid)
            return deletePostQuery
        } catch(err) {
            console.log(err)
            return 
        }   
    }
}
import pool from "../connection"
import { v4 as uuidv4 } from 'uuid'

export interface Post {
    postid: string;
    userid: string;
    description: string;
    media: string[];
    created_at: Date;
}

export class PostRepository {
    selectPosts = async (userid: string): Promise<Post[]> => {
        const text = `SELECT posts.postid, posts.userid, users.username, users.profilepic, posts.description, posts.media, posts.created_at, comments.count AS comment_count, comments.comments,
                    CASE
		                WHEN post_reactions.count IS NOT NULL THEN post_reactions.count
		                ELSE 0
	                END AS reaction_count, userhasliked
                    FROM posts 
                    JOIN users ON users.userid = posts.userid
                    LEFT JOIN (SELECT postid, COUNT(reaction) AS count, MAX(CASE WHEN userid = $1 THEN postreactionid END) as userhasliked FROM post_reactions GROUP BY postid) AS post_reactions ON posts.postid = post_reactions.postid
                    LEFT JOIN (SELECT postid, COUNT(content) AS count, 
                    JSON_AGG(
                        JSON_BUILD_OBJECT(
                            'content', comments.content,
                            'created_at', comments.created_at
                        )
                    ) AS comments 
                    FROM comments GROUP BY comments.postid) AS comments ON posts.postid = comments.postid`
        const value = [userid]
        const posts = await pool.query(text,value)
        return posts.rows
    }

    selectOnePost = async (postid: string): Promise<Post> => {
        const text = `SELECT * FROM posts WHERE postid= $1`
        const value = [postid]
        const post = await pool.query(text,value)
        return post.rows[0]
    }

    createPost = async (userid: string, description: string, media: object[]): Promise<Post> => {
        const postid = uuidv4()
        const text = `INSERT INTO posts(postid, userid, description, media) VALUES($1, $2, $3, $4) RETURNING *`
        const values = [postid, userid, description, media]
        const post = await pool.query(text, values)
        console.log(post)
        return post.rows[0]
    }

    updatePost = async (postid: string, description: string, media: object[]): Promise<any> => {
        const text = `UPDATE posts SET description=$1, media=$2 WHERE postid=$3`
        const values = [description, media, postid]

        const query = await pool.query(text, values)
        return query
    }

    deletePost = async (postid: string): Promise<any> => {
        const text = `DELETE FROM posts WHERE postid=$1 RETURNING *`
        const value = [postid]
        return await pool.query(text, value)
    }
}
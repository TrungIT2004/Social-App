import pool from "../connection"
import { v4 as uuidv4 } from 'uuid'

interface Comment {
    commentid: string;
    userid: string;
    postid: string;
    content: string;
    media: string[];
    created_at: Date;
}


export class CommentRepository {
    createComment = async (userid: string, postid: string, content: string, media: object[]): Promise<any> => {
        const commentid = uuidv4()
        const text = `INSERT INTO comments(commentid, userid, postid, content, media) VALUES($1,$2,$3,$4,$5) RETURNING *`
        const values = [commentid, userid, postid, content, media]

        const query = await pool.query(text, values)
        console.log(query)
        return query
    }

    updateComment = async (commentid: string, content: string, media: object[]): Promise<any> => {
        const text = `UPDATE comments SET content=$1, media=$2 WHERE commentid=$3 RETURNING *`
        const values = [content, media, commentid]

        const query = await pool.query(text, values)
        console.log(query)
        return query.rows[0]
    }

    deleteComment = async (commentid: string): Promise<any> => {
        const text = `DELETE FROM comments WHERE commentid=$1 RETURNING *`
        const value = [commentid]

        const query = await pool.query(text, value)
        console.log(query)
        return query
    }
}
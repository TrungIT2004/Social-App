import pool from "../connection"
import { v4 as uuidv4 } from 'uuid'

export interface FriendRequest {
    senderid: string;
    receiverid: string;
    status: 'pending' | 'accepted' | 'rejected';
    created_at?: Date;
}

export class FriendRequestRepository {
    checkFriendRequest = async (user1id: string, user2id: string) => {
        const text = `SELECT * FROM friend_requests WHERE (senderid=$1 AND receiverid=$2) OR (senderid=$2 AND receiverid=$1)`
        const values = [user1id, user2id]

        const res = await pool.query(text, values)
        return res.rows[0]
    }

    createFriendReq = async (data: FriendRequest): Promise<any> => {
        const requestid = uuidv4()
        const text = `WITH recipient_check AS (
                    SELECT userid::varchar as receiverid FROM users WHERE userid = $3::varchar
                ),

                insert_req as (INSERT INTO friend_requests(requestid, senderid, receiverid, status)
                SELECT $1::varchar, $2::varchar, receiverid, $4::varchar
                FROM recipient_check
                WHERE NOT EXISTS (SELECT 1 FROM friend_requests WHERE senderid = $2 AND receiverid = $3) RETURNING *)

                UPDATE friend_requests SET status='pending' WHERE senderid = $2 AND receiverid = $3 AND
                EXISTS(SELECT 1 FROM friend_requests WHERE senderid = $2 AND receiverid = $3 and status='rejected')
                RETURNING *;`
        
        const values = [requestid, data.senderid, data.receiverid, data.status]

        const res = await pool.query(text, values)
        return res
    }

    deleteFriendRequest = async (requestid: string) => {
        const text = `UPDATE friend_requests SET status='rejected' WHERE requestid = $1`
        const value = [requestid]

        const res = await pool.query(text, value)
        return res
    }

    getSentFriendRequests = async (userid: string) => {
        const text = `SELECT friend_requests.*, 
                            sender.username as senderName,
                            sender.profilepic as senderProfilePic,
                            receiver.username as receiverName,
                            receiver.profilepic as receiverProfilePic FROM friend_requests
                        JOIN users sender on friend_requests.senderid = sender.userid
                        JOIN users receiver on friend_requests.receiverid = receiver.userid
                        WHERE friend_requests.senderid=$1 AND friend_requests.status='pending'`
        const value = [userid]
        
        const res = await pool.query(text, value)
        return res.rows
    }

    getReceivedFriendRequests = async (userid: string) => {
        const text = `SELECT friend_requests.*, 
                            sender.username as senderName,
                            sender.profilepic as senderProfilePic,
                            receiver.username as receiverName,
                            receiver.profilepic as receiverProfilePic FROM friend_requests
                        JOIN users sender on friend_requests.senderid = sender.userid
                        JOIN users receiver on friend_requests.receiverid = receiver.userid
                        WHERE friend_requests.receiverid=$1 AND friend_requests.status='pending'`
        const value = [userid]

        const res = await pool.query(text, value)
        return res.rows
    }
    
    updateFriends = async (requestid: string, senderid: string, receiverid: string) => {
        const text = `WITH delete_request AS (
                        UPDATE friend_requests SET status='accepted' 
                        WHERE requestid=$1
                    ),
                    update_sender AS (
                        UPDATE users
                        SET friends = array_append(friends, $3)
                        WHERE userid = $2
                    )
                    UPDATE users
                    SET friends = array_append(friends, $2)
                    WHERE userid = $3`
        const values = [requestid, senderid, receiverid]
        
        const res = await pool.query(text, values)
        return res
    }

    unfriend = async (user1id: string, user2id: string) => {
        const text = ` WITH update_users AS (
                        UPDATE users
                        SET friends = array_remove(friends, $1)
                        WHERE userid = $2
                        )    
                        UPDATE users
                        SET friends = array_remove(friends, $2)
                        WHERE userid = $1`
        const values = [user1id, user2id]
        const query = await pool.query(text, values)
        console.log(query)

        return query
    }

    getFriends = async (userid: string) => {
        const text = `SELECT u.userid, u.username, u.profilepic
                    FROM users u
                    JOIN (
                        SELECT UNNEST(friends) AS friend_id
                        FROM users
                        WHERE userid =$1
                    ) f ON u.userid = f.friend_id`
        const value = [userid]
        const query = await pool.query(text, value)
        return query.rows
    }
 
}
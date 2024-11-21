import pool from "../connection"

export class UserRepository {
    checkUser = async (email: string): Promise<object | boolean> => {
        const text = `SELECT * FROM users WHERE email= $1`
        const value = [email]

        const res = await pool.query(text, value)

        if ( res.rows[0] ) return res.rows[0]
        return false
    }

    findUserByID = async (userid: string): Promise<any> => {
        const text = `SELECT * FROM users WHERE userid=$1`
        const value = [userid]

        const res = await pool.query(text, value)

        if (res.rows[0]) return res.rows[0]
        return false
    }

    createUser = async (uuid: string, username: string, email: string, password: string, birthdate: string, gender: string): Promise<object> => {
        const text = `INSERT INTO users(userid, username, email, password_hash, birthdate, gender) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
        const values = [uuid, username, email, password, birthdate, gender]

        const res = await pool.query(text, values)
        return res
    }

    addFriend = async (senderid: string, receiverid: string) => {
        const text = `WITH update_sender AS (
                        UPDATE users 
                        SET friends = array_append(friends, $1) 
                        WHERE userid = $2
                    )
                    UPDATE users 
                    SET friends = array_append(friends, $2) 
                    WHERE userid = $1`
        const values = [senderid, receiverid]

        const query = await pool.query(text, values)
        console.log(query)

        return query
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
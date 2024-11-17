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
}
import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../../utils"
import { env } from "../../configs/config"

export const authorizeToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        const payload = verifyToken(token, env.SECRET_ACCESS)

        if (payload.email && payload.password && payload.userid && payload.userid === req.headers['x-user-id']) {
            next()
        } else {
            res.status(401).json("Wrong credentials. Please login again.")
        }
    } else {
        res.status(401).json("Authorization required. Please login again")
    }
}

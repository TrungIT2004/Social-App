import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sharp from 'sharp'
import { s3Client } from '../configs/R2Config'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from '../configs/config'
import { Buffer } from 'buffer'


interface Payload {
    email: string
    password: string
    userid: string
    iat: number
}

// User's Ultilities
export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

export const checkPassword = async (inputPassword: string, accountPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(inputPassword, accountPassword.trimEnd())
    return result
}

export const createToken = (email: string, password: string, userid: string, secret: string):string => {
    const token = jwt.sign({email, password, userid}, secret)
    return token
}

export const verifyToken = (accessToken: string, secret: string):Payload => {
    const result = jwt.verify(accessToken, secret)
    return result as Payload
}

// Post's Ultilities
export interface Media {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
}

export const processingMedias = async (media: Media[]) => {
    const processedImages = await Promise.all(
        media.map(async (media: Media) => {
            const uploadParams = {
                Bucket: env.BUCKET_NAME,
                Key: media.originalname,
                Body: media.buffer,
                ContentType: media.mimetype,
            }

        try {
            if (media.mimetype.startsWith('image')) {
                const newBuffer = await sharp(media.buffer)
                    .resize({ width: 300, height: 300 })
                    .webp({ quality: 80 })
                    .toBuffer()

                uploadParams.ContentType = 'image/webp'
                uploadParams.Body = newBuffer
            }
            await s3Client.send(new PutObjectCommand(uploadParams))

            return `https://pub-f3dcaf5aed7942b3aeb248bdc4665f56.r2.dev/${media.originalname}`
        } catch (error) {
            console.error('Error processing image:', error)
            return 
        }})
    )
    console.log('processedImages: ', processedImages)
    return processedImages
}


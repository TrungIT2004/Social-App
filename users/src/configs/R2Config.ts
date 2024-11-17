import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "./config";


export const s3Client = new S3Client({
    endpoint: `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: env.ACCESS_KEY_ID!,
        secretAccessKey: env.SECRET_ACCESS_KEY!,
    },
    region: 'auto',
})
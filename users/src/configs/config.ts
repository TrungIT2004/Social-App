import * as dotenv from 'dotenv'

const status = 'dev'

if (status==='dev') {
    dotenv.config({ path: '.env.dev'})
} else {
    dotenv.config({ path: '.env.prod' })
}

interface EnvConfig {
    PORT?: number;

    PG_USER?: string;
    PG_HOST?: string;
    PG_NAME?: string;
    PG_PASSWORD?: string;
    PG_PORT?: number;
    
    MONGO_URL: string;

    SECRET_ACCESS: string;
    SECRET_REFRESH: string;

    ACCOUNT_ID?: string;
    BUCKET_NAME?: string;
    ACCESS_KEY_ID?: string;
    SECRET_ACCESS_KEY?: string;
}

export const env: EnvConfig = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,

    PG_USER: process.env.PG_USER,
    PG_HOST: process.env.PG_HOST,
    PG_NAME: process.env.PG_NAME,
    PG_PASSWORD: process.env.PG_PASSWORD,
    PG_PORT: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : undefined,

    MONGO_URL: process.env.MONGO_URL!,

    SECRET_ACCESS: process.env.SECRET_ACCESS!,
    SECRET_REFRESH: process.env.SECRET_REFRESH!,

    ACCOUNT_ID: process.env.ACCOUNT_ID,
    BUCKET_NAME: process.env.BUCKET_NAME,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
}
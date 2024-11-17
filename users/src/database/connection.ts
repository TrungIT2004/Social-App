import { Pool } from "pg"
import { env } from "../configs/config"

interface pool {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

const pool = new Pool({
    user: env.PG_USER,
    host: env.PG_HOST,
    database: env.PG_NAME,
    password: env.PG_PASSWORD,
    port: env.PG_PORT,
})

export default pool
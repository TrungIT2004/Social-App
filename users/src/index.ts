import app from "./express-app"
import pool from "./database/connection"
import connectToMongoDB from "./database/mongodb-connection"
import { env } from "./configs/config"
import router from "./api/routes/userRoutes"
import postRouter from "./api/routes/post-route"
import { authorizeToken } from "./api/middlewares"
import postReactionRouter from "./api/routes/postReaction-route"
import commentRouter from "./api/routes/comment-route"
import commentReactionRouter from "./api/routes/commentReaction-route"

const startServer = () => {
    pool.connect()
        .then( async () => {
            await connectToMongoDB()
        })
        .then( () => {
            console.log('Connected to PG')
            app.listen(env.PORT, () => {
                console.log('Server started at', env.PORT)
            })
        })
        .catch( (err) => {
            console.log(err)
        })
}

// Routes
app.use('/v1/users', router)
// app.use('/v1/comments', commentRouter)


app.use(authorizeToken)
app.use('/v1/posts', postRouter)
app.use('/v1/post-reactions/', postReactionRouter)
app.use('/v1/comments', commentRouter)
app.use('/v1/comment-reactions', commentReactionRouter)

startServer()


// import express from 'express';
// import { Pool } from 'pg';
// import https from 'https';
// import fs from 'fs';

// const app = express();

// app.get('/', (req, res) => {
//     res.json('Hello');
// });

// // const pool = new Pool({
// //     user: 'postgres',
// //     host: '14.187.109.73',
// //     database: 'Social',
// //     password: '@Minhtrung1408',
// //     port: 5432,
// // });


// app.listen(3000, () => {
//     console.log('Server Started')
// })

// // // Load SSL certificate and key
// // const options = {
// //     key: fs.readFileSync('C:/Projects/Nginx/key.pem'),
// //     cert: fs.readFileSync('C:/Projects/Nginx/cert.pem')
// // };

// // // Start the HTTPS server
// // https.createServer(options, app).listen(3000, () => {
// //     console.log('HTTPS Server started on port 3000');
// // });

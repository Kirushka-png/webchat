import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router } from './routes/routes.js'
import { db } from './model/index.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser());
app.use('/api', router)
app.use(errorMiddleware)

const start = async() => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

(async() => { await db.sequelize.sync().then(() => start()) })()
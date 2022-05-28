import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import http from 'http'
import { Server } from 'socket.io'
import { chatController } from './controllers/chat.controller.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { db } from './model/index.js'
import { router } from './routes/routes.js'
import { chatService } from './services/chat.service.js'
import { userService } from './services/user.service.js'
dotenv.config()


const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(cookieParser());
app.use('/api', router)
app.use(fileUpload)
app.use(errorMiddleware)

const server = http.createServer(app)
export const io = new Server(server, {
    cors: {
        cookie: true,
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
})


io.on('connection', client => {
    const cookies = client.request.headers.cookie
    if (cookies) {
        const { refreshToken } = cookie.parse(cookies)

        client.on('disconnect', () => {
            client.emit('message', 'Disconnect')
        })

        client.on('getChats', async() => {
            const chats = await userService.getUserChats(refreshToken);
            client.emit('chats', JSON.stringify(chats))
        })
        client.on('createChat', async(userID) => {
            await chatController.createChat(refreshToken, userID)
            const chats = await userService.getUserChats(refreshToken);
            client.emit('chats', JSON.stringify(chats))
        })
        client.on('getMessages', async(chatID) => {
            client.join(`${chatID}`)
            const messages = await chatService.getMessages(refreshToken, chatID)
            const users = await chatService.getUsersFromChat(refreshToken, chatID)
            console.log(users)
            client.emit('messages', JSON.stringify(messages))
            client.emit('usersInChat', JSON.stringify(users))
        })

        client.on('sendMessage', async(text, chatID, files) => {
            await chatService.sendMessage(refreshToken, chatID, text, files)
            const messages = await chatService.getMessages(refreshToken, chatID)
            io.to(`${chatID}`).emit('messages', JSON.stringify(messages))
        })
        client.on('deleteMessages', async(chatID) => {
            await chatService.deleteMessages(refreshToken, chatID)
            const messages = await chatService.getMessages(refreshToken, chatID)
            io.to(`${chatID}`).emit('messages', JSON.stringify(messages))
        })
        client.on('deleteMessage', async(chatID, messageID) => {
            await chatService.deleteMessage(refreshToken, chatID, messageID)
            const messages = await chatService.getMessages(refreshToken, chatID)
            io.to(`${chatID}`).emit('messages', JSON.stringify(messages))
        })

        client.on('getAllUsers', async(text) => {
            const users = await userService.getAllUsers(refreshToken, text)
            client.emit('users', JSON.stringify(users))
        })

        client.on('editMessage', async(messageID, chatID, text, file) => {
            await chatService.editMessage(refreshToken, messageID, chatID, text, file)
            const messages = await chatService.getMessages(refreshToken, chatID)
            io.to(`${chatID}`).emit('messages', JSON.stringify(messages))
        })
    }
})

const start = async() => {
    try {
        server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

(async() => { await db.sequelize.sync().then(() => start()) })()
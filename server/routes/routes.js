import EventEmitter from "events";
import { Router } from "express";
import _ from "lodash";
import multer from 'multer';
import { chatController } from "../controllers/chat.controller.js";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { tokenService } from "../services/token.service.js";
import { userService } from "../services/user.service.js";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, Date.now() + '.' + extension)
    }
})

const upload = multer({ dest: 'uploads/' })
const uploadImage = multer({ storage: storage })

class SSESession {

    res
    sessionID

    constructor(res, sessionID) {
        this.res = res
        this.sessionID = sessionID
    }
}

class SseConnection extends EventEmitter {

    SseConnections = []

    constructor() {
        super();
    }
    init(req, res, next) {
        try {
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
            let id = 0
            const userID = tokenService.validateRefreshToken(req.cookies.refreshToken).id
            const sse = _.filter(this.SseConnections, (conn) => conn.sessionID == userID);
            if (sse) {
                console.log(sse.length)
                console.log(_.filter(this.SseConnections, (conn) => conn.sessionID != userID))
                this.SseConnections = _.filter(this.SseConnections, (conn) => conn.sessionID != userID);
            }
            this.SseConnections.push(new SSESession(res, userID))
            const getChats = async(req) => {
                    const { refreshToken } = req.cookies
                    console.log(refreshToken)
                    const userID = tokenService.validateRefreshToken(req.cookies.refreshToken).id
                    const sse = _.filter(this.SseConnections, (conn) => conn.sessionID == userID);
                    sse.forEach(async(connection) => {
                        const chats = await userService.getUserChats(refreshToken);
                        const res = connection.res
                        res.write(`event: getChats\n`)
                        res.write(`id: ${++id}\n`)
                        res.write(`data: ${JSON.stringify(chats)}\n\n`)
                    });
                }
                // const getMessages = async(chatID, req) => {
                //     const { refreshToken } = req.cookies
                //     const messages = await chatService.getMessages(refreshToken, chatID);
                //     res.write(`event: getMessages\n`)
                //     res.write(`id: ${++id}\n`)
                //     res.write(`data: ${JSON.stringify(messages)}\n\n`)
                // }
                // const getUsers = async(text, req) => {
                //     const { refreshToken } = req.cookies
                //     const users = await userService.getAllUsers(refreshToken, text);
                //     res.write(`event: getAllUsers\n`)
                //     res.write(`id: ${++id}\n`)
                //     res.write(`data: ${JSON.stringify(users)}\n\n`)
                // }
            this.on('getChats', (req) => getChats(req))
                // this.on('getMessages', (id, req) => getMessages(id, req))
                // this.on('getUsers', (text, req) => getUsers(text, req))
            req.on('close', () => {
                this.removeListener('getChats', getChats)
                    //this.removeListener('getUsers', getUsers)
                    //this.removeListener('getMessages', getMessages)
            })
        } catch (error) {
            next(error)
        }
    }

    getChats(req, res) {
        this.emit('getChats', req)
        res.status(200)
    }
    getMessages(req, res) {
        const { chatID } = req.body
        this.emit('getMessages', chatID, req)
        res.status(200)
    }
    getUsers(req, res) {
        const { text } = req.body
        this.emit('getUsers', text, req)
        res.status(200)
    }


}

export const router = new Router()

const SSE = new SseConnection()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.post('/changeUsername', authMiddleware, userController.changeName)
router.post('/getImageById', authMiddleware, userController.getImageById)
router.post('/getFilesFromMessage', authMiddleware, userController.getFilesFromMessage)
router.post('/changeAvatar', authMiddleware, upload.single('image'), userController.changeAvatar)
router.post('/uploadFile', authMiddleware, uploadImage.single('file'), userController.uploadFile)
router.get('/getChats', function(req, res) { SSE.getChats(req, res) })
router.post('/createChat', authMiddleware, chatController.createChat)
router.post('/sendMessage', authMiddleware, upload.array('files', 10), chatController.sendMessage)
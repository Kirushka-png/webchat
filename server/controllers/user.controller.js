import _ from 'lodash';
import { userService } from "../services/user.service.js";

class UserController {

    async registration(req, res, next) {
        try {
            const { name, login, password } = req.body
            const userData = await userService.registration(name, login, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { login, password } = req.body
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)

        } catch (error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (error) {
            next(error)
        }
    }
    async uploadFile(req, res, next) {
        try {
            const user = await userService.uploadFile(req.headers.authorization, req.file)
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async changeName(req, res, next) {
        try {
            const { newname } = req.body
            const user = await userService.changeName(req.headers.authorization, newname)
            res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async changeAvatar(req, res, next) {
        try {
            const user = await userService.changeAvatar(req.headers.authorization, req.file)
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async getMessages(req, res, next) {
        try {
            res.setHeader("Content-Type", "text/event-stream")
            return res.json("Hello")
        } catch (error) {
            next(error)
        }
    }

    async connectSse(req, res, next) {
        try {
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
            res.flushHeaders();

            res.write('retry: 10000\n\n');
            await new Promise(resolve => setTimeout(resolve, 500));
            let prefChats = []
            while (true) {
                const { refreshToken } = req.cookies
                const chats = await userService.getUserChats(refreshToken);
                if (!_.isEqual(chats, prefChats)) {
                    prefChats = chats
                    res.write(`event: getChats\n`)
                    res.write(`data: ${JSON.stringify(chats)}\n\n`);
                }

                await new Promise(resolve => setTimeout(resolve, 5000));

            }
        } catch (error) {
            next(error)
        }
    }

    async getImageById(req, res, next) {
        try {
            const image = await userService.getImageById(req.id)
            return res.json(image)
        } catch (error) {
            next(error)

        }
    }
}

export const userController = new UserController();
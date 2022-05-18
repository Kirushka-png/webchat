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

    async getChats(req, res, next) {
        try {
            res.setHeader("Content-Type", "text/event-stream")
            const { refreshToken } = req.cookies
            const chats = await userService.getUserChats(refreshToken)

            return res.json(chats)
        } catch (error) {
            next(error)
        }
    }

}

export const userController = new UserController();
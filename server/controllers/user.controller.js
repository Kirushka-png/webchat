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
}

export const userController = new UserController();
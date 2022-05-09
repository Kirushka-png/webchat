import { userService } from "../services/user.service.js";

class UserController {
    async registration(req, res, next) {
        try {
            const { name, password } = req.body
            const userData = await userService.registration(name, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            console.log(error)
        }
    }
    async login(req, res, next) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
    async logout(req, res, next) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
    async refresh(req, res, next) {
        try {

        } catch (error) {
            console.log(error)
        }
    }
    async getUsers(req, res, next) {
        try {} catch (error) {
            console.log(error)
        }
    }
}

export const userController = new UserController();
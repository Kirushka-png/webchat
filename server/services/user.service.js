import bcrypt from 'bcrypt'
import { tokenService } from "./token.service.js"
import { UserDTO } from "../dtos/user.dto.js"
import { db } from '../model/index.js'
import { ApiError } from '../exceptions/api.error.js'

class UserService {
    async registration(name, login, password) {
        const newUser = await db.models.userModel.findOne({ where: { login: login } })
        if (newUser) {
            throw ApiError.BadRequest(`User with the same login = ${login} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await db.models.userModel.create({ name, login, password: hashPassword })

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO })

        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {...tokens, user: userDTO }
    }

    async login(login, password) {
        const user = await db.models.userModel.findOne({ where: { login: login } })
        if (!user) {
            throw ApiError.BadRequest(`User with the same login = ${login} not exists`)
        }

        const isPasswordsEquals = await bcrypt.compare(password, user.password)
        if (!isPasswordsEquals) {
            throw ApiError.BadRequest(`Incorrect password`)
        }

        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateTokens({...userDTO })

        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {...tokens, user: userDTO }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await db.models.userModel.findByPk(userData.id)
        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO })

        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {...tokens, user: userDTO }
    }

    async getAllUsers() {
        const users = await db.models.userModel.findAll()
        return users.map((user) => new UserDTO(user))
    }
}

export const userService = new UserService()
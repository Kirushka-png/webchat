import bcrypt from 'bcrypt'
import { tokenService } from "./token.service.js"
import { UserDTO } from "../dtos/user.dto.js"
import { db } from '../model/index.js'

class UserService {
    async registration(name, password) {
        console.log(name)
        const candidate = await db.models.userModel.findOne({ where: { name: name } })
        console.log(candidate)
        if (candidate) {
            throw new Error(`User with the same name = ${name} already exists`)
        }
        console.log(password)
        const hashPassword = await bcrypt.hash(password, 3)
        console.log(hashPassword)
        const user = await db.models.userModel.create({ name, password: hashPassword })

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens({...userDTO })

        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {...tokens, user: userDTO }
    }
}

export const userService = new UserService()
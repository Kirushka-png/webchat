import bcrypt from 'bcrypt'
import _ from 'lodash'
import { Op } from 'sequelize'
import { ChatDTO } from '../dtos/chat.dto.js'
import { FileDTO } from '../dtos/file.dto.js'
import { UserDTO } from "../dtos/user.dto.js"
import { ApiError } from '../exceptions/api.error.js'
import { db } from '../model/index.js'
import { tokenService } from "./token.service.js"



class UserService {

    async defaultResponse(user) {
        const userDTO = new UserDTO(user);

        const tokens = tokenService.generateTokens({...userDTO })

        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {...tokens, user: userDTO }
    }

    async registration(name, login, password) {
        const newUser = await db.models.userModel.findOne({ where: { login: login } })
        if (newUser) {
            throw ApiError.BadRequest(`User with the same login = ${login} already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await db.models.userModel.create({ name, login, password: hashPassword })
        const chat = await db.models.chatModel.create({ admin: user.id, private: true, name: `Избранное` })
        await db.models.chatUserModel.create({ chatID: chat.id, userID: user.id, messagesFrom: 0, admin: false })
        return await this.defaultResponse(user)
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

        return await this.defaultResponse(user)
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

        return await this.defaultResponse(user)
    }
    async uploadFile(accessToken, file) {
        const userData = tokenService.validateAccessToken(accessToken);
        const newfile = await db.models.fileModel.create({ originalName: file.originalname, name: file.filename, type: file.mimetype, size: file.size, path: file.path, loader: userData.id })
        const filedata = new FileDTO(newfile)

        return { file: filedata }

    }

    async changeName(accessToken, newname) {
        const userData = tokenService.validateAccessToken(accessToken);

        await db.models.userModel.update({ name: newname }, { where: { id: userData.id } })

        return await this.defaultResponse(userData)
    }

    async changeAvatar(accessToken, image) {
        const userData = tokenService.validateAccessToken(accessToken);

        await db.models.userModel.update({ image: image.filename }, { where: { id: userData.id } })

        return await this.defaultResponse(userData)
    }

    async getAllUsers(refreshToken, text) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        let users = await db.models.userModel.findAll()
        const userchats = await db.models.chatUserModel.findAll({ attributes: ['chatID'], where: { userID: userData.id } })
        if (userchats.length != 0) {
            const arrChatID = userchats.map((chat) => chat.chatID)
            const chatsUsers = await db.models.chatUserModel.findAll({
                attributes: ['userID'],
                where: {
                    chatID: {
                        [Op.or]: arrChatID
                    }
                }
            })
            const arrchatsUsers = chatsUsers.map((chat) => chat.userID)
            _.remove(users, (user) => _.includes(arrchatsUsers, user.id))
        }
        users = _.filter(users, (user) => user.login.toLocaleLowerCase().includes(text.toLocaleLowerCase()) || user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        return users.map((user) => new UserDTO(user))
    }

    async getUserChats(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        const chats = await db.models.chatUserModel.findAll({ where: { userID: userData.id } })
        let dialogs = []
        for (const chat of chats) {
            let dialog = await db.models.chatModel.findOne({ where: { id: chat.chatID } })
            if (dialog.name != 'Избранное') {
                const nameID = dialog.name.split('/').find((val) => val != userData.id)
                const firstuser = await db.models.userModel.findByPk(nameID)
                dialog.name = firstuser.name
            }
            dialogs.push(new ChatDTO(dialog))
        }
        return dialogs
    }

    async getImageById(imageID) {
        return (new FileDTO(await db.models.fileModel.findByPk(imageID)))

    }
    async getFilesFromMessage(msgID) {
        const msg = await db.models.messageModel.findByPk(msgID)
        if (msg.file && msg.file != '') {
            let files = []
            for (const name of msg.file.split('/')) {
                files.push(new FileDTO(await db.models.fileModel.findOne({ where: { name: name } })))
            }
            return files
        }
        return []
    }
}

export const userService = new UserService()
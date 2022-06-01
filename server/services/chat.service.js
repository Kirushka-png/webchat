import _ from 'lodash';
import { MessageDTO } from '../dtos/message.dto.js';
import { UserDTO } from '../dtos/user.dto.js';
import { ApiError } from '../exceptions/api.error.js';
import { db } from '../model/index.js';
import { tokenService } from "./token.service.js";


class ChatService {

    async checkUserInChat(userID, chatID) {
        const flag = await db.models.chatUserModel.findOne({ where: { userID: userID, chatID: chatID } })

        return flag ? true : false
    }

    async createNewChat(userData, userID) {
        const seconduser = await db.models.userModel.findByPk(userID)
        const chat = await db.models.chatModel.create({ admin: userData.id, private: true, name: `${userData.id}/${seconduser.id}` })
        await db.models.chatUserModel.create({ chatID: chat.id, userID: userID, messagesFrom: 0, admin: false })
        await db.models.chatUserModel.create({ chatID: chat.id, userID: userData.id, messagesFrom: 0, admin: true })

    }

    async getUsersFromChat(refreshToken, chatID) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (chatID && await this.checkUserInChat(userData.id, chatID)) {
            let usersID = await db.models.chatUserModel.findAll({ where: { chatID: chatID } })
            usersID = usersID.filter((user) => user.userID != userData.id)
            let usersFromCurrentChat = []
            for (const user of usersID) {
                const tempuser = await db.models.userModel.findByPk(user.userID)
                usersFromCurrentChat.push(new UserDTO(tempuser))
            }
            return usersFromCurrentChat
        } else {
            return ApiError.AccessDenied()
        }
    }

    async deleteMessage(refreshToken, chatID, messageID) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (chatID && await this.checkUserInChat(userData.id, chatID)) {
            let message = await db.models.messageModel.destroy({ where: { id: messageID } })
            return message
        } else {
            return ApiError.AccessDenied()
        }
    }

    async deleteMessages(refreshToken, chatID) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (chatID && await this.checkUserInChat(userData.id, chatID)) {
            let msgs = await db.models.messageModel.findAll({ where: { chatID: chatID } })
            msgs = msgs.map((msg) => new MessageDTO(msg))
            if (msgs.length != 0) {
                const messageID = msgs[msgs.length - 1].id
                const chat = await db.models.chatUserModel.update({ messagesFrom: messageID }, { where: { chatID: chatID, userID: userData.id } })
                return chat
            }
        } else {
            return ApiError.AccessDenied()
        }
    }

    async getMessages(refreshToken, chatID) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (chatID && await this.checkUserInChat(userData.id, chatID)) {
            let messages = await db.models.messageModel.findAll({ where: { chatID: chatID } })
            const msgsFrom = await db.models.chatUserModel.findOne({ where: { chatID: chatID, userID: userData.id } })
            messages = messages.map((message) => new MessageDTO(message))
            messages = _.filter(messages, (message) => msgsFrom.messagesFrom != null && message.id > msgsFrom.messagesFrom)
            return messages
        } else {
            return ApiError.AccessDenied()
        }
    }

    async sendMessage(refreshToken, chatID, text, files) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (await this.checkUserInChat(userData.id, chatID)) {
            const message = await db.models.messageModel.create({ chatID, text, file: files, author: userData.id, status: false, wasRedacted: false, wasForwarded: false })
            return new MessageDTO(message)
        } else {
            return ApiError.AccessDenied()
        }
    }

    async editMessage(refreshToken, messageID, chatID, text, files) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (await this.checkUserInChat(userData.id, chatID)) {
            const message = await db.models.messageModel.update({ text, file: files, wasRedacted: true }, { where: { id: messageID } })
            return new MessageDTO(message)
        } else {
            return ApiError.AccessDenied()
        }
    }

}

export const chatService = new ChatService()
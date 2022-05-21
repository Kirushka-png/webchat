import { MessageDTO } from '../dtos/message.dto.js';
import { ApiError } from '../exceptions/api.error.js';
import { db } from '../model/index.js';
import { tokenService } from "./token.service.js";


class ChatService {

    async checkUserInChat(userID, chatID) {
        const flag = await db.models.chatUserModel.findOne({ where: { userID: userID, chatID: chatID } })
        return flag ? true : false
    }

    async getMessages(refreshToken, chatID) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (await checkUserInChat(userData.id, chatID)) {
            const messages = await db.models.messageModel.findAll({ where: { chatID: chatID } })
            messages.map((message) => new MessageDTO(message))
            return messages
        } else {
            throw ApiError.AccessDenied()
        }
    }

    async sendMessage(refreshToken, chatID, text, files) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (await checkUserInChat(userData.userID, chatID)) {
            const message = await db.models.messageModel.create({ chatID, text, file: files, author: userData.id })
            return new MessageDTO(message)
        } else {
            throw ApiError.AccessDenied()
        }
    }
}

export const chatService = new ChatService()
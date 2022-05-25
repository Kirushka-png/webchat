import { chatService } from "../services/chat.service.js";
import { tokenService } from "../services/token.service.js";



class ChatController {
    async getMessages(req, res, next) {
        try {
            console.log(req)
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });
            res.flushHeaders();

            res.write('retry: 10000\n\n');
            let prefChats = []
            while (true) {
                const { refreshToken, chatID } = req.cookies
                const messages = await chatService.getMessages(refreshToken, chatID)
                if (!_.isEqual(chats, prefChats)) {
                    prefChats = chats
                    res.write(`data: ${JSON.stringify(chats)}\n\n`);
                }

                await new Promise(resolve => setTimeout(resolve, 5000));

            }
        } catch (error) {
            next(error)
        }
    }

    async sendMessage(req, res, next) {
        try {
            const { chatID } = req.cookies
            const { text } = req.body
            const chats = await chatService.sendMessage(req.headers.authorization, chatID, text, req.file)

            return res.json(chats)
        } catch (error) {
            next(error)
        }
    }

    async createChat(refreshToken, userID) {
        try {
            const userData = tokenService.validateRefreshToken(refreshToken);
            const chat = await chatService.createNewChat(userData, userID)
            return chat
        } catch (error) {
            console.log(error)
        }
    }


}

export const chatController = new ChatController();
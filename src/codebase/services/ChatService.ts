import { AxiosResponse } from "axios"
import api from "codebase/http/index"
import { IDialog } from 'codebase/models/IDialog'

export default class ChatService {
    static createNewChat(chatID: number): Promise<AxiosResponse<IDialog>>{
        return api.post<IDialog>('/createChat', { chatID })
    }
}
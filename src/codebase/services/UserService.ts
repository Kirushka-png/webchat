import { AxiosResponse } from "axios"
import api from "codebase/http/index"
import { IDialog } from 'codebase/models/IDialog'
import { IMessage } from 'codebase/models/IMessage'
import { IUser } from 'codebase/models/IUser'

export default class UserService {
    static getAllUsers(text: string): Promise<AxiosResponse<IUser[]>>{
        return api.post<IUser[]>('/getUsers', { text })
    }
    static getMessages(chatID: number):Promise<AxiosResponse<IMessage[]>>{
        return api.post<IMessage[]>('/getMessages', { chatID })
    }
    static getChats():Promise<AxiosResponse<IDialog[]>>{
        return api.get<IDialog[]>('/getChats')
    }
    static changeUsername(newname: string):Promise<AxiosResponse<any>>{
        return api.post<IUser>('/changeUsername', { newname })
    }
    static UploadFile(file: File):Promise<AxiosResponse<any>>{
        var formData = new FormData();
        formData.append('file', file)
        return api.post<File>('/uploadFile', formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}
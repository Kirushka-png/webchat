import api from "codebase/http/index"
import { AxiosResponse } from "axios"
import { IUser } from 'codebase/models/IUser'


export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>>{
        return api.get<IUser[]>('/users')
    }

}
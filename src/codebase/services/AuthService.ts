import api from "codebase/http/index"
import { AxiosResponse } from "axios"
import { AuthResponse } from 'codebase/models/response/AuthResponse'

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/login', {login, password})
    }

    static async registration(name: string, login: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return api.post<AuthResponse>('/registration', {name, login, password})
    }

    static async logout(): Promise<void>{
        return api.post('/logout')
    }

}
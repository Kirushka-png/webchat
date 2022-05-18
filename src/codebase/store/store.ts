import axios from "axios";
import { API_URL } from "codebase/http";
import { IUser } from "codebase/models/IUser";
import { AuthResponse } from "codebase/models/response/AuthResponse";
import AuthService from "codebase/services/AuthService";
import { makeAutoObservable } from 'mobx';

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false

    constructor(){
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }
    
    setLoading(bool: boolean){
        this.isLoading = bool
    }

    async login(login: string, password: string){
        try {
            const response = await AuthService.login(login, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    async registration(name: string, login: string, password: string){
        try {
            const response = await AuthService.registration( name, login, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
            window.location.href = '/login'
        } catch (error) {
            console.log(error)
        }
    }

    async checkAuth(){
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            return new EventSource(`${API_URL}/chats`, {withCredentials: true})
        } catch (error) {
            console.log(error)
        } finally{
            this.setLoading(false)
        }
    }

}

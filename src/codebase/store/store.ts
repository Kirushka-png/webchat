import { MAIN_IP } from "App";
import axios from "axios";
import { API_URL } from "codebase/http";
import { IFile } from "codebase/models/IFile";
import IMessage from "codebase/models/IMessage";
import { IUser } from "codebase/models/IUser";
import { AuthResponse } from "codebase/models/response/AuthResponse";
import AuthService from "codebase/services/AuthService";
import ChatService from "codebase/services/ChatService";
import UserService from "codebase/services/UserService";
import { makeAutoObservable } from 'mobx';
import { io } from "socket.io-client";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false
    editModeOn = false
    msgEdit = {} as IMessage
    msg = {} as IMessage
    currentChatID = 0
    changeNameModal = false
    files = [] as IFile[]
    filesEdit = [] as IFile[]

    io = io(`http://${MAIN_IP}:5000`, {withCredentials: true})

    constructor(){
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setChangeNameModal(bool: boolean){
        this.changeNameModal = bool
    }

    setUser(user: IUser) {
        this.user = user
    }
    
    setLoading(bool: boolean){
        this.isLoading = bool
    }

    setMsgEdit(text: string){
        this.msgEdit.text = text
    }
    setFiles(files: IFile[]){
        this.files = files
    }

    async EditMessageMode(ChatID: number, msg: IMessage){
        this.msgEdit = msg
        this.msg = msg
        let file = await UserService.getFilesFromMessage(msg.id)
        this.files = file.data
        this.filesEdit = file.data
        this.currentChatID = ChatID
        this.editModeOn = true
    }

    closeEditMode(){
        this.msgEdit = {} as IMessage
        this.msg = {} as IMessage
        this.files = []
        this.filesEdit = []
        this.editModeOn = false
    }

    async login(login: string, password: string){
        try {
            const response = await AuthService.login(login, password)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            this.io = io(`http://${MAIN_IP}:5000`, {withCredentials: true})
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
            this.io = io(`http://${MAIN_IP}:5000`, {withCredentials: true})
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
            setTimeout(() => {}, 500)
        } catch (error) {
            console.log(error)
        } finally{
            this.setLoading(false)
        }
    }
    
    async getAllUsers(text: string){
        try {
            await UserService.getAllUsers(text)
        } catch (error) {
            console.log(error)
        }
    }

    async changeUsername(newname: string){
        try {
            const response = await  UserService.changeUsername(newname)
            localStorage.setItem('token', response.data.accessToken)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    async getChats(){
        try {
            await UserService.getChats()
        } catch (error) {
            console.log(error)
        }
    }

    async getMessages(id: number){
        try {
            await UserService.getMessages(id)
        } catch (error) {
            console.log(error)
        }
    }

    async createNewChat(userID: number){
        try {
            return await ChatService.createNewChat(userID)
        } catch (error) {
            console.log(error)
        }
    }

    async UploadFile(file: File){
        try {
            const response = await UserService.UploadFile(file)
            return response.data.file
        } catch (error) {
            console.log(error)
        }
    }

    async getImageById(id: number){
        try {
            const response = await UserService.getImageById(id)
            return response.data
        } catch (error) {
            console.log(error)
            
        }
    }
}

import axios from 'axios'

export const API_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : `http://185.16.56.25:5000/api`

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    if (config.headers) config.headers.Authorization = `${localStorage.getItem('token')}`
    return config
})

export default api
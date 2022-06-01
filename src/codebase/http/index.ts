import axios from 'axios'

export const API_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : `http://46.228.109.253:5000/api`
export const UPLOADS_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/uploads' : `http://46.228.109.253:5000/uploads`

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    if (config.headers) config.headers.Authorization = `${localStorage.getItem('token')}`
    return config
})

export default api
import axios from "axios"
import { store } from "@store/index"
import { refreshThunk } from "@src/store/authSlice"
const APIHost = import.meta.env.VITE_API_HOST as string
const APIBasePath = import.meta.env.VITE_API_ROOT_PATH as string

const APIBaseURL = `${APIHost}${APIBasePath}`
const BUFFER_TIME = 10000 // time for request to complete before token expires

const instance = axios.create({
    baseURL: APIBaseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Credentials": true,
    }
})
instance.interceptors.request.use(
    /*
    * This interceptor checks if the token is expired and refreshes it if it has expired. It runs before every request.
    */
    async (config) => {
        const userInfo = store.getState().auth.userInfo
        let token: string = ""
        if (userInfo && userInfo.exp && userInfo.exp < (Date.now() - BUFFER_TIME)) {
            //refresh token
            token = store.getState().auth.userToken
        } else {
            await refreshThunk()
            token = store.getState().auth.userToken
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config

    }
)


export const axiosWOAuth = axios.create({
    baseURL: APIBaseURL,
    withCredentials: false
})
export default instance


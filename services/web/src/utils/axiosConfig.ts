import axios from "axios"

const APIHost = import.meta.env.VITE_API_HOST as string
const APIBasePath = import.meta.env.VITE_API_ROOT_PATH as string

const APIBaseURL = `${APIHost}${APIBasePath}`

const instance = axios.create({
    baseURL: APIBaseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Credentials": true,
    }
})


export const axiosWOAuth = axios.create({
    baseURL: APIBaseURL,
    withCredentials: false
})
export default instance


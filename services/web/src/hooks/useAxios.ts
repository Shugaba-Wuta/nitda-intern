import axios from "axios"
const APIBaseURL = import.meta.env.VITE_API_ROOT_URL || "http://localhost:8000/api"

export const useAxios = axios.create({ baseURL: APIBaseURL, withCredentials: true })
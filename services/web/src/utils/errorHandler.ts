import { IGenericAPIResponse } from "@src/types"
import { store } from "@store/index"
import axios, { AxiosError } from "axios"


//parse AxiosError and obtain message.
const parseAxiosError = (err: AxiosError<IGenericAPIResponse>) => {
    let message: string = ""
    if (err.message && err.message === "Network Error") {
        message = "Network Error"
    }
    if (err.response?.data?.message) {
        message = err.response?.data?.message
    }


    return message
}


const errorHandler = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
        let message = parseAxiosError(err)
        console.log(err.response?.data?.message)
        store.dispatch({ type: "errors/addNewError", payload: err.response?.data?.message || err.message })
    }

}
export default errorHandler
import { IGenericAPIResponse } from "@src/types"
import { store } from "@store/index"
import axios, { AxiosError } from "axios"
import { addNewAlert } from "@src/store/alertsSlice"

type IAlertInput = {
    message: string,
    title?: string,
    type?: "error" | "success" | "warning" | "info"
}


//parse AxiosError and obtain message.
const parseAxiosError = (err: AxiosError<IGenericAPIResponse>) => {
    let message: string = ""
    if (err.response && err.response.data.message)
        message = err.response.data.message
    else
        message = err.message
    return message
}



const alertHandler = (err: AxiosError | Error | IAlertInput) => {

    if (axios.isAxiosError(err)) {
        const message = parseAxiosError(err as AxiosError<IGenericAPIResponse>)
        store.dispatch(addNewAlert(message, "Request Failed: ", "error"))
    }
    else if (err instanceof Error) {
        store.dispatch(addNewAlert(err.message, "Request Failed: ", "error"))
    }
    else {
        err.message && store.dispatch(addNewAlert(err.message, err.title || "Request Failed: ", err.type || "info"))
    }

}
export default alertHandler
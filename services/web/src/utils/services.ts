import __axios from "./axiosConfig"
import alertHandler from "./alertHandler"
import { AxiosError } from "axios"
import { IGenericAPIResponse } from "@src/types"
import { IResetPasswordPayload } from "@src/types/auth"


interface IPaystackGetAccountNameResponse {
    status: boolean;
    message: string;
    error?: boolean;
    data?: {
        account_name: string,
        account_number: string,
        bank_id: number,
    }
}

export async function passwordRequestOTPByEmail(email: string) {
    try {
        const response = await __axios.post("auth/start-change-password", { email })
        alertHandler({ message: response.data.message, title: " ", type: "success" })
        return response.data as IGenericAPIResponse
    }
    catch (error) {
        alertHandler(error as AxiosError)
    }
}


export async function resetPasswordByOTP(payload: IResetPasswordPayload) {
    try {
        const response = await __axios.post("auth/change-password", payload)
        alertHandler({ message: response.data.message, title: " ", type: "success" })
        return response.data
    } catch (error) { alertHandler(error as AxiosError) }
}


export async function fetchAccountName(accountNumber: string, bankCode: string) {
    const response = await __axios.post<IPaystackGetAccountNameResponse>("misc/get-account-name", { accountNumber, bankCode })
    return response.data
}
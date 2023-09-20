import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDecodedUserInfo } from "@src/types/auth";
import axios from "@utils/axiosConfig"
import jwtDecode from "jwt-decode";

//Types and interfaces

interface ILoginCredentials {
    password: string,
    email: string
}


interface IInitialState {
    status: "idle" | "loading" | "loggedInSuccessful" | "loggedInFailed",
    userInfo?: IDecodedUserInfo,
    userToken: string,
    success: boolean
}

//Constants

const initialState: IInitialState = {
    status: "idle",
    userInfo: undefined,
    userToken: "",
    success: false
}



export const loginThunk = createAsyncThunk("/auth/login", async ({ password, email }: ILoginCredentials) => {

    const response = await axios.post("/auth/login", { password, email })
    const decodedToken: IDecodedUserInfo = jwtDecode(response.data.result.accessToken)
    return { accessToken: response.data.result.accessToken, decodedToken }
})

export const refreshThunk = createAsyncThunk("/auth/refresh", async () => {
    const response = await axios.post("/auth/refresh")
    const decodedToken: IDecodedUserInfo = jwtDecode(response.data.result.refreshToken)
    return { accessToken: response.data.result.accessToken, decodedToken }
})


const { reducer, } = createSlice({
    initialState,
    name: "auth",
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                if (action.payload?.accessToken) {
                    state.status = "loggedInSuccessful"
                    state.success = true
                    state.userToken = action.payload.accessToken
                    state.userInfo = action.payload.decodedToken
                }
                else {
                    state = { ...initialState, status: "loggedInFailed" }
                }
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .addCase(loginThunk.pending, (state, _action) => {
                state.status = "loading"
                state.success = false
            })
            .addCase(loginThunk.rejected, (state) => {
                state.status = "loggedInFailed"
                state.success = false
                state.userToken = ""
                state.userInfo = initialState.userInfo
            })
            //refreshThunk cases
            .addCase(refreshThunk.fulfilled, (state, action) => {
                state.status = "loggedInSuccessful"
                state.success = true
                state.userToken = action.payload.accessToken
                state.userInfo = action.payload.decodedToken
            })
            .addCase(refreshThunk.pending, (state,) => {
                state.status = "loading"
                state.success = false
                console.log("refreshing token")
            })

            .addCase(refreshThunk.rejected, (state) => {
                state.status = "loggedInFailed"
                state.success = false
                state.userToken = ""
                state.userInfo = initialState.userInfo
            })
    }



})
export default reducer
export { }
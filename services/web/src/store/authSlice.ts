import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDecodedUserInfo } from "@src/types/auth";
import { useAppDispatch } from ".";
import { addNewError } from "./errorSlice";
import axios from "@utils/axiosConfig"

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



const loginThunk = createAsyncThunk("/auth/login", async ({ password, email }: ILoginCredentials, { rejectWithValue }) => {
    try {

        const response = await axios.post("/auth/login", { password, email })
        return response.data.result as { accessToken: string }
    } catch (err) {
        rejectWithValue(err)
    }
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
                }
                else {
                    state.status = "loggedInFailed"
                }
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .addCase(loginThunk.pending, (state, _action) => {
                state.status = "loading"
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = "loggedInFailed"
                const dispatch = useAppDispatch()
                if (action.error.message)
                    dispatch(addNewError(action.error.message))
            })
    }



})
export default reducer
export { }
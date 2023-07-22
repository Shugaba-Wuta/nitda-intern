import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IError {
    id: string,
    errorMessage: string,
    createdAt?: string

}

const initialState: IError[] = []

const { reducer, actions: { addNewError } } = createSlice({
    initialState,
    name: "errors",
    reducers: {
        addNewError: {
            reducer(state, action: PayloadAction<IError>) {
                state.push(action.payload)
                state

            },
            prepare(err: string) {
                return {
                    payload: {
                        id: nanoid(),
                        errorMessage: err,
                        createdAt: (new Date()).toISOString()
                    }
                }
            }
        },
        removeError(state, action) {
            return state.filter(err => {
                return err.id !== action.payload.errorId
            })

        }

    }

})

export default reducer
export { addNewError }
export const getAllErrors = (state: RootState) => state.error
export const removeError = (state: RootState) => state.error
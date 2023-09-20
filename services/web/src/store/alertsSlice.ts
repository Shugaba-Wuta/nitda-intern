import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from ".";



export type alertType = "error" | "success" | "warning" | "info"

interface IAlertsState {
    id: string,
    alertMessage: string,
    createdAt: string,
    title: string,
    type: alertType
}


const initialState: IAlertsState[]
    = [
        // { id: "1", alertMessage: "Lorem ipsum dolor sit  quasi. Ai, nihil ea.", createdAt: '2023-08-29T13:42:00.985+01:00', title: "test", type: "error" },
        // { id: "2", alertMessage: "Second test", createdAt: '2023-08-29T19:15:30.985Z', title: "test", type: "warning" },
        // { id: "3", alertMessage: "Lorem ipsum", createdAt: '2023-09-28T20:15:30.985Z', title: "another test", type: "info" },
        // { id: "4", alertMessage: "Lorem ipsum", createdAt: '2022-08-28T19:15:30.985Z', title: "another test lorem ipsum do", type: "success" },
    ]

const { reducer, actions: { addNewAlert, removeAlert } } = createSlice({
    initialState,
    name: "alerts",
    reducers: {
        addNewAlert: {
            reducer(state, action: PayloadAction<IAlertsState>) {
                state.push(action.payload)
                state

            },
            prepare(alert: string, type: alertType, title?: string,) {
                return {
                    payload: {
                        id: nanoid(),
                        alertMessage: alert,
                        createdAt: new Date().toISOString(),
                        title: title || "",
                        type: type
                    }
                }
            }
        },
        removeAlert(state, action: PayloadAction<{ id: string }>) {
            return state.filter(alert => {
                return alert.id !== action.payload.id
            })

        }

    }

})

export default reducer
export { addNewAlert, removeAlert }
export const getAllAlerts = (state: RootState) => state.alerts
export const removeError = (state: RootState) => state.alerts
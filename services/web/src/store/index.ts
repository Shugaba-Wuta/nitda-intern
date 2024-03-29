import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"

import auth from "./authSlice"
import alerts from "./alertsSlice"

export const store = configureStore({
    reducer: {
        auth,
        alerts
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

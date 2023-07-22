import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"

import { configureStore } from "@reduxjs/toolkit"

import auth from "./authSlice"
import error from "./errorSlice"

export const store = configureStore({
    reducer: {
        auth,
        error
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
// const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppSelector2 = useSelector<TypedUseSelectorHook<RootState>>

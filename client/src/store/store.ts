import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type TStore = ReturnType<typeof store.getState>;
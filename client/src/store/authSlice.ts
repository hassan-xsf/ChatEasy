import { createSlice } from "@reduxjs/toolkit";


export interface Auth {
    authStatus: boolean,
    authData: Record<string, unknown> | null;
}

const initialState : Auth= {
    authStatus: false,
    authData: null
}

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.authStatus = true;
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authStatus = false,
                state.authData = null;
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

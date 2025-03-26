import { createSlice } from "@reduxjs/toolkit";
import { getLoginToken, getRegisterToken } from "./authThunk";

interface AuthState {
    token: null | string,
    error: null | string,
    status: 'idle' | 'error' | 'loading' | 'authenticated';
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    error: null,
    status: localStorage.getItem('token') ? 'authenticated' : 'error'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
        resetAuthState: (state) => {
            state.error = null;
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoginToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.error = null;
                state.status = 'authenticated'
            })
            .addCase(getLoginToken.pending, (state) => {
                state.error = null;
                state.status = 'loading'
            })
            .addCase(getLoginToken.rejected, (state) => {
                state.error = "Incorrect Credentials";
                state.status = 'error';
            })
            .addCase(getRegisterToken.fulfilled, (state, action) => {
                state.status = 'authenticated';
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(getRegisterToken.rejected, (state) => {
                state.error = 'Email already exists';
                state.status = 'error'
            })
    }
})

export default authSlice.reducer;
export const { logout, resetAuthState } = authSlice.actions;
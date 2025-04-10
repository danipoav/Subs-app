import { createSlice } from "@reduxjs/toolkit";
import { getLoginToken, getRegisterToken } from "./authThunk";
import { toast } from "react-toastify";

export interface User {
    id: number,
    name: string,
    email: string,
    rol: 'ADMIN' | 'USER'
}

interface AuthState {
    token: null | string,
    error: null | string,
    status: 'idle' | 'error' | 'loading' | 'authenticated';
    user: null | User,
    loading: boolean
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    error: null,
    status: localStorage.getItem('token') ? 'authenticated' : 'error',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.status = 'idle';
            state.error = null;
            state.user = null;
            state.loading = false;
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
                state.user = action.payload.user;
                state.loading = false;
                toast.success('Welcome!')
            })
            .addCase(getLoginToken.pending, (state) => {
                state.error = null;
                state.status = 'loading'
                state.loading = true;
            })
            .addCase(getLoginToken.rejected, (state) => {
                state.error = "Incorrect Credentials";
                state.status = 'error';
                state.loading = false
            })
            .addCase(getRegisterToken.fulfilled, (state, action) => {
                state.status = 'authenticated';
                state.token = action.payload.token;
                state.error = null;
                state.user = action.payload.user;
                state.loading = false
            })
            .addCase(getRegisterToken.rejected, (state) => {
                state.error = 'Email already exists';
                state.status = 'error'
                state.loading = false
            })
            .addCase(getRegisterToken.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading'
            })
    }
})

export default authSlice.reducer;
export const { logout, resetAuthState } = authSlice.actions;
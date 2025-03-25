import { createSlice } from "@reduxjs/toolkit";
import { getLoginToken } from "./authThunk";

interface AuthState {
    token: null | string,
    error: null | string,
    status: 'idle' | 'error' | 'loading' | 'authenticated';
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    error: null,
    status: 'idle'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
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
    }
})

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { getLoginToken } from "./authThunk";

interface AuthState {
    token: null | string,
    loading: boolean,
    error: null | string
}

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLoginToken.fulfilled, (state, action) => {
                state.token = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getLoginToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLoginToken.rejected, (state) => {
                state.error = "Incorrect Credentials";
            })
    }
})

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: null | string,
    loading: boolean
}

const initialState: AuthState = {
    token: null,
    loading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default authSlice.reducer;
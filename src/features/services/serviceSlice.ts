import { getAllServices } from "./serviceThunk";
import { createSlice } from "@reduxjs/toolkit";

interface Service {
    id: number,
    name: string,
    description: string,
    logo: string,
}

interface ServiceState {
    loading: boolean,
    error: null | string,
    services: Service[]
}

const initialState: ServiceState = {
    loading: false,
    error: null,
    services: []
}

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(getAllServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllServices.rejected, (state) => {
                state.error = "Error fetching services";
                state.loading = false;
            })
    }
});

export default serviceSlice.reducer;
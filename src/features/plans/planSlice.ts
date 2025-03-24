import { createSlice } from "@reduxjs/toolkit";
import { getAllPlans } from "./planThunk";
import { Service } from "../services/serviceSlice";

interface Plan {
    id: number,
    service: Service,
    name: string,
    period: string,
    price: number
}

interface PlanState {
    loading: boolean,
    error: string | null,
    plans: Plan[]
}

const initialState: PlanState = {
    loading: false,
    error: null,
    plans: []
}

const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPlans.fulfilled, (state, action) => {
                state.plans = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllPlans.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPlans.rejected, (state) => {
                state.error = "Error fetching plans";
                state.loading = false;
            })
    }
});

export default planSlice.reducer;
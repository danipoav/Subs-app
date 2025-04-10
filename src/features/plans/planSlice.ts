import { createSlice } from "@reduxjs/toolkit";
import { deletePlanById, getAllPlans, getPlanById } from "./planThunk";
import { Service } from "../services/serviceSlice";

export interface Plan {
    id: number,
    service: Service,
    name: string,
    period: string,
    price: number
}

interface PlanState {
    loading: boolean,
    error: string | null,
    plans: Plan[],
    planById: Plan | null
}

const initialState: PlanState = {
    loading: false,
    error: null,
    plans: [],
    planById: null
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
            })
            .addCase(getPlanById.fulfilled, (state, action) => {
                state.planById = action.payload;
                state.error = null;
            })
            .addCase(deletePlanById.fulfilled, (state, action) => {
                state.plans = action.payload;
            })
            .addCase(deletePlanById.rejected, (state) => {
                state.error = 'Error removing plan by ID';
            })
    }
});

export default planSlice.reducer;
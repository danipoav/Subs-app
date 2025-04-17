import { createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";
import { Plan } from "../plans/planSlice";
import { createSubscription, deleteSubById, getSubsByUserId, updateSubscription } from "./subscriptionsThunk";


export interface SubscriptionCreate {
    plan: Plan,
    user: User
    start_date: Date,
    renewal_date: Date
}

export interface Subscription {
    id: number,
    plan: Plan,
    user: User
    start_date: string,
    renewal_date: string
}

interface SubscriptioState {
    subscriptions: Subscription[]
    error: string | null;
    message: string | null;
}

const initialState: SubscriptioState = {
    subscriptions: [],
    error: null,
    message: null
}

const subscribtionsSlice = createSlice({
    name: 'subscription',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubsByUserId.fulfilled, (state, action) => {
                state.subscriptions = action.payload;
                state.error = null;
            })
            .addCase(getSubsByUserId.rejected, (state) => {
                state.error = 'Error getting all subscriptions';
            })
            .addCase(createSubscription.fulfilled, (state) => {
                state.message = "Subscription created correctly";
            })
            .addCase(createSubscription.rejected, (state) => {
                state.error = "Error creating subscription"
            })
            .addCase(deleteSubById.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(deleteSubById.rejected, (state) => {
                state.error = 'Error removing subscription by ID';
            })
            .addCase(updateSubscription.fulfilled, (state, action) => {
                const updatedSub = action.payload;
                const index = state.subscriptions.findIndex((sub) => sub.id === updatedSub.id);
                if (index !== -1) {
                    state.subscriptions[index] = updatedSub;
                }
            })
    }
});

export default subscribtionsSlice.reducer;
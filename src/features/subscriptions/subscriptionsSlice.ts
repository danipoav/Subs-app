import { createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";
import { Plan } from "../plans/planSlice";
import { createSubscription, getAllSubs } from "./subscriptionsThunk";
import { error } from "console";


export interface SubscriptionCreate {
    plan: Plan,
    user: User
    start_date: Date,
    renewal_date: Date
}

export interface Subscription extends SubscriptionCreate {
    id: number
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
            .addCase(getAllSubs.fulfilled, (state, action) => {
                state.subscriptions = action.payload;
                state.error = null;
            })
            .addCase(getAllSubs.rejected, (state) => {
                state.error = 'Error getting all subscriptions';
            })
            .addCase(createSubscription.fulfilled, (state) => {
                state.message = "Subscription created correctly";
            })
            .addCase(createSubscription.rejected, (state) => {
                state.error = "Error creating subscription"
            })
    }
});

export default subscribtionsSlice.reducer;
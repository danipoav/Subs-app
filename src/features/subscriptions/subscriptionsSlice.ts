import { createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";
import { Plan } from "../plans/planSlice";


export interface Subscription {
    id: number,
    plan: Plan,
    user: User
    start_date: Date,
    renewal_date: Date
}

interface SubscriptioState {
    subscriptions: Subscription[]
    error: string | null
}

const initialState: SubscriptioState = {
    subscriptions: [],
    error: null
}

const supscribtionsSlice = createSlice({
    name: 'subscription',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
})
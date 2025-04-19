import { createSlice } from "@reduxjs/toolkit";
import { Subscription } from "../subscriptions/subscriptionsSlice";
import { deletPaymentBySubId, getAllPayments, getPaymentBySubsId } from "./paymentThunk";

export interface Payment {
    id: number,
    amount: number,
    paymentDate: string,
    subscription: Subscription,
    state: 'Paid' | 'Pending'
}

export interface PaymentUpdate {
    payment_date: Date,
    subscription: number,
    state: 'Paid' | 'Pending'
}

interface PaymentState {
    error: string | null,
    payment: Payment[],
    loading: boolean,
    payments: Payment[]
}

const initialState: PaymentState = {
    payment: [],
    error: null,
    loading: false,
    payments: []
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentBySubsId.fulfilled, (state, action) => {
                state.payment = action.payload
                state.error = null;
                state.loading = false;
            })
            .addCase(getPaymentBySubsId.rejected, (state) => {
                state.error = 'SESSION EXPIRED';
            })
            .addCase(getAllPayments.fulfilled, (state, action) => {
                state.payments = action.payload
                state.error = null;
                state.loading = false;
            })
            .addCase(getAllPayments.rejected, (state) => {
                state.error = 'SESSION EXPIRED';
            })
            .addCase(deletPaymentBySubId.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(deletPaymentBySubId.rejected, (state) => {
                state.error = 'SESSION EXPIRED';
            })
            .addCase(getAllPayments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPaymentBySubsId.pending, (state) => {
                state.loading = true;
            })
    }
});

export default paymentSlice.reducer;
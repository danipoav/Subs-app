import { createSlice } from "@reduxjs/toolkit";
import { Subscription } from "../subscriptions/subscriptionsSlice";
import { deletPaymentBySubId, getAllPayments, getPaymentBySubsId } from "./paymentThunk";

export interface Payment {
    id: number,
    amount: number,
    paymentDate: string,
    subscribe: Subscription,
    state: 'Pagado' | 'Pendiente'
}

export interface PaymentUpdate {
    paymentDate: Date,
    subscribe: number,
    state: 'Pagado' | 'Pendiente'
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
                state.error = 'Failed getting payments by id';
            })
            .addCase(getAllPayments.fulfilled, (state, action) => {
                state.payments = action.payload
                state.error = null;
                state.loading = false;
            })
            .addCase(getAllPayments.rejected, (state) => {
                state.error = 'Failed getting all payments';
            })
            .addCase(deletPaymentBySubId.fulfilled, (state) => {
                state.error = null;
            })
            .addCase(deletPaymentBySubId.rejected, (state) => {
                state.error = 'Error removing payment by subscription ID';
            })
    }
});

export default paymentSlice.reducer;
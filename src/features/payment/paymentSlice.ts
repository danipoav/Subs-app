import { createSlice } from "@reduxjs/toolkit";
import { Subscription } from "../subscriptions/subscriptionsSlice";
import { getAllPayments, getPaymentBySubsId } from "./paymentThunk";

export interface Payment {
    id: number,
    amount: number,
    payment_date: Date,
    subscribe_id: Subscription,
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
            .addCase(getAllPayments.rejected,(state)=>{
                state.error = 'Failed getting all payments';
            })
    }
});

export default paymentSlice.reducer;
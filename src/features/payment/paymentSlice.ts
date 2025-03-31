import { createSlice } from "@reduxjs/toolkit";
import { Subscription } from "../subscriptions/subscriptionsSlice";
import { getPaymentBySubsId } from "./paymentThunk";

interface Payment {
    id: number,
    amount: number,
    payment_date: Date,
    subscribe_id: Subscription,
    state: 'Pagado' | 'Pendiente'

}

interface PaymentState {
    error: string | null,
    payments: Payment[],
    loading: boolean
}

const initialState: PaymentState = {
    payments: [],
    error: null,
    loading: false
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentBySubsId.fulfilled, (state, action) => {
                state.payments = action.payload
                state.error = null;
                state.loading = false;
            })
            .addCase(getPaymentBySubsId.rejected, (state) => {
                state.error = 'Failed getting payments';
            })
    }
});

export default paymentSlice.reducer;
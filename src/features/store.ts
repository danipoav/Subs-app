import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./auth/authSlice";
import serviceSlice from "./services/serviceSlice"
import planSlice from "./plans/planSlice";
import subscriptionsSlice from './subscriptions/subscriptionsSlice'
import paymentSlice from './payment/paymentSlice'

export const store = configureStore({
    reducer: {
        auth: authSLice,
        service: serviceSlice,
        plan: planSlice,
        subscription: subscriptionsSlice,
        payment: paymentSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
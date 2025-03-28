import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./auth/authSlice";
import serviceSlice from "./services/serviceSlice"
import planSlice from "./plans/planSlice";
import subscriptionsSlice from './subscriptions/subscriptionsSlice'

export const store = configureStore({
    reducer: {
        auth: authSLice,
        service: serviceSlice,
        plan: planSlice,
        subscription: subscriptionsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
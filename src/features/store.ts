import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./auth/authSlice";
import serviceSlice from "./services/serviceSlice"

export const store = configureStore({
    reducer: {
        auth: authSLice,
        service: serviceSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
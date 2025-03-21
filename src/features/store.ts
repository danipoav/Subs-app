import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSLice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
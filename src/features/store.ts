import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {

    }
});

// export type RootState = ReturnType<null>;
export type AppDispatch = typeof store.dispatch;
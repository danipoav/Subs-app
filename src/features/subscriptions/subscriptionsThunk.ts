import { createAsyncThunk } from "@reduxjs/toolkit";
import { Subscription } from "react-redux";
import { fetcher } from "../api/fetcher";

export const createSubscription = createAsyncThunk(
    '/subscription/create', async (request) => {
        try {
            const response = fetcher('api/subscribe', {
                method: 'POST',
                body: JSON.stringify(request)
            })
            return;
        } catch (error: any) {
            throw new Error(error.message || 'Error creating the subscription');
        }
    }
)
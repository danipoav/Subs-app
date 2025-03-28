import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";

export const getAllSubs = createAsyncThunk(
    '/subscriptions/getAll', async () => {
        try {
            const response = fetcher('api/ubscribe', {
                method: 'GET'
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error getting all subscriptions');
        }
    }
)

export const createSubscription = createAsyncThunk(
    '/subscription/create', async (request) => {
        try {
            const response = fetcher('api/subscribe', {
                method: 'POST',
                body: JSON.stringify(request)
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error creating the subscription');
        }
    }
)
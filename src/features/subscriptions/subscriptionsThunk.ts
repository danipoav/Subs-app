import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";
import { Subscription } from "./subscriptionsSlice";

export const getAllSubs = createAsyncThunk(
    '/subscriptions/getAll', async () => {
        try {
            const response = await fetcher('api/subscribe', {
                method: 'GET'
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error getting all subscriptions');
        }
    }
)

export const createSubscription = createAsyncThunk<Subscription, { planId: number, userId: number, start_date: Date, renewal_date: Date }>(
    '/subscription/create', async (request) => {
        try {
            const response = await fetcher('subscribe', {
                method: 'POST',
                body: JSON.stringify(request)
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error creating the subscription');
        }
    }
)
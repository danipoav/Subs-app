import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";
import { Subscription } from "./subscriptionsSlice";

export const getSubsByUserId = createAsyncThunk<Subscription[], number>(
    '/subscription/getByUserId', async (userId) => {
        try {
            const response = await fetcher(`subscribe/${userId}`, {
                method: 'GET'
            })
            return response
        } catch (error: any) {
            throw new Error(error.message || 'Error getting subscriptions by UserId');
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

export const deleteSubById = createAsyncThunk<string, number>(
    '/subscription/deleteById', async (id) => {
        try {
            const response = fetcher(`subscribe/${id}`, {
                method: 'DELETE'
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error creating the subscription');

        }
    }
)
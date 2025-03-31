import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";

export const createPayment = createAsyncThunk<string, { amount: number, payment_date: Date, subscribeId: number, state: string }>(
    '/payments/create', async (request) => {
        try {
            const response = await fetcher('payments', {
                method: 'POST',
                body: JSON.stringify(request)
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error creating the payment');
        }
    }
);

export const getPaymentBySubsId = createAsyncThunk(
    '/payments/getBySubId', async (subsId) => {
        try {
            const response = await fetcher(`payments/${subsId}`, {
                method: 'GET'
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error getting payments by subsId');
        }
    }
)
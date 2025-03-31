import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";

export const createPayment = createAsyncThunk<string, { amount: number, payment_date: Date, subscribeId: number, state: string }>(
    '/payments/create', (request) => {
        try {
            const response = fetcher('payments', {
                method: 'POST',
                body: JSON.stringify(request)
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error creating the payment');
        }
    }
);
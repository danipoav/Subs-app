import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";
import { Payment, PaymentUpdate } from "./paymentSlice";

export const createPayment = createAsyncThunk<string, { amount: number, payment_date: Date, subscribe_id: number, state: string }>(
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

export const getPaymentBySubsId = createAsyncThunk<Payment[], number>(
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

export const getAllPayments = createAsyncThunk<Payment[]>(
    '/payments/getAllPayments', async () => {
        try {
            const response = await fetcher('payments', {
                method: 'GET'
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error getting payments by subsId');
        }
    }
)

export const deletPaymentBySubId = createAsyncThunk<string, number>(
    '/payments/deletePaymentBySubId', async (sub_id) => {
        try {
            const response = await fetcher(`payments/${sub_id}`, {
                method: 'DELETE'
            })
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error getting payments by subsId');
        }
    }
)

export const updatePayment = createAsyncThunk<string, { id: number, request: PaymentUpdate }>(
    '/payments/update', async ({ id, request }) => {
        try {
            const response = fetcher(`payments/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "state": request.state,
                    "subscribe_id": request.subscription,
                    "payment_date": request.payment_date
                })
            });
            return response
        } catch (error: any) {
            throw new Error(error.message || 'Error getting payments by subsId');

        }
    }
)
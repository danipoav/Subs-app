import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";
import { Payment } from "./paymentSlice";

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
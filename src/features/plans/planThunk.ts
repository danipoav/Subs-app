import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcherNoToken } from "../api/fetcherNoToken";

export const getAllPlans = createAsyncThunk(
    'plans/getAllPlans', async () => {
        try {
            const response = fetcherNoToken('plans', {
                method: 'GET'
            });
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching plans');
        }

    });
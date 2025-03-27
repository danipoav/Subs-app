import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcherNoToken } from "../api/fetcherNoToken";
import { fetcher } from "../api/fetcher";
import { Plan } from "./planSlice";

export const getAllPlans = createAsyncThunk(
    'plans/getAllPlans', async () => {
        try {
            const response = fetcherNoToken('plans', {
                method: 'GET',
            });
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching plans');
        }

    });

export const getPlanById = createAsyncThunk<Plan, number>(
    'plans/getPlanById', async (planId) => {
        try {
            const response = fetcher(`plans/${planId}`, {
                method: 'GET',
            });
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching plan by Id');
        }
    }
)
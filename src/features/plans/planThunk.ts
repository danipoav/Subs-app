import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcherNoToken } from "../api/fetcherNoToken";
import { fetcher } from "../api/fetcher";
import { Plan } from "./planSlice";

export const getAllPlans = createAsyncThunk<Plan[]>(
    'plans/getAllPlans', async () => {
        try {
            const response = await fetcherNoToken('plans', {
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
            const response = await fetcher(`plans/${planId}`, {
                method: 'GET',
            });
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching plan by Id');
        }
    }
)

export const deletePlanById = createAsyncThunk<Plan[], number>(
    '/plans/deletePlanById', async (id) => {
        try {
            const response = await fetcher(`plans/${id}`, {
                method: 'DELETE'
            });
            console.log(response)
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error deleting plan by id');
        }
    }
)
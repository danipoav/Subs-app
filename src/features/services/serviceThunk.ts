import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";

export const getAllServices = createAsyncThunk(
    'services/getAll', async () => {
        try {
            const response = await fetcher('/services');
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching services');
        }
    }
)
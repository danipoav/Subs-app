import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcherNoToken } from "../api/fetcherNoToken";

export const getAllServices = createAsyncThunk(
    'services/getAll', async () => {
        try {
            const response = await fetcherNoToken('services',{
                method:"GET",
                
            });
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error fetching services');
        }
    }
)
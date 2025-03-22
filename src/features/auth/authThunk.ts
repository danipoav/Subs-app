import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";

export const getLoginToken = createAsyncThunk(
    '/login', async () => {
        try {
            const response = await fetcher('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    "username": "user@gmail.com",
                    "password": "User"
                })
            })
            if (response) {
                const token = response;
                return token;
            } else {
                throw new Error('Error getting credentials');
            }
        } catch (error: any) {
            throw new Error(error.message || 'Error authenticating');
        }
    })
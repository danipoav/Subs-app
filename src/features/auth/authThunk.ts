import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../api/fetcher";

export const getLoginToken = createAsyncThunk(
    '/auth/login', async (username, password) => {
        try {
            const response = await fetcher('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    "username": username,
                    "password": password
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
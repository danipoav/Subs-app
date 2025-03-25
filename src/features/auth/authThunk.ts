import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcherNoToken } from "../api/fetcherNoToken";

export const getLoginToken = createAsyncThunk<{ token: string }, { email: string; password: string }>(
    '/auth/login', async ({ email, password }) => {
        try {
            const response = await fetcherNoToken('auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
            localStorage.setItem('token', response.token);
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error authenticating');
        }
    });

export const getRegisterToken = createAsyncThunk<{ token: string }, { name: string, email: string, password: string }>(
    '/auth/resgister', async ({ name, email, password }) => {
        try {
            const response = await fetcherNoToken('auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password
                })
            });
            localStorage.setItem('token',response.token)
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error registering');
        }
    }
);
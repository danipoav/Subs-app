import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcherNoToken } from "../api/fetcherNoToken";
import { User } from "./authSlice";

export const getLoginToken = createAsyncThunk<{ token: string, user: User }, { email: string; password: string }>(
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
            localStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error authenticating');
        }
    });

export const getRegisterToken = createAsyncThunk<{ token: string, user: User }, { name: string, email: string, password: string }>(
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
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user));
            return response;
        } catch (error: any) {
            throw new Error(error.message || 'Error registering');
        }
    }
);
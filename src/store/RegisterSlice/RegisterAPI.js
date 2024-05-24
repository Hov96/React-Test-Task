import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const registerNewUser = createAsyncThunk(
    'register/registerUser',
    async (payload, ctx) => {
        try {
            const response = await axiosInstance.post('/addUser', payload);
            return response.data;
        } catch (error) {
            return ctx.rejectWithValue(error);
        }
    },
);

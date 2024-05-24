import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const fetchUsers = createAsyncThunk('users/getUsers', async (_, ctx) => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        return ctx.rejectWithValue(error);
    }
});

export const fetchAllergies = createAsyncThunk('users/getAllergies', async (_, ctx) => {
    try {
        const response = await axiosInstance.get('/allergies');
        return response.data;
    } catch (error) {
        return ctx.rejectWithValue(error);
    }
});

export const handleUpdateEmail = createAsyncThunk(
    'users/handleUpdateEmail',
    async (data, ctx) => {
        try {
            const response = await axiosInstance.put(
                `/updateUserEmail/${data.id}`,
                data.payload,
            );
            ctx.dispatch(
                acceptEmail({
                    id: data.id,
                    payload: {
                        email: data.payload.email,
                        verificationCode: response.data.verificationCode,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            return ctx.rejectWithValue(error);
        }
    },
);

export const acceptEmail = createAsyncThunk('users/updateEmail', async (data, ctx) => {
    try {
        const response = await axiosInstance.put(
            `/verifyAndUpdateEmail/${data.id}`,
            data.payload,
        );
        return response.data;
    } catch (error) {
        return ctx.rejectWithValue(error);
    }
});

export const handleUpdatePhone = createAsyncThunk(
    'users/handleUpdatePhone',
    async (data, ctx) => {
        try {
            const response = await axiosInstance.put(
                `/updateUserPhone/${data.id}`,
                data.payload,
            );
            ctx.dispatch(
                acceptPhone({
                    id: data.id,
                    payload: {
                        phone: data.payload.phone,
                        verificationCode: response.data.verificationCode,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            return ctx.rejectWithValue(error);
        }
    },
);

export const acceptPhone = createAsyncThunk('users/updatePhone', async (data, ctx) => {
    try {
        const response = await axiosInstance.put(
            `/verifyAndUpdatePhone/${data.id}`,
            data.payload,
        );
        return response.data;
    } catch (error) {
        return ctx.rejectWithValue(error);
    }
});

export const handleUpdateAllergies = createAsyncThunk('users/updateAllergies', async (data, ctx) => {
    try {
        const response = await axiosInstance.put(
            `/updateUserAllergies/${data.id}`,
            data.payload,
        );
        return response.data;
    } catch (error) {
        return ctx.rejectWithValue(error);
    }
});

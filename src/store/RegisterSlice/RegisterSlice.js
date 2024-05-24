import { createSlice } from '@reduxjs/toolkit';
import { registerNewUser } from './RegisterAPI';
import { showToast } from '../../Utils/showToast';

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        register: {
            data: {},
            loading: false,
            error: false,
        },
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerNewUser.pending, (state) => {
                state.register.loading = true;
            })
            .addCase(registerNewUser.fulfilled, (state, action) => {
                state.register.data = action.payload;
                state.register.loading = false;
                showToast('success', 'User added successfully')
            })
            .addCase(registerNewUser.rejected, (state) => {
                state.register.error = false;
                showToast('error', 'Something went wrong');
            });
    },
});

export const selectRegister = (state) => state.register;

export const registerReducer = registerSlice.reducer;

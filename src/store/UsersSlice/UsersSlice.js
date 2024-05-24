import { createSlice } from '@reduxjs/toolkit';
import {
    fetchUsers,
    fetchAllergies,
    handleUpdateEmail,
    acceptEmail,
    handleUpdatePhone,
    acceptPhone,
    handleUpdateAllergies,
} from './UsersAPI';
import { showToast } from '../../Utils/showToast';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: {
            list: [],
            loading: false,
            error: false,
        },
        allergies: {
            list: [],
            loading: false,
            error: false,
        },
        updateEmail: {
            data: {},
            loading: false,
            error: false,
        },
        acceptEmail: {
            data: {},
            loading: false,
            error: false,
        },
        updatePhone: {
            data: {},
            loading: false,
            error: false,
        },
        acceptPhone: {
            data: {},
            loading: false,
            error: false,
        },
        updateAllergies: {
            data: {},
            loading: false,
            error: false,
        },
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.users.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users.list = action.payload;
                state.users.loading = false;
                state.users.error = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.users.loading = false;
                state.users.error = true;
            })

            // Allergies
            .addCase(fetchAllergies.pending, (state) => {
                state.allergies.loading = true;
            })
            .addCase(fetchAllergies.fulfilled, (state, action) => {
                state.allergies.list = action.payload;
                state.allergies.loading = false;
                state.users.error = false;
            })
            .addCase(fetchAllergies.rejected, (state) => {
                state.allergies.loading = false;
                state.allergies.error = true;
            })

            // Update email
            .addCase(handleUpdateEmail.pending, (state) => {
                state.updateEmail.loading = true;
            })
            .addCase(handleUpdateEmail.fulfilled, (state, action) => {
                state.updateEmail.data = action.payload;
                state.updateEmail.loading = false;
                state.updateEmail.error = false;
            })
            .addCase(handleUpdateEmail.rejected, (state) => {
                state.updateEmail.loading = false;
                state.updateEmail.error = true;
            })

            // Accept email
            .addCase(acceptEmail.pending, (state) => {
                state.acceptEmail.loading = true;
            })
            .addCase(acceptEmail.fulfilled, (state, action) => {
                state.acceptEmail.data = action.payload;
                state.acceptEmail.loading = false;
                state.acceptEmail.error = false;
                showToast('success', 'Email changed successfully');
            })
            .addCase(acceptEmail.rejected, (state) => {
                state.acceptEmail.loading = false;
                state.acceptEmail.error = true;
                showToast('error', 'Something went wrong');
            })

            // Update phone
            .addCase(handleUpdatePhone.pending, (state) => {
                state.updatePhone.loading = true;
            })
            .addCase(handleUpdatePhone.fulfilled, (state, action) => {
                state.updatePhone.data = action.payload;
                state.updatePhone.loading = false;
                state.updatePhone.error = false;
            })
            .addCase(handleUpdatePhone.rejected, (state) => {
                state.updatePhone.loading = false;
                state.updatePhone.error = true;
            })

            // Accept phone
            .addCase(acceptPhone.pending, (state) => {
                state.acceptPhone.loading = true;
            })
            .addCase(acceptPhone.fulfilled, (state, action) => {
                state.acceptPhone.data = action.payload;
                state.acceptPhone.loading = false;
                state.acceptPhone.error = false;
                showToast('success', 'Phone changed successfully');
            })
            .addCase(acceptPhone.rejected, (state) => {
                state.acceptPhone.loading = false;
                state.acceptPhone.error = true;
                showToast('error', 'Something went wrong');
            })

            // Update allergies
            .addCase(handleUpdateAllergies.pending, (state) => {
                state.updateAllergies.loading = true;
            })
            .addCase(handleUpdateAllergies.fulfilled, (state, action) => {
                state.updateAllergies.data = action.payload;
                state.updateAllergies.loading = false;
                state.updateAllergies.error = false;
                showToast('success', action.payload.message);
            })
            .addCase(handleUpdateAllergies.rejected, (state) => {
                state.updateAllergies.loading = false;
                state.updateAllergies.error = true;
                showToast('error', 'Something went wrong');
            });
    },
});

export const selectUsers = (state) => state.users;

export const usersReducer = usersSlice.reducer;

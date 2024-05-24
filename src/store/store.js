import { configureStore } from '@reduxjs/toolkit';
import { registerReducer } from './RegisterSlice/RegisterSlice';
import { usersReducer } from './UsersSlice/UsersSlice';

const store = configureStore({
    reducer: {
        register: registerReducer,
        users: usersReducer,
    },
});

export default store;

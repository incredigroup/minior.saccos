import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { requestReducer } from './request.slice';
import { loanReducer } from './loan.slice';
import { roleReducer } from './role.slice';

export * from './auth.slice';
export * from './users.slice';
export * from './request.slice';
export * from './loan.slice';
export * from './role.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        loan: loanReducer,
        role: roleReducer,
        request: requestReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './useSlice';

export const store = configureStore({
  reducer: {
    user: userReducer, // use loginReducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

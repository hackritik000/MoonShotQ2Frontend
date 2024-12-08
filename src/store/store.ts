import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import dataSlice from './dataSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    data: dataSlice
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// ✅ Types for TypeScript projects
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/autSlice"
import noteReducer from "../features/notes/noteSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import savedEventsReducer from './savedEventsSlice';

export const store = configureStore({
  reducer: {
    savedEvents: savedEventsReducer,
  },
});

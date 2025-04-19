import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedEvents: [],
};

const savedEventsSlice = createSlice({
  name: 'savedEvents',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      // Check if event already exists
      const eventExists = state.savedEvents.some(
        (event) => event.id === action.payload.id
      );
      if (!eventExists) {
        state.savedEvents.push(action.payload);
      }
    },
    removeEvent: (state, action) => {
      state.savedEvents = state.savedEvents.filter(
        (event) => event.id !== action.payload.id
      );
    },
    toggleEvent: (state, action) => {  // Optional: Combined add/remove
      const index = state.savedEvents.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index >= 0) {
        // Remove if exists
        state.savedEvents.splice(index, 1);
      } else {
        // Add if not exists
        state.savedEvents.push(action.payload);
      }
    }
  },
});

export const { addEvent, removeEvent, toggleEvent } = savedEventsSlice.actions;
export default savedEventsSlice.reducer;
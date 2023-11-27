import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action) {
      state.events.push(action.payload);
    },
    editEvent(state, action) {
      const eventIndex = state.events.findIndex((event) => event.id === action.payload.id);
      if (eventIndex !== -1) {
        state.events[eventIndex] = action.payload;
      }
    },
    deleteEvent(state, action) {
      const eventIndex = state.events.findIndex((event) => event.id === action.payload);
      if (eventIndex !== -1) {
        state.events.splice(eventIndex, 1);
      }
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;

export default eventsSlice.reducer;

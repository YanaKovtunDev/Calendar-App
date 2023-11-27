import { configureStore } from '@reduxjs/toolkit';

import eventSlice from './features/eventSlice';
import { loadState } from './browser-storage';

export const store = configureStore({
  reducer: {
    events: eventSlice,
  },
  preloadedState: loadState(),
});

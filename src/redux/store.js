import { configureStore } from '@reduxjs/toolkit';
import chargerReducer from './chargerSlice';

const store = configureStore({
  reducer: {
    chargers: chargerReducer,
  },
});

export default store;
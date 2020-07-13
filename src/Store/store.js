import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './Events/eventSlice';

export default configureStore({
  reducer: {
    event: eventReducer,
  }
});

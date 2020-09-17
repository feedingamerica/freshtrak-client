import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './Events/eventSlice';
import searchAddressReducer from './Search/searchSlice';
import userReducer from './userSlice';

export default configureStore({
  reducer: {
    event: eventReducer,
    addressSearch: searchAddressReducer,
    user: userReducer
  }
});

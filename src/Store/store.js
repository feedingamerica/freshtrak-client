import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './Events/eventSlice';
import searchAddressReducer from './Search/searchSlice';
import userReducer from './userSlice';
import languageReducer from './languageSlice';

export default configureStore({
  reducer: {
    event: eventReducer,
    addressSearch: searchAddressReducer,
    user: userReducer,
    language: languageReducer
  }
});

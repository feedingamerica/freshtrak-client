import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './Events/eventSlice';
import searchAddressReducer from './Search/searchSlice';

export default configureStore({
  reducer: {
    event: eventReducer,
    addressSearch: searchAddressReducer,
  }
});

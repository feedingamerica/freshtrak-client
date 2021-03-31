import { createSlice } from '@reduxjs/toolkit';

export const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    loggedIn: false
  },
  reducers: {
    setLoggedIn(state, action) {
      const { payload } = action;
      state.loggedIn = payload;
    },
  }
});

export const { setLoggedIn } = loggedInSlice.actions;
export const selectLoggedIn = state => state.loggedIn.loggedIn;
export default loggedInSlice.reducer;
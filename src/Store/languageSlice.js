import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'en'
  },
  reducers: {
    setCurrentLanguage(state, action) {
      state.language = {language: action.payload};
    },
  }
});

export const { setCurrentLanguage } = languageSlice.actions;
export const selectLanguage = state => state.language.language;
export default languageSlice.reducer;

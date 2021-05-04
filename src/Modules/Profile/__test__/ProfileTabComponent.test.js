import React from 'react';
import { render } from '@testing-library/react';
import ProfileTabComponent from '../ProfileTabComponent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('ProfileTabComponent rendered without errors', () => {
  expect(() => {
    const store = mockStore({});
    render(
      <Provider store={store}>
      <ProfileTabComponent/>
    </Provider>
    );
  }).not.toThrowError();
});
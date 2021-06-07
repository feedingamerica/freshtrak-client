import React from 'react';
import { render } from '@testing-library/react';
import ResourceCategoriesComponent from '../ResourceCategoriesComponent';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('ResourceCategoriesComponent rendered without errors', () => {
  expect(() => {
    const store = mockStore({});
    render(
      <Provider store={store}>
      <ResourceCategoriesComponent/>
    </Provider>
    );
  }).not.toThrowError();
});
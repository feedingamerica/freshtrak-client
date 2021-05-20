import React from 'react';
import { render } from '@testing-library/react';
import SummaryTabComponent from '../SummaryTabComponent';
import ResourceCategoryComponent from '../ResourceCategoriesComponent';
import BadgesComponent from '../BadgesComponent';
import YourReservationsComponent from '../YourReservationsComponent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('SummaryTabComponent rendered without errors', () => {
  expect(() => {
    const store = mockStore({});
    render(
      <Provider store={store}>
      <SummaryTabComponent/>
    </Provider>
    );
  }).not.toThrowError();
});
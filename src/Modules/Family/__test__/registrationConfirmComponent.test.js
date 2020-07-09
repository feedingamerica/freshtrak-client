import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { preformattedEventData, mockFamily } from '../../../Testing';
import RegistrationConfirmComponent from '../RegistrationConfirmComponent';

const mockStore = configureStore([]);

test('should load without errors', () => {
  const store = mockStore({ event: { event: null } });
  expect(() => {
    render(
      <Provider store={store}>
        <RegistrationConfirmComponent user={mockFamily} />
      </Provider>
    );
  }).not.toThrowError();
});

test('show the event data and user data', () => {
  const { agencyName } = preformattedEventData;
  const { identification_code } = mockFamily;
  const store = mockStore({ event: { event: preformattedEventData } });
  const history = createMemoryHistory({ initialEntries: [''] });
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <RegistrationConfirmComponent user={mockFamily} />
      </Router>
    </Provider>
  );
  getByText(agencyName);
  getByText(identification_code);
});

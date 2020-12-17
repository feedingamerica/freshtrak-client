import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { preformattedEventData, mockFamily } from '../../../Testing';
import RegistrationConfirmComponent from '../RegistrationConfirmComponent';

const mockStore = configureStore([]);

function mockFunction() {
  const original = require.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/another-route',
      search: '',
      hash: '',
      state: null
    }),
  };
}

jest.mock('react-router-dom', () => mockFunction());

test('should load without errors', () => {
  const store = mockStore({ event: { event: {} }, user: mockFamily });
  const user_mock_data = {state:{user: mockFamily}}
  const history = createMemoryHistory({ initialEntries: [''] });
  expect(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <RegistrationConfirmComponent location={user_mock_data} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});

test('show the event data and user data', () => {
  const { agencyName } = preformattedEventData;
  const user_mock_data = {state:{user: mockFamily}}
  const { identification_code } = mockFamily;
  const store = mockStore({ event: { event: preformattedEventData }, user: mockFamily });
  const history = createMemoryHistory({ initialEntries: [''] });
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <RegistrationConfirmComponent location={user_mock_data} />
      </Router>
    </Provider>
  );
  // getByText(agencyName);
  getByText(identification_code);
});

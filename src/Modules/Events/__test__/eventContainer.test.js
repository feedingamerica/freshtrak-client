import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, wait } from '@testing-library/react';
import EventContainer from '../EventContainer';
import axios from 'axios';
import { mockFoodBank, renderWithRouter } from '../../../Testing';

jest.mock('axios');

const mockStore = configureStore([]);
const store = mockStore({});

// Mocking Google API library without which it shows error.

jest.mock('react-places-autocomplete', () => {
  const React = require('react'); // eslint-disable-line
  class PlacesAutocomplete extends React.Component {
    renderProps = {
      getInputProps: jest.fn(({ placeholder, className }) => ({
        placeholder,
        className,
      })),
      suggestions: [],
      getSuggestionItemProps: jest.fn(),
    };

    render() {
      return <>{this.props.children(this.renderProps)}</>;
    }
  }

  return PlacesAutocomplete;
});

jest.mock('../EventListContainer', () => () => <mock-event-list-container />);

const route = '/events/list/43065';
const path = '/events/list/:zipCode';
const location = {
  state: {
    zipCode: mockFoodBank.zipCode,
  },
};

// Suppress the moment warning. This is a consequence of using test-data-bot
// and does not show in reality
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});

test('should load without errors', () => {
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <EventContainer location={{ state: '' }} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});

test('Successful api call', async () => {
  const successResponse = {
    data: {
      foodbanks: [mockFoodBank],
    },
    status: 200,
    statusText: 'OK',
  };
  axios.get.mockImplementation(() => Promise.resolve(successResponse));

  const { getByText } = renderWithRouter(
    <EventContainer location={location} />,
    { route, path }
  );

  await wait(() => {
    getByText(mockFoodBank.name);
  });
});

test('Failed api call', async () => {
  const failedResponse = {
    status: 500,
    statusText: 'ERROR',
  };
  axios.get.mockImplementation(() => Promise.reject(failedResponse));
  const { getByText } = renderWithRouter(
    <EventContainer location={location} />,
    { route, path }
  );
  await wait(() => {
    getByText(/something went wrong/i);
  });
});

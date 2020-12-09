import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
import App from './App';

it('renders without crashing', () => {
  expect(() => {
    const store = mockStore({ addressSearch: { zipCode: '' } });
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});

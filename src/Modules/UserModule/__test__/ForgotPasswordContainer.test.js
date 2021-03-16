import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import ForgotPasswordContainer from "../ForgotPassword/ForgotPasswordContainer";

const mockStore = configureStore([]);
const store = mockStore({});

test('should load without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <ForgotPasswordContainer />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});





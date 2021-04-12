import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import GuestSignInComponent from '../GuestSignInComponent';
import {noop, mockUserBuilder} from '../../../Testing';

const mockStore = configureStore([]);
const store = mockStore({});

test('GuestSignInComponent should render without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <GuestSignInComponent customError={noop} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});


test ("Should show the erros on no user" ,async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
      <Router>
        <GuestSignInComponent customError={noop}/>
      </Router>
     </Provider>);
  let mockUser = mockUserBuilder();
  
  fireEvent.click(getByTestId('continue-as-guest')); 

  await wait(async () => {
    fireEvent.click(getByTestId(/continue-as-guest/i));
  });
  
});
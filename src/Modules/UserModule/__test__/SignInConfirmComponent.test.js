import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import SignInConfirmComponent from "./../SignInConfirmComponent";
import {noop, mockUserBuilder} from '../../../Testing';

const mockStore = configureStore([]);
const store = mockStore({});

test('should rendor without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <SignInConfirmComponent customError={noop} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});


test ("Should show the validation erros on signin confirm form" ,async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
      <Router>
        <SignInConfirmComponent customError={noop}/>
      </Router>
     </Provider>);

  const code = container.querySelector('input[name="code"]');
  let mockUser = mockUserBuilder();
  
  fireEvent.click(getByTestId('signin-confirm')); 
  await wait(() => {
    expect(getByTestId('signin-confirm-form')).toHaveTextContent('This field is required');
  });   
  
});
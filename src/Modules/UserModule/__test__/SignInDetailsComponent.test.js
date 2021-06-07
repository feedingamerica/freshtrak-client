import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import SignInDetailsComponent from './../SignInDetailsComponent';
import {noop, mockUserBuilder} from '../../../Testing';

const mockStore = configureStore([]);
const store = mockStore({});

test('should rendor without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <SignInDetailsComponent customError={noop} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});


test ("Should show the validation erros on signin form" ,async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
      <Router>
        <SignInDetailsComponent customError={noop}/>
      </Router>
     </Provider>);
  const username = container.querySelector('input[name="username"]');
  const password = container.querySelector('input[name="password"]');

  let mockUser = mockUserBuilder();
  
  fireEvent.click(getByTestId('signin')); 
  await wait(() =>{
    expect(getByTestId('user-signin')).toHaveTextContent('This field is required');
  }); 
  
  fireEvent.blur(username, {target: {value: mockUser.password}}); 
  await wait(() =>{
    expect(getByTestId('user-signin')).toHaveTextContent('Enter a valid e-mail address');
  });
});

test ("Should check the forgotpassword click " ,async () => {
  const store = mockStore({ event: {event:{}} });  
  const handleClick = jest.fn()
  const {container,getByText,getByTestId } = render(<Provider store={store}>
      <Router>
        <SignInDetailsComponent customError={noop} onForgotPassword={handleClick}/>
      </Router>
     </Provider>);
  
  fireEvent.click(getByTestId('forgot-password')); 
  await wait(() =>{
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});



import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import UserBlockContainer from './../UserBlockContainer';
import { mockUserBuilder,mockForgotPassword} from '../../../Testing';

const mockStore = configureStore([]);
const store = mockStore({});

test('should load without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <UserBlockContainer />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});

test('should render signup form when click on signup tab', async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
        <Router>
          <UserBlockContainer />
        </Router>
      </Provider>);
  await act(async () => {
    	fireEvent.click(getByTestId('signup-form'));
  	});
  	expect(getByText(/Phone Number/i));
});

test('should render sign in form when click on sign in tab', async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
        <Router>
          <UserBlockContainer />
        </Router>
      </Provider>);
  await act(async () => {
    	fireEvent.click(getByTestId('signin-form'));
  	});
  	expect(getByText(/Welcome Back !/i));
});

test('should render forgot password form when click on forgot password link', async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
        <Router>
          <UserBlockContainer />
        </Router>
      </Provider>);
  await act(async () => {
      fireEvent.click(getByTestId('forgot-password'));
    });
    expect(getByText(/Forgot password !/i));
});


test('Signup Api test',async ()=> {
  let signupResponse = mockForgotPassword();
  let destination = signupResponse.CodeDeliveryDetails.Destination; 
  const signUpFunction = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(signupResponse)
    })
  })
  await signUpFunction().then(data => {
    expect(signupResponse.CodeDeliveryDetails.Destination).toEqual('')
  })
})

/*
code: "UsernameExistsException"
message: "User already exists"
name: "UsernameExistsException"
*/
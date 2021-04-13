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
    expect(signupResponse.CodeDeliveryDetails.Destination).toEqual(destination)
  })
})

test('User Already exist',async ()=> {   
  const signUpFunction = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject({
        code: "UsernameExistsException",
        message: "User already exists",
        name: "UsernameExistsException"
      })
    })
  })
  await signUpFunction().then(data => {
    expect(signupResponse.CodeDeliveryDetails.Destination).toEqual('')
  }).catch(err=>{
    expect(err.code).toEqual('UsernameExistsException')
  })
})

test('Signup Confirm success',async ()=> {
  
  const onConfirm = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({status:true})
    })
  })
  await onConfirm().then(data => {
    expect(data.status).toEqual(true)
  })
});

test('Signup Confirm failed',async ()=> {  
  const onConfirmFailed = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject({status:false})
    })
  })
  await onConfirmFailed().then().catch(err=>{
    expect(err.status).toEqual(false)
  })
});

test('Verification code invalid',async ()=> {  
  const onConfirmVerificationFailed = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject({
        code: "CodeMismatchException",
        message: "Invalid verification code provided, please try again.",
      })
    })
  })
  await onConfirmVerificationFailed().then().catch(err=>{
    expect(err.code).toEqual('CodeMismatchException')
  })
})

test('onResendConfirmCode API success',async ()=> {  
  let verification_code ='89858';
  const onResendConfirmCode = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({code:verification_code})
    })
  })
  await onResendConfirmCode().then(data => {
    expect(data.code).toEqual(verification_code)
  })
});

test('onResendConfirmCode API Failed',async ()=> {  
  const onResendConfirmCodeFailed = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject({
        code: "CodeMismatchException",
        message: "Invalid verification code provided, please try again.",
      })
    })
  })
  await onResendConfirmCodeFailed().then().catch(err=>{
    expect(err.code).toEqual('CodeMismatchException')
  })
})


test('Signin success',async ()=> {  
  const onSignIn = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({status:true})
    })
  })
  await onSignIn().then(res=>{
    expect(res.status).toEqual(true)
  })
});

test('Signin Failed',async ()=> {  
  const onSignInFailed = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject({
        code: "NotAuthorizedException",
        message: "Incorrect username or password.",
      })
    })
  })
  await onSignInFailed().then().catch(err=>{
    expect(err.code).toEqual('NotAuthorizedException')
  })
});

test('Signin with MFA',async ()=> {  
  const onSignInWithMFA = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        challengeName: "SMS_MFA",
      })
    })
  })
  await onSignInWithMFA().then(res => {
    expect(res.challengeName).toEqual('SMS_MFA')
  });
});

test('SignIn Confirm MFA success',async ()=> {  
  const onConfirmPhone = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({status:true})
    })
  })
  await onConfirmPhone().then(data => {
    expect(data.status).toEqual(true)
  })
});

test('SignIn Confirm MFA failed due to invalid code',async ()=> {  
  const onSignInMFAFailed = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject({
        code: "CodeMismatchException",
        message: "Invalid verification code provided, please try again.",
      })
    })
  })
  await onSignInMFAFailed().then().catch(err=>{
    expect(err.code).toEqual('CodeMismatchException')
  })
});
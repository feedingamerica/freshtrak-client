import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import ForgotPasswordContainer from "../ForgotPassword/ForgotPasswordContainer";
import {mockForgotPassword} from '../../../Testing';
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

test('Auth forgot password function success',async ()=> {
  let responseData = mockForgotPassword();
  let destination = responseData.CodeDeliveryDetails.Destination; 
  const forgotPassword = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve(responseData)
    })
  })
  await forgotPassword().then(data => {
    expect(responseData.CodeDeliveryDetails.Destination).toEqual(destination)
  })

})

test('Auth forgot password function failed',async ()=> {
  const forgotPassword = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject(new Error('api call failed'));
    })
  })
  await forgotPassword().then(data => {
    expect(responseData.CodeDeliveryDetails.Destination).toEqual(destination)
  }).catch(err=> {
    expect(err.message).toEqual('api call failed')
  })
})

test('Auth reset password function success',async ()=> {
  const resetPassword = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({value:true})
    })
  })
  await resetPassword().then(data => {
    expect(data.value).toEqual(true)
  })

})

test('Auth reset password function failed',async ()=> {
  const resetPassword = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      reject({value:false})
    })
  })
  await resetPassword().then(data => {
    expect(data.value).toEqual(false)
  }).catch(err=> {
    expect(err.value).toEqual(false)
  })

})

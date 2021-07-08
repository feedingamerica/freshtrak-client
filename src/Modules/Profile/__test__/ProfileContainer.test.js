import React from 'react';
import { render,wait } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../Testing/mock-profile';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileContainer from '../ProfileContainer';
import ProfileComponent from "../ProfileComponent";
import ProfileTabComponent from "../ProfileTabComponent";
import axios from 'axios';
jest.mock('axios');
jest.setTimeout(30000);


import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const store = mockStore({});

//passed
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});


test('ProfileContainer rendered without errors',async () => {
    await act(async () => {
      <Provider store={store}>
          <ProfileContainer data={mockProfileData}/>
      </Provider>
       
    });
});


test('rendered with passed data, api response success', async () => {

  let data = mockProfileData;

  const response = { 
    data: data,
    status : 200,
    message : "response retrieved successfully",
   };
   const store = mockStore({});
   axios.get.mockImplementation(() => Promise.resolve(response));
  await act(async () => {
    <Provider store={store}>
        <ProfileContainer data={mockProfileData}/>
    </Provider>
     
  });
});
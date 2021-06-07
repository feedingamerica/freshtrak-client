import React from 'react';
import { render,wait } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../Testing/mock-profile';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileContainer from '../ProfileContainer';
import ProfileComponent from "../ProfileComponent";
import ProfileTabComponent from "../ProfileTabComponent";
import TakeTheAssessmentComponent from "../../General/TakeTheAssessmentComponent";
import axios from 'axios';
jest.mock('axios');
jest.setTimeout(30000);


import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

//passed
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});


test('ProfileContainer rendered without errors', () => {
  expect(() => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <ProfileContainer data={mockProfileData}/>
        </Router>
      </Provider>
       
    );
  }).not.toThrowError();
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
   const { getByText } = render(
    <Provider store={store}>
      <Router>
        <ProfileContainer data={response.data}/>
      </Router>
    </Provider>
    
  );
});
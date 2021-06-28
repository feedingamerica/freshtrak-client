import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act,wait } from '@testing-library/react';
import EditInformationComponent from '../EditInformationComponent';
import axios from "axios";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const store = mockStore({});

jest.mock('axios');

test('EditInformationComponent rendered without errors', () => {
  expect(() => {
    render(
      <Provider store={store}>
      <EditInformationComponent informationData={mockProfileData}/>
      </Provider>
       
    );
  }).not.toThrowError();
});



test('Successful api call', async () => {
  const successResponse = {
    data: {
      first_name: mockProfileData && mockProfileData.first_name,
      last_name: mockProfileData && mockProfileData.last_name,
      age : null,
      dob : "09-07-1990",
      race : " ",
      ethnicity : " "
    },
    status: 200,
    statusText: 'OK',
  };
  axios.get.mockImplementation(() => Promise.resolve(successResponse));

  const { getByText } = render(
    <Provider store={store}>
      <EditInformationComponent informationData={mockProfileData}/>
      </Provider>
  );

  await wait(() => {
    getByText('First Name');
  });
});
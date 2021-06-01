import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act,wait } from '@testing-library/react';
import EditVehicleComponent from '../EditInformationComponent';
jest.mock('axios');
jest.setTimeout(30000);
import axios from "axios";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const store = mockStore({ });

test('EditVehicleComponent rendered without errors', () => {
  expect(() => {
    render(
        <Provider store={store}>
        <EditVehicleComponent vehicleData={mockProfileData}/>
        </Provider>
        
    );
  }).not.toThrowError();
});


test('Successful api call', async () => {
  let vehicleNumber = mockProfileData.vehicle_number;
  const successResponse = {
    data: vehicleNumber,
    status: 200,
    statusText: 'OK',
  };
  axios.get.mockImplementation(() => Promise.resolve(successResponse));

  const { getByText } = render(
        <Provider store={store}>
        <EditVehicleComponent vehicleData={mockProfileData}/>
        </Provider>
  );

  await wait(() => {
    getByText('Save');
  });
});
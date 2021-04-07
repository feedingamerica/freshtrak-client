import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act,wait } from '@testing-library/react';
import EditVehicleComponent from '../EditInformationComponent';
jest.mock('axios');
jest.setTimeout(30000);
import axios from "axios";

test('EditVehicleComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditVehicleComponent vehicleData={mockProfileData}/>
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
    <EditVehicleComponent vehicleData={mockProfileData}/>
  );

  await wait(() => {
    getByText('Save');
  });
});
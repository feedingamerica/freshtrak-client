import React from 'react';
import { 
  mockProfileBuilder
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act,wait } from '@testing-library/react';
import EditVehicleComponent from '../EditInformationComponent';
jest.mock('axios');
import axios from "axios";

test('EditVehicleComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditVehicleComponent vehicleData={mockProfileBuilder}/>
    );
  }).not.toThrowError();
});


test('Successful api call', async () => {
  const successResponse = {
    data: {
      vehicle_number : " "
    },
    status: 200,
    statusText: 'OK',
  };
  axios.get.mockImplementation(() => Promise.resolve(successResponse));

  const { getByText } = render(
    <EditVehicleComponent vehicleData={mockProfileBuilder}/>
  );

  await wait(() => {
    getByText('Edit Vehicle');
  });
});
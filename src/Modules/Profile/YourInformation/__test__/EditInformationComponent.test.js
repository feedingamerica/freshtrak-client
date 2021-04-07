import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act,wait } from '@testing-library/react';
import EditInformationComponent from '../EditInformationComponent';
import axios from "axios";
jest.mock('axios');

test('EditInformationComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditInformationComponent informationData={mockProfileData}/>
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
    <EditInformationComponent informationData={mockProfileData} />
  );

  await wait(() => {
    getByText('First Name');
  });
});
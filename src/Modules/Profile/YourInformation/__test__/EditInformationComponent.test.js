import React from 'react';
import { 
  mockProfileBuilder
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act,wait } from '@testing-library/react';
import EditInformationComponent from '../EditInformationComponent';
import axios from "axios";
jest.mock('axios');

test('EditInformationComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditInformationComponent informationData={mockProfileBuilder}/>
    );
  }).not.toThrowError();
});



test('Successful api call', async () => {
  const successResponse = {
    data: {
      first_name: mockProfileBuilder && mockProfileBuilder.first_name,
      last_name: mockProfileBuilder && mockProfileBuilder.last_name,
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
    <EditInformationComponent informationData={mockProfileBuilder} />
  );

  await wait(() => {
    getByText('First Name');
  });
});
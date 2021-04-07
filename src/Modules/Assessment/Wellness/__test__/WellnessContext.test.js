import React from 'react';
import WellnessContext from '../WellnessContext';
import { render, wait } from '@testing-library/react';
import axios from 'axios';
import { mockWellnessContext } from '../../../../Testing/mock-assessment';
//need to pass props
jest.mock('axios');
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});

test('rendered with passed data, api response success', async () => {
  let content = {...mockWellnessContext};
  const response = { 
    data: content,
    status : 200,
    message : "content retrieved successfully",
   };
   axios.get.mockImplementation(() => Promise.resolve(response));
  //  const { getByText } = render(
  //   <WellnessContext />
  // );
 
});
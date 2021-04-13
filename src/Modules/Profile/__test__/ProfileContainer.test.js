import React from 'react';
import { render,wait } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../Testing/mock-profile';
import ProfileContainer from '../ProfileContainer';
import ProfileComponent from "../ProfileComponent";
import ProfileTabComponent from "../ProfileTabComponent";
import TakeTheAssessmentComponent from "../../General/TakeTheAssessmentComponent";
import axios from 'axios';
jest.mock('axios');
jest.setTimeout(30000);
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
    render(
        <ProfileContainer data={mockProfileData}/>
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
   axios.get.mockImplementation(() => Promise.resolve(response));
   const { getByText } = render(
    <ProfileContainer data={response.data}/>
  );
});
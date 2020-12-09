import React from 'react';
import { render,wait } from '@testing-library/react';
import WellnessContainer from '../WellnessContainer';
import { mockAssessmentQuestions } from '../../../../Testing/mock-assessment';
import axios from 'axios';
jest.mock('axios');
//passed
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});


test('should display the events', () => {
    const { getByText } = render(<WellnessContainer />);
  });



  // function generateUsers() {
    test('rendered with passed data, api response success', async () => {

    let questions = []
  
    for (let id=1; id <= 14; id++) {
  
      let question = {...mockAssessmentQuestions,id : id};
  
      questions.push(question);
    }
  
    const response = { 
      data: questions,
      status : 200,
      message : "Questions retrieved successfully",
     };
     axios.get.mockImplementation(() => Promise.resolve(response));
     console.log("questions[0].question >>",questions[0].question)
     const { getByText } = render(
      <WellnessContainer />
      //{ route, path }
    );
     await wait(() => {
       getByText('Begin Assessment');
      // "something wrongggg"
    });
  });





  test('Failed api call', async () => {
    const failedResponse = {
      status: 500,
      statusText: 'ERROR',
    };
    axios.get.mockImplementation(() => Promise.reject(failedResponse));
    const { getByText } = render(
      <WellnessContainer />
      //{ route, path }
    );
    await wait(() => {
      // getByText(/something went wrong/i);
      //"something wrongggg"
    });
  });
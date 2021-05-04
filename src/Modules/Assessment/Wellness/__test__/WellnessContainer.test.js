import React from 'react';
import { render,wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WellnessContainer from '../WellnessContainer';
import { mockAssessmentQuestions } from '../../../../Testing/mock-assessment';
import { renderWithRouter } from '../../../../Testing';
import axios from 'axios';
jest.mock('axios');

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    id : 1,
    user : "",
    
  },
  addressSearch: {
    zipCode: 43214
  }
});
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});


test('should display the events', () => {
    const { getByText } = render(<Provider store={store}>
      <WellnessContainer />
    </Provider>);
  });



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
    const { getByText } = render (<Provider store={store}>
      <WellnessContainer />
    </Provider>);
     await wait(() => {
       getByText('Begin Assessment');
    });
  });


  test('Failed api call', async () => {
    const failedResponse = {
      status: 500,
      statusText: 'ERROR',
    };
    axios.get.mockImplementation(() => Promise.reject(failedResponse));
    const { getByText } = render(<Provider store={store}>
      <WellnessContainer />
    </Provider>);
    await wait(() => {
    });
  });
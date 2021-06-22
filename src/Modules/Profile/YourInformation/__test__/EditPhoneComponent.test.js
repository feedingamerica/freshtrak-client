import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditPhoneComponent from '../EditPhoneComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const store = mockStore({});

test('EditPhoneComponent rendered without errors', () => {
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
        <EditPhoneComponent phoneData={mockProfileData}/>
        </Router>
      </Provider>
        
    );
  }).not.toThrowError();
});
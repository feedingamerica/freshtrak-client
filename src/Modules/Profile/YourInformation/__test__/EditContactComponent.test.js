import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditContactComponent from '../EditContactComponent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const store = mockStore({ });


test('EditContactComponent rendered without errors', () => {
  expect(() => {
    render(
      <Provider store={store}>
        <EditContactComponent contactData={mockProfileData}/>
        </Provider>
        
    );
  }).not.toThrowError();
});
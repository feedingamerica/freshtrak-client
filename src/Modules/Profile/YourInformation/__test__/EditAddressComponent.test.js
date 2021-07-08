import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditAddressComponent from '../EditAddressComponent';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
const mockStore = configureStore([]);
const store = mockStore({});


test('EditAddressComponent rendered without errors', () => {
  expect(() => {
    render(
      <Provider store={store}>
         <EditAddressComponent addressData={mockProfileData}/>
      </Provider>
       
    );
  }).not.toThrowError();
});
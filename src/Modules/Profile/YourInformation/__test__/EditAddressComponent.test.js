import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditAddressComponent from '../EditAddressComponent';


test('EditAddressComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditAddressComponent addressData={mockProfileData}/>
    );
  }).not.toThrowError();
});
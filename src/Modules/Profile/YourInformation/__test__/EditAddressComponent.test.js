import React from 'react';
import { 
  mockProfileBuilder
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditAddressComponent from '../EditAddressComponent';


test('EditAddressComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditAddressComponent addressData={mockProfileBuilder}/>
    );
  }).not.toThrowError();
});
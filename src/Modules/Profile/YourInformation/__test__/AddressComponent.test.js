import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import AddressComponent from '../AddressComponent';


test('AddressComponent rendered without errors', () => {
  expect(() => {
    render(
        <AddressComponent data={mockProfileData}/>
    );
  }).not.toThrowError();
});
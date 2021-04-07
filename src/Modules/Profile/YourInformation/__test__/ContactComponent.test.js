import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import ContactComponent from '../ContactComponent';


test('ContactComponent rendered without errors', () => {
  expect(() => {
    render(
        <ContactComponent vehicleData={mockProfileData}/>
    );
  }).not.toThrowError();
});
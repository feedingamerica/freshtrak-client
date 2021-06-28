import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import PhoneComponent from '../PhoneComponent';


test('ContactComponent rendered without errors', () => {
  expect(() => {
    render(
        <PhoneComponent phoneData={mockProfileData}/>
    );
  }).not.toThrowError();
});
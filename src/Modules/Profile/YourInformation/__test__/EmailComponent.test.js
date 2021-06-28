import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import EmailComponent from '../EmailComponent';


test('EmailComponent rendered without errors', () => {
  expect(() => {
    render(
        <EmailComponent emailData={mockProfileData}/>
    );
  }).not.toThrowError();
});
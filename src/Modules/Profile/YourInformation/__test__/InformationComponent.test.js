import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import InformationComponent from '../InformationComponent';


test('InformationComponent rendered without errors', () => {
  expect(() => {
    render(
        <InformationComponent contactData={mockProfileData}/>
    );
  }).not.toThrowError();
});
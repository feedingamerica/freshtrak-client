import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../Testing/mock-profile';
import ProfileComponent from '../ProfileComponent';


test('ProfileComponent rendered without errors', () => {
  expect(() => {
    render(
        <ProfileComponent data={mockProfileData}/>
    );
  }).not.toThrowError();
});
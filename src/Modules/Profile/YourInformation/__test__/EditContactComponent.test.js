import React from 'react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditContactComponent from '../EditContactComponent';


test('EditContactComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditContactComponent contactData={mockProfileData}/>
    );
  }).not.toThrowError();
});
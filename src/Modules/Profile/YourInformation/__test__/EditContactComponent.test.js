import React from 'react';
import { 
  mockProfileBuilder
} from '../../../../Testing/mock-profile';
import { render, fireEvent, act } from '@testing-library/react';
import EditContactComponent from '../EditContactComponent';


test('EditContactComponent rendered without errors', () => {
  expect(() => {
    render(
        <EditContactComponent contactData={mockProfileBuilder}/>
    );
  }).not.toThrowError();
});
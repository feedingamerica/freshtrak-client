import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import CalendarComponent from '../CalendarComponent';


test('CalendarComponent rendered without errors', () => {
  expect(() => {
    render(
        <CalendarComponent data={mockProfileData}/>
    );
  }).not.toThrowError();
});
import React from 'react';
import { render,wait } from '@testing-library/react';
import BeginAssessComponent from '../BeginAssessComponent';

const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});


test('should display the events', async() => {
    const { getByText } = render(<BeginAssessComponent />);
  });
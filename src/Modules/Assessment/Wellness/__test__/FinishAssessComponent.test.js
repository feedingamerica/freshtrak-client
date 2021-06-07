import React from 'react';
import { render } from '@testing-library/react';
import FinishAssessComponent from '../FinishAssessComponent';

//passed
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});

test('should display the FinishAssessComponent', () => {
    const { getByText } = render(<FinishAssessComponent />);
  });
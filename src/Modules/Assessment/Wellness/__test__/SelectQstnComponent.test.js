import React from 'react';
import { render,wait } from '@testing-library/react';
import SelectQstnComponent from '../SelectQstnComponent';
import { mockSelectQstnComponent } from '../../../../Testing/mock-assessment';

//failed need to pass props
const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});

test('should display the SelectQstnComponent', async () => {
    const { getByText } = render(<SelectQstnComponent content={mockSelectQstnComponent}/>);
    await wait(() => {
      getByText('select hai');
   });
  });
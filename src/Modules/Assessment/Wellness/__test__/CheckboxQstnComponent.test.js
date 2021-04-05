import React from 'react';
import { render ,wait } from '@testing-library/react';
import CheckboxQstnComponent from '../CheckboxQstnComponent';
import { mockCheckboxComponent } from '../../../../Testing/mock-assessment';


const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});

test('should display the CheckboxQstnComponent', async () => {
    const { getByText } = render(<CheckboxQstnComponent content={mockCheckboxComponent}/>);

     await wait(() => {
       getByText('check hai');
    });
  });


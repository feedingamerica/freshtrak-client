import React from 'react';
import { render,wait } from '@testing-library/react';
import YesOrNoQstnComponent from '../YesOrNoQstnComponent';
import { mockYesOrNoQstnComponent } from '../../../../Testing/mock-assessment';

//need to pass props

const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});
console.log("YesOrNoQstnComponent in test>>",mockYesOrNoQstnComponent)

test('should display the events', async () => {
    const { getByText } = render(<YesOrNoQstnComponent content={mockYesOrNoQstnComponent}/>);
    await wait(() => {
      getByText('check for yes or no text');
   });
    
  });
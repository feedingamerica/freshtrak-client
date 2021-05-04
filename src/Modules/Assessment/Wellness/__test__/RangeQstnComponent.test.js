import React from 'react';
import { render,wait } from '@testing-library/react';
import RangeQstnComponent from '../RangeQstnComponent';
import { mockRangeQuestion } from '../../../../Testing/mock-assessment';

const originalWarn = console.warn.bind(console.warn);
beforeAll(() => {
  console.warn = msg =>
    !msg.toString().includes('Deprecation warning') && originalWarn(msg);
});
afterAll(() => {
  console.warn = originalWarn;
});

test('should display the events', async () => {
    const { getByText } = render(<RangeQstnComponent content={mockRangeQuestion}/>);
    await wait(() => {
      getByText('dummy range question');
   });
  });
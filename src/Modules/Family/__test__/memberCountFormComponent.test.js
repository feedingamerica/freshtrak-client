import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MemberCountFormComponent from '../MemberCountFormComponent';
import { preformattedEventData, noop } from '../../../Testing';

test('should render without error', () => {
  expect(() => {
    render(<MemberCountFormComponent register={noop} errors={noop} event={preformattedEventData} />)
  }).not.toThrowError();
});

test('should not allow member count to go below zero', () => {
  const { getByTestId, getByLabelText } = render(
    <MemberCountFormComponent register={noop} errors={noop} event={preformattedEventData} />
  );
  const input = getByLabelText('Number of Seniors ('+ preformattedEventData.seniorAge +'+)');
  expect(input.value).toEqual('0');
  fireEvent.click(
    getByTestId(/count_senior_dec/i)
  );
  expect(input.value).toEqual('0');
  fireEvent.click(
    getByTestId(/count_senior_inc/i)
  );
  expect(input.value).toEqual('1');
});

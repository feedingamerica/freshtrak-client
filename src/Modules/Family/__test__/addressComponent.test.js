import React from 'react';
import { render } from '@testing-library/react';
import AddressComponent from '../AddressComponent';
import { noop } from '../../../Testing';

test('should render', () => {
  expect(() => {
    render(
      <AddressComponent register={noop} errors={noop} />
    );
  }).not.toThrowError();
});

test('should show invalid form if required field is not filled out', () => {
  const { getByText } = render(
    <AddressComponent register={noop} errors={{ address_line_1: true }} />
  );
  getByText(/This field is required/i);
});

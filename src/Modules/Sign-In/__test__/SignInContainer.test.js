import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import SignInContainer from '../SignInContainer';

test('should render without errors', () => {
  expect(() => {
    render(<SignInContainer />);
  }).not.toThrowError();
});

test(`should show 'Your password is required' if no password is submitted`, async () => {
  const { getByTestId, getByText } = render(<SignInContainer />);

  await act(async () => {
    fireEvent.click(getByTestId(/log in button/i));
  });

  getByText(/your password is required/i);
});

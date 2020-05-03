import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import SignInContainer from '../SignInContainer';
import { createMemoryHistory } from 'history';

test('should render without errors', () => {
  const history = createMemoryHistory();
  expect(() => {
    render(
      <Router history={history}>
        <SignInContainer />
      </Router>
    );
  }).not.toThrowError();
});

test(`should show 'Your password is required' if no password is submitted`, async () => {
  const history = createMemoryHistory();
  const { getByTestId, getByText } = render(
    <Router history={history}>
      <SignInContainer />
    </Router>
  );

  await act(async () => {
    fireEvent.click(getByTestId(/log in button/i));
  });

  getByText(/your password is required/i);
});

// waiting for api
// test('should go back home if succesfull log in', async () => {
//   const history = createMemoryHistory();
//   history.push('/');
//   const { getByTestId, getByText, getByLabelText } = render(
//     <Router history={history}>
//       <SignInContainer />
//     </Router>
//   );

//   await act(async () => {
//     fireEvent.input(
//       getByLabelText('Email', { id: 'email' }),
//       {
//         target: { value: 'Test@test.com' }
//       }
//     );

//     fireEvent.input(
//       getByLabelText('Password', { id: 'password' }),
//       {
//         target: { value: 'test password' }
//       }
//     );

//     fireEvent.click(getByTestId(/log in button/i));
//   });

//   getByText(/your password is required/i);
// });

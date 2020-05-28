import React from 'react';
import { renderWithRouter, mockGuestRegistrationResponse } from '../../../Testing';
import { wait } from '@testing-library/react';
import RegistrationContainer from '../RegistrationContainer';
import axios from 'axios';

jest.mock('axios');

const route = '/events/register/123';
const path = '/events/register/:eventId';

test('should set the user to the response of Gest_AUTH if no user is found', async () => {
  axios.post.mockImplementationOnce(() => Promise.resolve({ data: { ...mockGuestRegistrationResponse } }));
  const { getByText } = renderWithRouter(
    <RegistrationContainer />, { route, path }
  );
  await wait(() => {
    getByText(mockGuestRegistrationResponse.token)
  });
});

test('should pass props', () => {
  const { getByText } = renderWithRouter(
    <RegistrationContainer />, { route, path }
  );
  getByText('123')
});

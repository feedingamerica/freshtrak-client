import React from 'react';
import { renderWithRouter, mockGuestRegistrationResponse } from '../../../Testing';
import { wait } from '@testing-library/react';
import RegistrationContainer from '../RegistrationContainer';
import axios from 'axios';

jest.mock('axios');

const route = '/events/register/123';
const path = '/events/register/:eventId';

test('should show the loading component until the user token is returned by api', async () => {
  axios.post.mockImplementationOnce(() => Promise.resolve({ data: { ...mockGuestRegistrationResponse } }));
  const { getByTestId, queryByTestId } = renderWithRouter(
    <RegistrationContainer />, { route, path }
  );
  getByTestId('spinning component');
  await wait(() => {
    expect(queryByTestId('spinning component')).toBeNull();
  });
});

import React from 'react';
import {
  renderWithRouter,
  mockGuestRegistrationResponse,
  mockFamily,
} from '../../../Testing';
import { wait } from '@testing-library/react';
import RegistrationContainer from '../RegistrationContainer';
import axios from 'axios';

jest.mock('axios');

const route = '/events/register/123';
const path = '/events/register/:eventId';

test('should show the loading component until the user token is returned by api', async () => {
  axios.post.mockImplementationOnce(() =>
    Promise.resolve({ data: { ...mockGuestRegistrationResponse } })
  );
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { ...mockFamily } })
  );
  const {
    getByTestId,
    getByLabelText,
    queryByTestId,
  } = renderWithRouter(<RegistrationContainer />, { route, path });
  getByTestId('spinning component');
  await wait(() => {
    expect(queryByTestId('spinning component')).toBeNull();
    const input = getByLabelText(/first name/i);
    expect(input.value).toEqual(mockFamily.first_name);
  });
});

import React from 'react';
import {
  renderWithRouter,
  mockGuestRegistrationResponse,
  mockFamily,
  mockEventDate,
  mockEventSlot
} from '../../../Testing';
import { wait, act, fireEvent } from '@testing-library/react';
import RegistrationContainer from '../RegistrationContainer';
import axios from 'axios';

jest.mock('axios');

const route = '/events/register/123';
const path = '/events/register/:eventId';

/*** Mock Google Maps JavaScript API ***/
jest.mock("react-places-autocomplete", () => {
  const React = require("react"); // eslint-disable-line
  class PlacesAutocomplete extends React.Component {
    renderProps = {
      getInputProps: jest.fn(),
      suggestions: [],
      getSuggestionItemProps: jest.fn(),
    };

    render() {
      return <>{this.props.children(this.renderProps)}</>;
    }
  }

  return PlacesAutocomplete;
});

test('should show the loading component until the user token is returned by api', async () => {
  axios.post.mockImplementationOnce(() =>
    Promise.resolve({ data: { ...mockGuestRegistrationResponse } })
  );
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { ...mockFamily } })
  );
  const location = {
    state: {
      eventDateId: mockEventDate.id,
      eventSlotId: mockEventSlot.event_slot_id
    }
  }
  const {
    getByTestId,
    getByLabelText,
    queryByTestId,
  } = renderWithRouter(<RegistrationContainer location={location} />, { route, path });
  getByTestId('spinning component');
  await wait(() => {
    expect(queryByTestId('spinning component')).toBeNull();
    const input = getByLabelText(/first name/i);
    expect(input.value).toEqual(mockFamily.first_name);
  });
});

test('should register user for event', async () => {
  axios.post.mockImplementation(url => {
    switch (url) {
      case 'undefinedguest_authentications':
        return Promise.resolve({ data: { ...mockGuestRegistrationResponse } })
      default:
        return Promise.resolve()
    }
  });

  axios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { ...mockFamily, date_of_birth: '2020-05-20', state: 'OH' } })
  );

  // TO DO

  // const { getByTestId, getByLabelText } = renderWithRouter(<RegistrationContainer />, { route, path });
  // await wait(async () => {
  //   const input = getByLabelText(/first name/i);
  //   expect(input.value).toEqual(mockFamily.first_name);

  // });
  // await act(async () => {
  //   fireEvent.click(getByTestId(/continue button/i));
  // });
  // getByTestId('success registration');
});

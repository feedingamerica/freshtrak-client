import React from 'react';
import { render,fireEvent,wait } from '@testing-library/react';
import AddressComponent from '../AddressComponent';
import { noop } from '../../../Testing';


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



// Somehow, the suggestions list could not be detected even if the data is passed to the input field.
// Will have to look into that. But for now, it works well if the API KEY is correct.
// It does have a few more testcases to cover once suggestion list is identified.


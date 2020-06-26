import React from 'react';
import { render, fireEvent, act, getByText } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FamilyContainer from '../FamilyContainer.js';

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

test('it should render without errors', () => {
  expect(() => {
    render(
      <Router>
        <FamilyContainer />
      </Router>
    );
  }).not.toThrowError();
});

// Out of scope
// test(`should show 'Passwords should match!' if passwords do not match`, async () => {
//   const { getByLabelText, getByTestId, getByText } = render(
//     <Router>
//       <FamilyContainer />
//     </Router>
//   );

//   await act(async () => {
//     fireEvent.input(
//       getByLabelText('Password', { id: 'password' }),
//       {
//         target: { value: 'test' },
//       }
//     );

//     fireEvent.input(
//       getByLabelText(/confirm password/i, { id: 'password_confirm' }),
//       {
//         target: { value: 'not test' },
//       }
//     );
//     fireEvent.click(getByTestId(/continue button/i));
//   });
  
//   getByText('Passwords should match!');
// });

test(`should show to click 'No Phone Available' if no phone available is not clicked and nothing is in the phone number`, async () => {
  const { getByLabelText, getByTestId, queryByTestId } = render(
    <Router>
      <FamilyContainer />
    </Router>
  );

  // Act is necessary for react-hook-forms to fire in the testing env
  // Notice the lack of await within the inner async.
  // https://github.com/react-hook-form/react-hook-form/issues/532
  await act(async () => {
    fireEvent.click(getByTestId(/continue button/i));
  });
  getByTestId('no phone error');
  getByTestId(/phone permission/i);

  await act(async () => {
    fireEvent.input(
      getByLabelText(/No Phone Available/i, { id: 'no_phone_number' }),
      {
        target: { checked: true }
      }
    );
    fireEvent.click(getByTestId(/continue button/i));
  });
  expect(queryByTestId('no phone error')).toBeNull();
  // Also conditionally hide the phone permission text
  expect(queryByTestId(/phone permission/i)).toBeNull();
});

test(`should show to click 'No Email Available' if no email available is not clicked and nothing is in the email`, async () => {
  const { getByLabelText, getByTestId, queryByTestId } = render(
    <Router>
      <FamilyContainer />
    </Router>
  );

  await act(async () => {
    fireEvent.click(getByTestId(/continue button/i));
  });
  getByTestId('no email error');
  getByTestId(/email permission/i);

  await act(async () => {
    fireEvent.input(
      getByLabelText(/No Email Available/i, { id: 'no_email' }),
      {
        target: { checked: true }
      }
    );    
    fireEvent.click(getByTestId(/continue button/i));
  });
  expect(queryByTestId('no email error')).toBeNull();
  // Also conditionally hide the email permission text
  expect(queryByTestId(/email permission/i)).toBeNull();
});

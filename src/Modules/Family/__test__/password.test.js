import React from 'react';
import { render } from '@testing-library/react';
import PasswordRegistrationFormComponent from '../PasswordRegistrationFormComponent';
import { noop, mockPasswordBuilder } from '../../../Testing';

test('should render', () => {
  expect(() => {
    render(
      <PasswordRegistrationFormComponent
        onSelectedChild={noop}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

test('should render PasswordRegistrationFormComponent with data provided', () => {
  expect(() => {
    render(
      <PasswordRegistrationFormComponent
        onSelectedChild={mockPasswordBuilder}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

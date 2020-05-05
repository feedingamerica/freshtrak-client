import React from 'react';
import { render } from '@testing-library/react';
import AdditionalPickUpFormComponent from '../AdditionalPickUpFormComponent';
import { noop,mockPickUpBuilder } from '../../../Testing';

test('should render', () => {
  expect(() => {
    render(
      <AdditionalPickUpFormComponent
        onSelectedChild={noop}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

test('should render AdditionalPickUpFormComponent with data provided', () => {
  expect(() => {
    render(
      <AdditionalPickUpFormComponent
        onSelectedChild={mockPickUpBuilder}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

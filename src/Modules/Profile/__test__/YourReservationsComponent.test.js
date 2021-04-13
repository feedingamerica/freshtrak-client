import React from 'react';
import { render } from '@testing-library/react';
import YourReservationsComponent from '../YourReservationsComponent';


test('YourReservationsComponent rendered without errors', () => {
  expect(() => {
    render(
          <YourReservationsComponent/>
    );
  }).not.toThrowError();
});
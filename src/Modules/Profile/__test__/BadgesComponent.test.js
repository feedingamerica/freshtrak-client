import React from 'react';
import { render } from '@testing-library/react';
import BadgesComponent from '../BadgesComponent';


test('BadgesComponent rendered without errors', () => {
  expect(() => {
    render(
        <BadgesComponent/>
    );
  }).not.toThrowError();
});
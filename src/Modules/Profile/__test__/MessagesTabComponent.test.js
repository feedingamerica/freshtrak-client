import React from 'react';
import { render } from '@testing-library/react';
import MessagesTabComponent from '../MessagesTabComponent';


test('MessagesTabComponent rendered without errors', () => {
  expect(() => {
    render(
        <MessagesTabComponent/>
    );
  }).not.toThrowError();
});
import React from 'react';
import { render } from '@testing-library/react';
import ProfileTabComponent from '../ProfileTabComponent';


test('ProfileTabComponent rendered without errors', () => {
  expect(() => {
    render(
        <ProfileTabComponent/>
    );
  }).not.toThrowError();
});
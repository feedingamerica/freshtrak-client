import React from 'react';
import { render } from '@testing-library/react';
import HouseHoldMembersComponent from '../HouseHoldMembersComponent';


test('HouseHoldMembersComponent rendered without errors', () => {
  expect(() => {
    render(
        <HouseHoldMembersComponent/>
    );
  }).not.toThrowError();
});
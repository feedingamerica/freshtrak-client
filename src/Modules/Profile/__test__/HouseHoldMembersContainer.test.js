import React from 'react';
import { render } from '@testing-library/react';
import HouseHoldMembersContainer from '../HouseHoldMembersContainer';


test('HouseHoldMembersContainer rendered without errors', () => {
  expect(() => {
    render(
        <HouseHoldMembersContainer/>
    );
  }).not.toThrowError();
});
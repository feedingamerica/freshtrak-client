import React from 'react';
import { render } from '@testing-library/react';
import AccountTabComponent from '../AccountTabComponent';
import YourInformationContainer from '../YourInformation/YourInformationContainer';
import HouseHoldMembersContainer from '../HouseHoldMembersContainer';


test('AccountTabComponent rendered without errors', () => {
  expect(() => {
    render(
        <AccountTabComponent>
          <YourInformationContainer/>
          <HouseHoldMembersContainer/>
          </AccountTabComponent>
    );
  }).not.toThrowError();
});
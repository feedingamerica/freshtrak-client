import React from 'react';
import { render } from '@testing-library/react';
import AccountTabComponent from '../AccountTabComponent';
import YourInformationContainer from '../YourInformation/YourInformationContainer';
import HouseHoldMembersContainer from '../HouseHoldMembersContainer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);



test('AccountTabComponent rendered without errors', () => {
  expect(() => {
    const store = mockStore({});
    render(
      <Provider store={store}>
      <AccountTabComponent>
      <YourInformationContainer/>
      <HouseHoldMembersContainer/>
      </AccountTabComponent>
      </Provider>
      
        
    );
  }).not.toThrowError();
});
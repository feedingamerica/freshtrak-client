import React from 'react';
import { render } from '@testing-library/react';
import SideTrayComponent from '../SideTrayComponent';
import EditVehicleComponent from '../EditInformationComponent';
import EditAddressComponent from '../EditAddressComponent';
import EditPhoneComponent from '../EditPhoneComponent';
import EditInformationComponent from '../EditInformationComponent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const store = mockStore({});


test('SideTrayComponent rendered without errors', () => {
  expect(() => {
    render(
      <Provider store={store}>
        <SideTrayComponent header={"header"} show={true}>
          <EditVehicleComponent/>
          <EditAddressComponent/>
          <EditPhoneComponent/>
          <EditInformationComponent/>
          </SideTrayComponent>
      </Provider>
        
    );
  }).not.toThrowError();
});
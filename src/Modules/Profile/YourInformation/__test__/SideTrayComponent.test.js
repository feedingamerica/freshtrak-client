import React from 'react';
import { render } from '@testing-library/react';
import SideTrayComponent from '../SideTrayComponent';
import EditVehicleComponent from '../EditInformationComponent';
import EditAddressComponent from '../EditAddressComponent';
import EditContactComponent from '../EditContactComponent';
import EditInformationComponent from '../EditInformationComponent';


test('SideTrayComponent rendered without errors', () => {
  expect(() => {
    render(
        <SideTrayComponent header={"header"} show={true}>
          <EditVehicleComponent/>
          <EditAddressComponent/>
          <EditContactComponent/>
          <EditInformationComponent/>
          </SideTrayComponent>
    );
  }).not.toThrowError();
});
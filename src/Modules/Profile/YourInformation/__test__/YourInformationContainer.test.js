
import React from 'react';
import { 
  mockProfileBuilder
} from '../../../../Testing/mock-profile';
import axios from 'axios';
import { render, fireEvent, act } from '@testing-library/react';
import YourInformationContainer from '../YourInformationContainer';
import SideTrayComponent from '../SideTrayComponent';
import EditInformationComponent from '../EditInformationComponent';
import EditAddressComponent from '../EditAddressComponent';
import EditContactComponent from '../EditContactComponent';
import EditVehicleComponent from '../EditVehicleComponent';


test('should render without errors', () => {
  //const history = createMemoryHistory();
  expect(() => {
    render(
        <YourInformationContainer >
          
          <SideTrayComponent >
            <EditInformationComponent informationData={mockProfileBuilder}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditAddressComponent addressData={mockProfileBuilder}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditContactComponent contactData={mockProfileBuilder}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditVehicleComponent vehicleData={mockProfileBuilder}/>
          </SideTrayComponent>

          </YourInformationContainer>
    );
  }).not.toThrowError();
});
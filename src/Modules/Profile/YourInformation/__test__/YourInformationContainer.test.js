
import React from 'react';
import { 
  mockProfileData
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
            <EditInformationComponent informationData={mockProfileData}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditAddressComponent addressData={mockProfileData}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditContactComponent contactData={mockProfileData}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditVehicleComponent vehicleData={mockProfileData}/>
          </SideTrayComponent>

          </YourInformationContainer>
    );
  }).not.toThrowError();
});
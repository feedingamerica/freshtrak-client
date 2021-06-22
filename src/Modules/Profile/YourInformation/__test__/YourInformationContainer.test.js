
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
import EditPhoneComponent from '../EditPhoneComponent';
import EditVehicleComponent from '../EditVehicleComponent';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const store = mockStore({});


test('should render without errors', () => {
  //const history = createMemoryHistory();
  expect(() => {
    render(

      <Provider store={store}>
      <YourInformationContainer >
          
          <SideTrayComponent >
            <EditInformationComponent informationData={mockProfileData}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditAddressComponent addressData={mockProfileData}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditPhoneComponent phoneData={mockProfileData}/>
          </SideTrayComponent>

          <SideTrayComponent >
            <EditVehicleComponent vehicleData={mockProfileData}/>
          </SideTrayComponent>

          </YourInformationContainer>
    </Provider>
   
    );
  }).not.toThrowError();
});
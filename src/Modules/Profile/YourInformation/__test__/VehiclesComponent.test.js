import React from 'react';
import { render } from '@testing-library/react';
import { 
  mockProfileData
} from '../../../../Testing/mock-profile';
import VehiclesComponent from '../VehiclesComponent';


test('VehiclesComponent rendered without errors', () => {
  expect(() => {
    render(
        <VehiclesComponent vehicleData={mockProfileData}/>
    );
  }).not.toThrowError();
});
import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import AdditionalPickUpFormComponent from '../AdditionalPickUpFormComponent';
import { noop,mockPickUpBuilder } from '../../../Testing';

test('should render', () => {
  expect(() => {
    render(
      <AdditionalPickUpFormComponent
        onSelectedChild={noop}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

test('should render AdditionalPickUpFormComponent with data provided', () => {
  expect(() => {
    render(
      <AdditionalPickUpFormComponent
        onSelectedChild={mockPickUpBuilder}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

test('should have proper binding onChange',()=>{
  const {container,getByTestId,queryByTestId,getByAltText} = render(
    <AdditionalPickUpFormComponent
      onSelectedChild={mockPickUpBuilder}
      onFormErrors={noop}
    />);

  let pType = container.querySelector('select[name="pickup_type"]');
  let pName = container.querySelector('input[name="pickup_name"]');
  let numPlate = container.querySelector('input[name="vehicle_number_plate"]');
  let add_btn = container.querySelector('button[name="add_btn"]');
  let mockPickUpData = mockPickUpBuilder();

  // checking binding
  fireEvent.change(pType,{target:{value:mockPickUpData.pickupType}});
  expect(pType.value).toBe(mockPickUpData.pickupType);

  fireEvent.change(pName,{target:{value:mockPickUpData.pickupName}});
  expect(pName.value).toBe(mockPickUpData.pickupName);

  fireEvent.change(numPlate,{target:{value:mockPickUpData.pickupNumberPlate}});
  expect(numPlate.value).toBe(mockPickUpData.pickupNumberPlate);
 
  fireEvent.click(getByAltText(/my .*/i));
 
  let numPlate_2 = container.querySelector('input[name="vehicle_number_plate_two"]');
  fireEvent.change(numPlate_2,{target:{value:mockPickUpData.pickupNumberPlate2}});
  expect(numPlate_2.value).toBe(mockPickUpData.pickupNumberPlate2);
  
  fireEvent.click(getByAltText(/my .*/i));
  expect(queryByTestId(container,'additional-vehicle')).toBeNull();
});
import React from 'react';
import { render, fireEvent, waitForElement, wait } from '@testing-library/react';
import AdditionalPickUpFormComponent from '../AdditionalPickUpFormComponent';
import { noop,mockPickUpBuilder } from '../../../Testing';
import {fake,oneOf} from 'test-data-bot';

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
const {container,getByTestId,queryByTestId} = render(
  <AdditionalPickUpFormComponent
    onSelectedChild={mockPickUpBuilder}
    onFormErrors={noop}
  />);

  let pType = container.querySelector('select[name="pickup_type"]');
  let pName = container.querySelector('input[name="pickup_name"]');
  let numPlate = container.querySelector('input[name="vehicle_number_plate"]');
  let add_btn = container.querySelector('button[name="add_btn"]');

  let fakePType = oneOf('Me','Some one Else').generate(1);
  let fakeName = fake(f=>f.name.firstName()).generate(1);
  let fakeNumPlate = 'KL-01-1995';
  let fakeNumPlate2 = 'MH-04-1990';

  // checking binding
  fireEvent.change(pType,{target:{value:fakePType}});
  expect(pType.value).toBe(fakePType);
  fireEvent.change(pName,{target:{value:fakeName}});
  expect(pName.value).toBe(fakeName);
  fireEvent.change(numPlate,{target:{value:fakeNumPlate}});
  expect(numPlate.value).toBe(fakeNumPlate);


  fireEvent.click(add_btn,{target:{value:''}});
 
  let numPlate_2 = container.querySelector('input[name="vehicle_number_plate_two"]');
  fireEvent.change(numPlate_2,{target:{value:fakeNumPlate2}});
  expect(numPlate_2.value).toBe(fakeNumPlate2);


  // triggering switch case if step=true 
  fireEvent.click(add_btn,{target:{value:''}});
  expect(queryByTestId(container,'additional-vehicle')).toBeNull();
 



});

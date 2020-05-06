import React from 'react';
import { render,fireEvent } from '@testing-library/react';
import HouseHoldFormComponent from '../HouseHoldFormComponent';
import { noop,mockPickUpBuilder } from '../../../Testing';

let HouseHoldData=''

test('should render', () => {
  expect(() => {
    render(
      <HouseHoldFormComponent
        onSelectedChild={noop}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});



test('should render HouseHoldFormComponent with data provided', () => {
  expect(() => {
    render(
    <HouseHoldFormComponent
    onSelectedChild={noop}
    onFormErrors={noop}
    />
  );
  }).not.toThrowError();
});


test('It should put a value to the street_address', () => {
  const { input } = setup_street_adress()
  fireEvent.change(input, { target: { value: 'test house' } })
  expect(input.value).toBe('test house')
})
test('It should put letter to  zip value to the zip', () => {
  const { input } = setup_zip()
  fireEvent.change(input, { target: { value: 'aaaa aaa ' } })
  expect(input.value).toBe('')
})



const setup_zip = () => {
  const utils =render(
      <HouseHoldFormComponent
          onSelectedChild={noop}
          onFormErrors={noop}
      />
  );
  const input = utils.getByPlaceholderText('zip_code')
  return {
    input, utils,
  }
}
const setup_street_adress = () => {
  const utils =render(
      <HouseHoldFormComponent
          onSelectedChild={noop}
          onFormErrors={noop}
      />
  );
  const input = utils.getByPlaceholderText('street_address')
  return {
    input, utils,
  }
}

import React from 'react';
import { render,fireEvent,  waitForElement, wait} from '@testing-library/react';
import HouseHoldFormComponent from '../HouseHoldFormComponent';
import { noop, mockHouseHoldBuilder } from '../../../Testing';
import { shallow, configure,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {fake,oneOf} from 'test-data-bot'

configure({adapter: new Adapter()});


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



test('should render HouseHoldFormComponent with no data ', () => {
  expect(() => {
    render(
    <HouseHoldFormComponent
    onSelectedChild={mockHouseHoldBuilder}
    onFormErrors={noop}
    />
  );
  }).not.toThrowError();
});


test('should have proper binding onChange',()=>{
    const {container,getByTestId,queryByTestId,} = render(
        <HouseHoldFormComponent
            onSelectedChild={noop}
            onFormErrors={noop}
        />);


let hType = container.querySelector('select[name="housing_type"]');
let zipValue = container.querySelector('input[name="zip_code"]');
let aptValue = container.querySelector('input[name="apt_no"]');
let streetValue = container.querySelector('input[name="street_address"]');

let fakeHType = oneOf('Apartment','Mobile home or house trailer', 'Military housing','Student housing','Temporary','Prefer not to answer').generate(1);

let fakeNumbers='123'
let fakeStringValue ='abc'

     // for checking binding

  fireEvent.change(hType,{target:{value:fakeHType}});
  expect(hType.value).toBe(fakeHType);

  fireEvent.change(zipValue,{target:{value:''}});
  expect(zipValue.value).toBe('');

  fireEvent.change(zipValue,{target:{value:fakeNumbers}});
  expect(zipValue.value).toBe(fakeNumbers);


  fireEvent.change(zipValue,{target:{value:fakeStringValue}});
  expect(zipValue.value).toBe('');

  fireEvent.change(aptValue,{target:{value:''}});
  expect(aptValue.value).toBe('');

  fireEvent.change(aptValue,{target:{value:fakeNumbers}});
  expect(aptValue.value).toBe(fakeNumbers);


  fireEvent.change(aptValue,{target:{value:fakeStringValue}});
  expect(aptValue.value).toBe(fakeStringValue);

 fireEvent.change(streetValue,{target:{value:''}});
  expect(streetValue.value).toBe('');

  fireEvent.change(streetValue,{target:{value:fakeNumbers}});
  expect(streetValue.value).toBe(fakeNumbers);


  fireEvent.change(streetValue,{target:{value:fakeStringValue}});
  expect(streetValue.value).toBe(fakeStringValue);


});


test("should show validation errors", async () => {
  const { container, getByTestId, getByText } = render(
      <HouseHoldFormComponent
          ref = {jest.fn()}
          onSelectedChild={noop}
          onFormErrors={noop}
      />
  );
  const street_address = container.querySelector('input[name="street_address"]');
  const apt_no = container.querySelector('input[name="apt_no"]');
  const zip_code = container.querySelector('input[name="zip_code"]');

  fireEvent.blur(street_address);
    await wait(() => {
    expect(getByTestId("street-address")).toHaveTextContent(
        "This field is required"
    );
  });
  fireEvent.blur(apt_no);
    await wait(() => {
    expect(getByTestId("apt-no")).toHaveTextContent(
        "This field is required"
    );
  });
  fireEvent.blur(zip_code);
    await wait(() => {
    expect(getByTestId("zip-code")).toHaveTextContent(
        "This field is required"
    );
  });
});
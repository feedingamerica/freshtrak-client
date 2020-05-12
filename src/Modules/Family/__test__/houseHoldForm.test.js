import React from 'react';
import { render,fireEvent, wait} from '@testing-library/react';
import HouseHoldFormComponent from '../HouseHoldFormComponent';
import { noop, mockHouseHold } from '../../../Testing';
import {fake,oneOf} from 'test-data-bot'


test('should render HouseHoldFormComponent with no data', () => {
  expect(() => {
    render(
      <HouseHoldFormComponent
        onSelectedChild={noop}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

test('should render HouseHoldFormComponent with Mock data', () => {
  expect(() => {
    render(
    <HouseHoldFormComponent
    onSelectedChild={mockHouseHold}
    onFormErrors={noop}
    />
  );
  }).not.toThrowError();
});


test('should have proper binding onChange',()=>{
  let mockData = mockHouseHold();
    const {container,getByTestId,queryByTestId,} = render(
        <HouseHoldFormComponent
            onSelectedChild={noop}
            onFormErrors={noop}
        />);


  /*const hType = container.querySelector('select[name="housing_type"]');*/
  /*const zipValue = container.querySelector('input[name="zip_code"]');*/
  /*const aptValue = container.querySelector('input[name="apt_no"]');*/
  /*const streetValue = container.querySelector('input[name="street_address"]');*/

  /*const fakeHousingType = oneOf('Apartment','Mobile home or house trailer', 'Military housing','Student housing','Temporary','Prefer not to answer').generate(1);*/

  /*const fakStreetAddress= fake((f) => f.address.streetAddress()).generate(1);
  const fakeApt='Bakers A2 '
  const fakeZip= '686503'
  const fakeNumbers='123'
  const fakeStringValue ='abc';*/

  const housing_type = container.querySelector('select[name="housing_type"]');
  const street_address = container.querySelector('input[name="street_address"]');
  const apt_no = container.querySelector('input[name="apt_no"]');
  const zip_code = container.querySelector('input[name="zip_code"]');

  fireEvent.change(housing_type,{target:{value:mockData.housingType}});
  expect(housing_type.value).toBe(mockData.housingType);

  fireEvent.change(street_address,{target:{value:mockData.streetAddress}});
  expect(street_address.value).toBe(mockData.streetAddress);

  fireEvent.change(apt_no,{target:{value:mockData.aptNo}});
  expect(apt_no).toHaveValue(mockData.aptNo);

  fireEvent.change(zip_code,{target:{value:mockData.zip}});
  expect(zip_code.value).toBe(mockData.zip);

  /*console.log(mockData.zip);*/

     // for checking binding

  /*fireEvent.change(hType,{target:{value:fakeHousingType}});
  expect(hType.value).toBe(fakeHousingType);*/

  /*fireEvent.change(zipValue,{target:{value:''}});
  expect(zipValue.value).toBe('');*/

 /* fireEvent.change(zipValue,{target:{value:fakeZip}});
  expect(zipValue.value).toBe(fakeZip);


  fireEvent.change(zipValue,{target:{value:fakeStringValue}});
  expect(zipValue.value).toBe('');

  fireEvent.change(aptValue,{target:{value:''}});
  expect(aptValue.value).toBe('');

  fireEvent.change(aptValue,{target:{value:fakeNumbers}});
  expect(aptValue.value).toBe(fakeNumbers);


  fireEvent.change(aptValue,{target:{value:fakeApt}});
  expect(aptValue.value).toBe(fakeApt);

 fireEvent.change(streetValue,{target:{value:''}});
  expect(streetValue.value).toBe('');

  fireEvent.change(streetValue,{target:{value:fakeNumbers}});
  expect(streetValue.value).toBe(fakeNumbers);*/


 /* fireEvent.change(streetValue,{target:{value:fakStreetAddress}});
  expect(streetValue.value).toBe(fakStreetAddress);*/

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
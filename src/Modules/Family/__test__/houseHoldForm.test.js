import React from 'react';
import { render,fireEvent, wait} from '@testing-library/react';
import HouseHoldFormComponent from '../HouseHoldFormComponent';
import { noop, mockHouseHold } from '../../../Testing';


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
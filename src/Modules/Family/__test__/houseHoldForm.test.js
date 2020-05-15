import React from 'react';
import { render,fireEvent, wait} from '@testing-library/react';
import HouseHoldFormComponent from '../HouseHoldFormComponent';
import { noop, mockHouseHoldBuilder } from '../../../Testing';
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
                onSelectedChild={mockHouseHoldBuilder}
                onFormErrors={noop}
            />
        );
    }).not.toThrowError();
});
test("should show validation errors", async () => {
    const { container, getByTestId, getByText } = render(
        <HouseHoldFormComponent
            ref = {noop}
            onSelectedChild={mockHouseHoldBuilder}
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

test('should have proper binding onChange',async()=>{
    let mockData = mockHouseHoldBuilder();
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
    await wait(()=>{
      expect(housing_type.value).toBe(mockData.housingType);
    }); 
    
    fireEvent.change(street_address,{target:{value:mockData.streetAddress}});
    await wait(()=>{
      expect(street_address.value).toBe(mockData.streetAddress);
    }); 
    
    fireEvent.change(apt_no,{target:{value:mockData.aptNo}});
    await wait(()=>{
      expect(apt_no).toHaveValue(mockData.aptNo);
    }); 
    
    fireEvent.change(zip_code,{target:{value:mockData.zip}});
    await wait(()=>{
      expect(zip_code.value).toBe(mockData.zip);
    }); 
});
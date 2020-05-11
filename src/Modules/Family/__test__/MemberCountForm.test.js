import React from 'react';
import { render, fireEvent, wait,waitForElement,waitForDomChange, cleanup  } from "@testing-library/react";
import MemberCountFormComponent from '../MemberCountFormComponent';
import { noop, mockMemberCountBuilder } from '../../../Testing';
import { shallow, configure,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HouseHoldFormComponent from "../HouseHoldFormComponent";
import {oneOf} from "test-data-bot";
configure({adapter: new Adapter()});


test('should render', () => {
    expect(() => {
        render(
            <MemberCountFormComponent
                onSelectedChild={noop}
                onFormErrors={noop}
            />
        );
    }).not.toThrowError();
});


test('should render HouseHoldFormComponent with data provided', () => {
    expect(() => {
        render(
            <MemberCountFormComponent
                onSelectedChild={mockMemberCountBuilder}
                onFormErrors={noop}
            />
        );
    }).not.toThrowError();
});

test('should have proper binding onChange',async () =>{
    const {container,getByTestId,queryByTestId,} = render(
        <MemberCountFormComponent
            onSelectedChild={mockMemberCountBuilder}
            onFormErrors={noop}
        />);

    let junior_count_input=container.querySelector('input[name="junior_count_input"]');
    let adult_count_input=container.querySelector('input[name="adult_count_input"]');
    let senior_count_input=container.querySelector('input[name="senior_count_input"]');

    let add_kids_inc = container.querySelector('button[name="count_kids_inc"]');
    let add_kids_dec = container.querySelector('button[name="count_kids_dec"]');

    let add_adults_inc = container.querySelector('button[name="count_adult_inc"]');
    let add_adults_dec = container.querySelector('button[name="count_adult_dec"]');

    let add_senior_inc = container.querySelector('button[name="count_senior_inc"]');
    let add_senior_dec = container.querySelector('button[name="count_senior_dec"]');

    fireEvent.change(junior_count_input, { target: { value: 1 } })
    expect(junior_count_input.value).toBe("0")

    fireEvent.change(junior_count_input, { target: { value: 0 } })
    expect(junior_count_input.value).toBe("0")

    fireEvent.change(adult_count_input, { target: { value: 1 } })
    expect(adult_count_input.value).toBe("0")

    fireEvent.change(adult_count_input, { target: { value: 0 } })
    expect(adult_count_input.value).toBe("0")

   fireEvent.change(senior_count_input, { target: { value: 1 } })
    expect(senior_count_input.value).toBe("0")

    fireEvent.change(senior_count_input, { target: { value: 0 } })
    expect(senior_count_input.value).toBe("0")



    fireEvent.click(add_kids_inc);
    waitForDomChange(()=>{
        expect(junior_count_input.value).toBe("1");
    })

     fireEvent.click(add_kids_dec);
    waitForDomChange(()=>{
        expect(add_kids_dec.value).toBe("0");
    })

    fireEvent.click(add_adults_inc);
        waitForDomChange(()=>{
            expect(add_adults_inc.value).toBe("1");
        })

         fireEvent.click(add_adults_dec);
        waitForDomChange(()=>{
            expect(add_adults_dec.value).toBe("0");
        })


    fireEvent.click(add_senior_inc);
    waitForDomChange(()=>{
        expect(add_senior_inc.value).toBe("1");
    })

    fireEvent.click(add_senior_dec);
    waitForDomChange(()=>{
        expect(add_senior_dec.value).toBe("0");
    })


});
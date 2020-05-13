import React from 'react';
import { render, fireEvent,wait } from "@testing-library/react";
import MemberCountFormComponent from '../MemberCountFormComponent';
import { noop, mockMemberCountBuilder } from '../../../Testing';

test('should render without data', () => {
    expect(() => {
        render(
            <MemberCountFormComponent
                onSelectedChild={noop}
                onFormErrors={noop}
            />
        );
    }).not.toThrowError();
});

test('should render with mockMemberCountBuilder  data provided', () => {
    expect(() => {
        render(
            <MemberCountFormComponent
                onSelectedChild={mockMemberCountBuilder}
                onFormErrors={noop}
            />
        );
    }).not.toThrowError();
});

test('checking whether the member count working correctly',async () =>{
    const {container,getByTestId,queryByTestId,} = render(
        <MemberCountFormComponent
            onSelectedChild={mockMemberCountBuilder}
            onFormErrors={noop}
        />);

    let kids_count_input = container.querySelector('input[name="kids_count_input"]');
    let adult_count_input = container.querySelector('input[name="adult_count_input"]');
    let senior_count_input = container.querySelector('input[name="senior_count_input"]');
    
    
    let add_kids_inc = container.querySelector('button[name="count_kids_inc"]');
    let add_kids_dec = container.querySelector('button[name="count_kids_dec"]');

    let add_adults_inc = container.querySelector('button[name="count_adult_inc"]');
    let add_adults_dec = container.querySelector('button[name="count_adult_dec"]');

    let add_senior_inc = container.querySelector('button[name="count_senior_inc"]');
    let add_senior_dec = container.querySelector('button[name="count_senior_dec"]');

    fireEvent.click(add_kids_inc);    
    await wait(()=>{
        expect(kids_count_input).toHaveValue("1");
    });

    fireEvent.click(add_kids_dec);    
    await wait(()=>{
        expect(kids_count_input.value).toBe("0");
    });

    fireEvent.click(add_adults_inc);    
    fireEvent.click(add_adults_inc);
    await wait(()=>{
        expect(adult_count_input).toHaveValue("2");
    });

    fireEvent.click(add_adults_dec);    
    await wait(()=>{
        expect(adult_count_input.value).toBe("1");
    });

    fireEvent.click(add_senior_inc);    
    fireEvent.click(add_senior_inc);
    fireEvent.click(add_senior_inc);
    await wait(()=>{
        expect(senior_count_input).toHaveValue("3");
    });

    fireEvent.click(add_senior_dec);    
    await wait(()=>{
        expect(senior_count_input.value).toBe("2");
    });
});
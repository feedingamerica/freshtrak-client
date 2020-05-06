import React from 'react';
import { render,fireEvent } from '@testing-library/react';
import MemberCountFormComponent from '../MemberCountFormComponent';
import { noop,mockPickUpBuilder } from '../../../Testing';



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
                onSelectedChild={noop}
                onFormErrors={noop}
            />
        );
    }).not.toThrowError();
});


import React from 'react';
import { render, fireEvent,wait } from '@testing-library/react';
import FoodBankContactInfoComponent from './../FoodBankContactInfoComponent';
import { noop, mockFoodBankContactBuilder } from '../../../Testing';

test('should render foodbank contact info', () => {
	expect(() => {
		render(
			<FoodBankContactInfoComponent 
			ref={noop}
			onFormErrors = {noop}
			/>
		);
	}).not.toThrowError();
});

test ("Checking the validations works properly in Contact info" ,async () => {
	const { container,getByTestId } = render(<FoodBankContactInfoComponent 
	ref={noop}
	onFormErrors = {noop}/>);

	const first_name = container.querySelector('input[name="first_name"]');
	const last_name = container.querySelector('input[name="last_name"]');
	const phone_number = container.querySelector('input[name="phone_number"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	const suffix = container.querySelector('select[name="suffix"]');
	const comm_preference = container.querySelector('select[name="comm_preference"]');
    
    let mockFoodbankContactData = mockFoodBankContactBuilder();

	fireEvent.blur(first_name);
	await wait(() =>{
		expect(getByTestId('first-name')).toHaveTextContent('This field is required');		
	});

	fireEvent.blur(last_name);
	await wait(() =>{
		expect(getByTestId('last-name')).toHaveTextContent('This field is required');
	});

	fireEvent.blur(phone_number);
	await wait(() =>{
		expect(getByTestId('phone-number')).toHaveTextContent('This field is required');
	});

	fireEvent.blur(contact_email);
	await wait(() =>{
		expect(getByTestId('contact-email')).toHaveTextContent('This field is required');
	});

	fireEvent.blur(contact_email, {target: {value: mockFoodbankContactData.firstName}});	
	await wait(() =>{
		expect(getByTestId('contact-email')).toHaveTextContent('Enter a valid email address');
	});
	fireEvent.change(suffix, {target: {value: mockFoodbankContactData.suffx}});
	await wait(() => {
		expect(suffix.value).toBe(mockFoodbankContactData.suffx);
	});

	fireEvent.change(comm_preference, {target: {value: mockFoodbankContactData.commPreference}});
	await wait(() => {
		expect(comm_preference.value).toBe(mockFoodbankContactData.commPreference);
	});
});

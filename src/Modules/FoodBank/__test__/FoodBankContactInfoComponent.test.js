import React from 'react';
import { render, fireEvent,wait ,screen} from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import FoodBankContactInfoComponent from './../FoodBankContactInfoComponent';
import ReactDOM from 'react-dom';
import { noop } from '../../../Testing';
import {fake} from 'test-data-bot';

test('should render foodbank contact info', () => {
	expect(() => {
		render(
			<FoodBankContactInfoComponent onSelectedChild={noop}
			ref={noop}
			onFormErrors = {noop}
			/>
		);
	}).not.toThrowError();
});

test ("Checking the validations works properly" ,async () => {
	const { container,getByTestId } = render(<FoodBankContactInfoComponent onSelectedChild={noop}
	ref={noop}
	onFormErrors = {noop}/>);

	const first_name = container.querySelector('input[name="first_name"]');
	const last_name = container.querySelector('input[name="last_name"]');
	const phone_number = container.querySelector('input[name="phone_number"]');
	const contact_email = container.querySelector('input[name="contact_email"]');

	let contactEmail = String(fake(f => f.random.word()));

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

	fireEvent.blur(contact_email, {target: {value: contactEmail}});	
	await wait(() =>{
		expect(getByTestId('contact-email')).toHaveTextContent('Enter a valid email address');
	});
});

test("Checking the input values are populated correctly",async()=>{
	const { container,getByTestId} = render(<FoodBankContactInfoComponent onSelectedChild={noop}
	ref={noop}
	onFormErrors = {noop}/>);

	const first_name = container.querySelector('input[name="first_name"]');
	const last_name = container.querySelector('input[name="last_name"]');
	const phone_number = container.querySelector('input[name="phone_number"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	
	let firstName = fake(f=>f.name.firstName()).generate(1);	
	let lastName = fake(f=>f.name.lastName()).generate(1);
	let phoneNumber = fake(f=>f.phone.phoneNumber()).generate(1);
	let contactEmail = fake(f => f.internet.email()).generate(1);

	fireEvent.change(first_name, {target: {value: firstName}});	
	await wait(() =>{
		expect(first_name).toHaveValue(firstName);
	});

    fireEvent.change(last_name, {target: {value: lastName}});	
	await wait(() =>{
		expect(last_name).toHaveValue(lastName);
	});

	fireEvent.change(phone_number, {target: {value: phoneNumber}});
	await wait(() =>{
		expect(phone_number).toHaveValue(phoneNumber);
	});
	
	fireEvent.change(contact_email, {target: {value: contactEmail}});
	await wait(() =>{
		expect(contact_email).toHaveValue(contactEmail);
	});
});
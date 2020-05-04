import React from 'react';
import { render, fireEvent,wait} from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import FoodBankRegistrationComponent from './../FoodBankRegistrationComponent';
import ReactDOM from 'react-dom';
import { noop } from '../../../Testing';
import {fake} from 'test-data-bot';
test('should render', () => {
	expect(() => {
		render(
			<FoodBankRegistrationComponent onSelectedChild={noop}
			ref={noop}
			onFormErrors = {noop}
			/>
		);
	}).not.toThrowError();
});


test ("Checking the validations works properly" ,async () => {
	const { container,getByTestId } = render(<FoodBankRegistrationComponent onSelectedChild={noop}
	ref={noop}
	onFormErrors = {noop}/>)
	const org_name = container.querySelector('input[name="org_name"]');
	const address = container.querySelector('input[name="address"]');
	const zip_ode = container.querySelector('input[name="zipcode"]');
	let zipCode = String(fake(f => f.random.word()));

	fireEvent.blur(org_name);
	await wait(() =>{
		expect(getByTestId('org-name')).toHaveTextContent('This field is required');		
	});

	fireEvent.blur(address);
	await wait(() =>{
		expect(getByTestId('address')).toHaveTextContent('This field is required');
	});

	fireEvent.blur(zip_ode);
	await wait(() =>{
		expect(getByTestId('zip-code')).toHaveTextContent('This field is required');
	});

	fireEvent.blur(zip_ode, {target: {value: zipCode}});	
	await wait(() =>{
		expect(getByTestId('zip-code')).toHaveTextContent('Enter a numeric value');
	});
});

test("Checking the input values are populated correctly",async()=>{
	const { container} = render(<FoodBankRegistrationComponent onSelectedChild={noop}
	ref={noop}
	onFormErrors = {noop}/>);
	const org_name = container.querySelector('input[name="org_name"]');
	const address = container.querySelector('input[name="address"]');
	const zip_code = container.querySelector('input[name="zipcode"]');
	
	let orgName = fake(f=>f.company.companyName()).generate(1);	
	let streetAddress = fake(f => f.address.streetAddress()).generate(1);	
	let zipCode = fake(f => f.address.zipCode()).generate(1);
	fireEvent.change(org_name, {target: {value: orgName}});	
	await wait(() =>{
		expect(org_name).toHaveValue(orgName);
	});

    fireEvent.change(address, {target: {value: streetAddress}});	
	await wait(() =>{
		expect(address).toHaveValue(streetAddress);
	});

	fireEvent.change(zip_code, {target: {value: zipCode}});
	await wait(() =>{
		expect(zip_code).toHaveValue(zipCode);
	});
});

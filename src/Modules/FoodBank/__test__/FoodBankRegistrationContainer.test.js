import React from 'react';
import { render, fireEvent,wait,waitForElement} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FoodBankRegistrationContainer from './../FoodBankRegistrationContainer';
import { noop, mockFoodBankRegisterBuilder, mockFoodBankContactBuilder} from '../../../Testing';


test('should render', () => {
	expect(() => {
		render(
			<Router>
				<FoodBankRegistrationContainer location={{ state: '' }}/>
			</Router>
		);
	}).not.toThrowError();
});

test ("Should show the validation erros on button click" ,async () => {
	const {container, getByText,getByTestId } = render(<Router><FoodBankRegistrationContainer /></Router>);
    const zip_ode = container.querySelector('input[name="zipcode"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	const submitButton = container.querySelector('input[name="savefoodbank"]');
	let mockContact  = mockFoodBankContactBuilder();

	fireEvent.click(getByText(/Continue/i))
	await wait(() =>{
		expect(getByTestId('registr-data')).toHaveTextContent('This field is required');
	});	

	fireEvent.blur(zip_ode, {target: {value: mockContact.firstName}});	
	await wait(() =>{
		expect(getByTestId('zip-code')).toHaveTextContent('Enter a numeric value');
	});

	fireEvent.blur(contact_email, {target: {value: mockContact.firstName}});	
	await wait(() =>{
		expect(getByTestId('contact-email')).toHaveTextContent('Enter a valid email address');
	});
});

test("Data saving successful in button click",async()=>{
	let mockContact  = mockFoodBankContactBuilder();
	let mockRegister = mockFoodBankRegisterBuilder();
	const {container, getByText } = render(<Router><FoodBankRegistrationContainer /></Router>);
	
	const org_name = container.querySelector('input[name="org_name"]');
	const address = container.querySelector('input[name="address"]');
	const zip_code = container.querySelector('input[name="zipcode"]');
	const suiteblg = container.querySelector('input[name="suiteblg"]');
	
	const first_name = container.querySelector('input[name="first_name"]');
	const last_name = container.querySelector('input[name="last_name"]');
	const suffix = container.querySelector('select[name="suffix"]');
	const phone_number = container.querySelector('input[name="phone_number"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	const comm_preference = container.querySelector('select[name="comm_preference"]');
	
    
    fireEvent.change(org_name, {target: {value: mockRegister.orgName}});
    fireEvent.blur(org_name);

    fireEvent.change(address, {target: {value: mockRegister.streetAddress}});
    fireEvent.blur(address);

    fireEvent.change(suiteblg, {target: {value: mockRegister.suiteBlg}});
    fireEvent.blur(suiteblg);
    
	fireEvent.change(zip_code, {target: {value: mockRegister.zipCode}});
    fireEvent.blur(zip_code);

	fireEvent.change(first_name, {target: {value: mockContact.firstName}});	
	fireEvent.blur(first_name);

    fireEvent.change(last_name, {target: {value: mockContact.lastName}});
    fireEvent.blur(last_name);

    fireEvent.change(suffix, {target: {value: mockContact.suffx}});
    fireEvent.blur(suffix);

	fireEvent.change(phone_number, {target: {value: mockContact.phoneNumber}});
	fireEvent.blur(phone_number);

	fireEvent.change(contact_email, {target: {value: mockContact.contactEmail}});
	fireEvent.blur(contact_email);
	
	fireEvent.change(comm_preference, {target: {value: mockContact.commPreference}});
	fireEvent.blur(comm_preference);

	fireEvent.click(getByText(/Continue/i));
	await wait(() =>{		
		expect(getByText(/Are you sure you want to proceed/i));
	});

	fireEvent.click(getByText(/Ok/i));
	fireEvent.click(getByText(/Continue/i));
	await wait(() =>{		
		expect(getByText(/Are you sure you want to proceed/i));
	});
    fireEvent.click(getByText(/Cancel/i));
    await wait(() =>{		
		expect(getByText(/Contact information/i));
	});
});

test("Data saving Failed in button click",async()=>{
	let mockRegister = mockFoodBankRegisterBuilder();
	const {container, getByText,getByTestId } = render(<Router><FoodBankRegistrationContainer /></Router>);
	fireEvent.click(getByText(/Continue/i));
	await wait(() =>{		
		expect(getByTestId('org-name')).toHaveTextContent(/Organization Name/i);
	});	
});
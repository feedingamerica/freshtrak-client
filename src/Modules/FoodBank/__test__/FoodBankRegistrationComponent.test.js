import React from 'react';
import { render, fireEvent,wait} from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import FoodBankRegistrationComponent from './../FoodBankRegistrationComponent';
import ReactDOM from 'react-dom';
import { noop, mockFoodBankRegisterBuilder} from '../../../Testing';
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

test('should render FoodBankRegistrationComponent with data provided', () => {
  expect(() => {
    render(
      <FoodBankRegistrationComponent
        onSelectedChild={mockFoodBankRegisterBuilder}
        onFormErrors={noop}
      />
    );
  }).not.toThrowError();
});

test ("Checking whether the validations are working properly" ,async () => {
	const { container,getByTestId } = render(<FoodBankRegistrationComponent onSelectedChild={noop}
	ref={noop}
	onFormErrors = {noop}/>)
	const org_name = container.querySelector('input[name="org_name"]');
	const address = container.querySelector('input[name="address"]');
	const zip_ode = container.querySelector('input[name="zipcode"]');
	const suiteblg = container.querySelector('input[name="suiteblg"]');

	let zipCode = fake(f=>f.random.word()).generate(1);
	let suiteBlg = fake(f => f.random.word()).generate(1);

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
    
    fireEvent.change(suiteblg, {target: {value: suiteBlg}});
	await wait(() =>{
		expect(suiteblg).toHaveValue(suiteBlg);
	});
   
	fireEvent.blur(zip_ode, {target: {value: zipCode}});	
	await wait(() =>{
		expect(getByTestId('zip-code')).toHaveTextContent('Enter a numeric value');
	});
});


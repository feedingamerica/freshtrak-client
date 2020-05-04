import React from 'react';
import { render, fireEvent,wait} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FoodBankRegistrationContainer from './../FoodBankRegistrationContainer';
import ReactDOM from 'react-dom';
import { noop } from '../../../Testing';
import {fake} from 'test-data-bot';
test('should render', () => {
	expect(() => {
		render(
			<Router>
				<FoodBankRegistrationContainer location={{ state: '' }}/>
			</Router>
		);
	}).not.toThrowError();
});

/*test ("Checking the button click functionality" ,async () => {
	const { container,getByTestId } = render(<FoodBankRegistrationContainer />);

	const savefoodbank = container.querySelector('input[name="savefoodbank"]');

	fireEvent.click(savefoodbank);
	await wait(() =>{
		expect(getByTestId('registr-data')).toHaveTextContent('This field ids required');
	});
	
});
*/

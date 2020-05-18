import React from 'react';
import { render,fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ChangePasswordComponent from '../ChangePasswordComponent';
import {noop} from '../../../Testing';
test('should render', () => {
	expect(() => {
		render(
			<Router>
				<ChangePasswordComponent  onFormErrors={noop}/>
			</Router>
		);
	}).not.toThrowError();
});



test('should show proper validations', () => {
		const {getByTestId,getByText,baseElement} = render(
			<Router>
				<ChangePasswordComponent onFormErrors={noop}/>
			</Router>
		);

let password_current = baseElement.querySelector('input[name="password_current"]');
let password_new = baseElement.querySelector('input[name="password_new"]');
let password_confirm = baseElement.querySelector('input[name="password_confirm"]');

	// fireEvent.change(password_current,{target:{value:'a'}});
	fireEvent.blur(password_current);
	expect(getByTestId('password-current')).toHaveTextContent('This field is required');
	fireEvent.blur(password_new);
	expect(getByTestId('password-new')).toHaveTextContent('This field is required');
	fireEvent.blur(password_confirm);
	expect(getByTestId('password-confirm')).toHaveTextContent('This field is required');

});

test('should show proper error message on password mismatch', () => {
		const {getByTestId,getByText,baseElement} = render(
			<Router>
				<ChangePasswordComponent onFormErrors={noop}/>
			</Router>
		);

let password_current = baseElement.querySelector('input[name="password_current"]');
let password_new = baseElement.querySelector('input[name="password_new"]');
let password_confirm = baseElement.querySelector('input[name="password_confirm"]');

	fireEvent.change(password_current,{target:{value:'aa'}});
	fireEvent.blur(password_current);
	fireEvent.change(password_new,{target:{value:'aa'}});
	fireEvent.blur(password_new);
	expect(getByTestId('password-form')).toHaveTextContent('Cannot use current password as the new password');
	fireEvent.change(password_confirm,{target:{value:'bb'}});
	fireEvent.blur(password_confirm);
	expect(getByTestId('password-form')).toHaveTextContent('Password must be same');

});


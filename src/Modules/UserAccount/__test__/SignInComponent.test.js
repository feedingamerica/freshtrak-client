import React from 'react';
import { render, fireEvent, cleanup} from '@testing-library/react';
import SignInComponent from './../SignInComponent';
import {BrowserRouter as Router} from 'react-router-dom';
import {mockSignin,noop} from '../../../Testing';

test('should render without error', () => {
	expect(() => {
		render(<Router>
			<SignInComponent
				onFormErrors = {noop}
			/></Router>
		);
	}).not.toThrowError();
});

test("Checking whether the validations are working properly",()=>{
	const {container, getByText,getByTestId } = render(<Router>
													<SignInComponent 
													onFormErrors = {noop}/>
												</Router>
												);
    const username = container.querySelector('input[name="username"]');
	const password = container.querySelector('input[name="password"]');
	
	fireEvent.blur(username);
    expect(getByTestId('username')).toHaveTextContent(/This field is required/i);
    
    fireEvent.blur(password);
    expect(getByTestId('password')).toHaveTextContent(/This field is required/i);

    fireEvent.change(username,{target:{value:mockSignin.randomWord}});
    fireEvent.blur(username)
    expect(getByTestId('username')).toHaveTextContent(/Enter a valid address/i);
});

test("Checking the binding and data saving successful in button click",()=>{
	const {container, queryByText,getByText,getByAltText } = render(<Router>
													<SignInComponent 
													onFormErrors = {noop}/>
												</Router>
												);
    const username = container.querySelector('input[name="username"]');
	const password = container.querySelector('input[name="password"]');

	fireEvent.change(username,{target:{value:mockSignin.username}});
	expect(username.value).toBe(mockSignin.username);
	
	expect(queryByText(/Username or Email Address/i)).toBeTruthy();
	expect(queryByText(/This field is required/i)).toBeNull();

	fireEvent.change(password,{target:{value:mockSignin.password}});
    expect(password.value).toBe(mockSignin.password);
    
    fireEvent.blur(password)
    expect(queryByText('Password')).toBeTruthy();
    expect(queryByText(/This field is required/i)).toBeNull();

    fireEvent.click(getByText(/submit/i));
    expect(queryByText(/This field is required/i)).toBeNull();
    fireEvent.click(getByText(/cancel/i));
    expect(queryByText(/This field is required/i)).toBeNull();

});
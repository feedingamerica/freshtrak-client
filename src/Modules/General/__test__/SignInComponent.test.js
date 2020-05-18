import React from 'react';
import { render, fireEvent, cleanup} from '@testing-library/react';
import HeaderComponent from '../../Header/HeaderComponent';
import { createMemoryHistory } from 'history'
import {Router} from 'react-router-dom';
import {mockSignin} from '../../../Testing';

let history = createMemoryHistory('/');

test('should show Signin popup on clicking Signin btn on header and should close on clicking close btn',async () => {
    const {getByText,baseElement,getByAltText} = render(
        <Router history={history}>
            <HeaderComponent />
        </Router>
    );

    fireEvent.click(getByText(/Sign in/i));  
    expect(baseElement).toHaveTextContent(/Have you previously registered through FreshTrak/i);

    fireEvent.click(getByText(/Close/i));
    expect(getByAltText('FreshTrak'));
    cleanup();
});

test('should show proper valdiations on form elements',async () => {
    const { getByText,baseElement,queryByText} = render(
        <Router history={history}>
            <HeaderComponent />
        </Router>
    );

    fireEvent.click(
        getByText(/Sign in/i)
    );
    expect(baseElement).toHaveTextContent(/Have you previously registered through FreshTrak/i);

    const username = baseElement.querySelector('input[name="username"]');
    const password = baseElement.querySelector('input[name="password"]');
    
    fireEvent.blur(username);
    expect(baseElement.querySelector('div[data-testid="username"]')).toHaveTextContent(/This field is required/i);
    
    fireEvent.change(username,{target:{value:mockSignin.username}});
    expect(username.value).toBe(mockSignin.username);
    fireEvent.blur(username);

    expect(queryByText(/Username or Email Address/i)).toBeTruthy();
    expect(queryByText(/This field is required/i)).toBeNull();

    // trying with random word for email validation.
    fireEvent.change(username,{target:{value:mockSignin.randomWord}});
    fireEvent.blur(username)
    expect(baseElement.querySelector('div[data-testid="signin-form"]')).toHaveTextContent(/Enter a valid address/i);

    fireEvent.blur(password);
    expect(baseElement.querySelector('div[data-testid="password"]')).toHaveTextContent(/This field is required/i);

    fireEvent.change(password,{target:{value:mockSignin.password}});
    expect(password.value).toBe(mockSignin.password);
    
    fireEvent.blur(password)
    expect(queryByText('Password')).toBeTruthy();
    expect(queryByText(/This field is required/i)).toBeNull();
});

afterEach(cleanup);
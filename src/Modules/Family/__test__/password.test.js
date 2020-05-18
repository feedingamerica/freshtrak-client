import React from 'react';
import { render, fireEvent,  waitForElement, cleanup,wait } from '@testing-library/react';
import PasswordRegistrationFormComponent from '../PasswordRegistrationFormComponent';
import { noop, mockPasswordBuilder } from '../../../Testing';

describe('PasswordRegistrationFormComponents',()=>{
    test('should render without data', () => {
        expect(() => {
            render(
                <PasswordRegistrationFormComponent
                ref = {noop}
                onSelectedChild={noop}
                onFormErrors={noop}
                getPasswordStatus={jest.fn()}
                />
            );
        }).not.toThrowError();
    });

    test('should render with data provided', () => {
        expect(() => {
            render(
                <PasswordRegistrationFormComponent
                ref={jest.fn()}
                onSelectedChild={mockPasswordBuilder}
                onFormErrors={noop}
                getPasswordStatus={jest.fn()}
                />
            );
        }).not.toThrowError();
        cleanup();
    });

    test('should have working input field validations', async () => {
        const {container,getByTestId} = render(
            <PasswordRegistrationFormComponent
            ref={noop}
            onSelectedChild={noop}
            onFormErrors={noop}
            getPasswordStatus={jest.fn()}
            />
        );
        const password = container.querySelector('input[name="password"]');
        const passwordConfirm = container.querySelector('input[name="password_confirm"]');
       
     
        let mockPasswordData = mockPasswordBuilder();

        fireEvent.blur(password);
        expect(getByTestId('password')).toHaveTextContent('This field is required');
        
        fireEvent.blur(passwordConfirm);
        expect(getByTestId('password-confirm')).toHaveTextContent('This field is required');

        fireEvent.change(password,{target:{value:mockPasswordData.password}});
        await wait(()=>{
            expect(password.value).toBe(mockPasswordData.password);
        });

        fireEvent.change(passwordConfirm,{target:{value:mockPasswordData.confirmpassword}})
        await wait(()=>{
            expect(passwordConfirm.value).toBe(mockPasswordData.confirmpassword);
        });

        fireEvent.blur(password);
        await wait (()=>{
            expect(getByTestId('password-confirm')).toHaveTextContent('Password must be same');
        });        
    });
     test('Proper binding on change functionality', async () => {
        const {container,getByTestId} = render(
            <PasswordRegistrationFormComponent
            ref={noop}
            onSelectedChild={noop}
            onFormErrors={noop}
            getPasswordStatus={jest.fn()}
            />
        );
        const password = container.querySelector('input[name="password"]');
        const passwordConfirm = container.querySelector('input[name="password_confirm"]');           
        let mockPasswordData = mockPasswordBuilder();

        fireEvent.change(password,{target:{value:mockPasswordData.password}});
        await wait(()=>{
            expect(password.value).toBe(mockPasswordData.password);
        });

        fireEvent.change(passwordConfirm,{target:{value:mockPasswordData.confirmpassword}})
        await wait(()=>{
            expect(passwordConfirm.value).toBe(mockPasswordData.confirmpassword);
        });
    });
 });

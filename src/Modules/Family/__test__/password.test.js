import React from 'react';
import { render, fireEvent, getByTestId,wait, waitForElement,waitForDomChange, cleanup } from '@testing-library/react';
import PasswordRegistrationFormComponent from '../PasswordRegistrationFormComponent';
import { noop, mockPasswordBuilder } from '../../../Testing';

describe('PasPasswordRegistrationFormComponents',()=>{
  test('should render without data', () => {
    expect(() => {
      render(
        <PasswordRegistrationFormComponent
        ref = {noop}
          onSelectedChild={noop}
          onFormErrors={noop}
        />
      );
    }).not.toThrowError();
  });
  
  test('should render with data provided', () => {
    expect(() => {
      render(
        <PasswordRegistrationFormComponent
        ref={jest.fn()}
          onSelectedChild={noop}
          onFormErrors={noop}
        />
      );
    }).not.toThrowError();
    cleanup()
  });
  
  test('should have working input field validations', async () => {
      const {container} = render(
        <PasswordRegistrationFormComponent
        ref={jest.fn()}
          onSelectedChild={noop}
          onFormErrors={noop}
        />
      );

      // Select input fields
      const password = container.querySelector('input[name="password"]');
      const passwordConfirm = container.querySelector('input[name="passwordConfirm"]');
      
      // checking Required message
      fireEvent.change(passwordConfirm,{target:{value:''}})// with empty value  for passwordConfirm
      fireEvent.change(password,{target:{value:'as'}}) 
      fireEvent.blur(passwordConfirm);
    let showPwdConfirmError = await waitForElement(
      () =>  getByTestId(container,'password-confirm'),
      { container }
    )
    expect(showPwdConfirmError).toHaveTextContent('Required');

      fireEvent.change(password,{target:{value:''}}) //with content
      fireEvent.change(passwordConfirm,{target:{value:'aa'}})
      fireEvent.blur(passwordConfirm);
    let showPwdConfirmError2 = await waitForElement(
      () =>  getByTestId(container,'password-confirm'),
      { container }
    )
    expect(showPwdConfirmError2).toHaveTextContent('Required');

    // pending checking switch default statement
    cleanup()
  });


  test('password and confirm password fields should be same',async()=>{
    const {container,} = render(
      <PasswordRegistrationFormComponent
      ref={jest.fn()}
        onSelectedChild={noop}
        onFormErrors={noop}
      />
    );

    // Select input fields
    const password = container.querySelector('input[name="password"]');
    const passwordConfirm = container.querySelector('input[name="passwordConfirm"]');
    // fake Data
    const fakePwd = mockPasswordBuilder.password;


    fireEvent.change(password,{target:{value:'aa'}})
    fireEvent.change(passwordConfirm,{target:{value:'aabb'}})
    fireEvent.blur(passwordConfirm);
    const samePwdError = await waitForElement(
      () =>  getByTestId(container,'pwdSameError'),
      { container }
    );
    expect(samePwdError).toHaveTextContent('Password must be same');


    fireEvent.change(password,{target:{value:fakePwd}})
    fireEvent.change(passwordConfirm,{target:{value:fakePwd}})
    fireEvent.blur(passwordConfirm);
    const samePwdError2 = await waitForElement(
      () =>  getByTestId(container,'pwdSameError'),
      { container }
    );
    expect(samePwdError2).toHaveTextContent('');
  });
});

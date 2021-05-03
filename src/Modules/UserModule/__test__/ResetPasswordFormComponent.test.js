import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import ResetPasswordFormComponent from '../ForgotPassword/ResetPasswordFormComponent';
import {noop, mockUserBuilder} from '../../../Testing';

const mockStore = configureStore([]);
const store = mockStore({});

test('should rendor without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <ResetPasswordFormComponent customError={noop} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});


test ("Should show the validation erros on forgot passwordemail form" ,async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
      <Router>
        <ResetPasswordFormComponent customError={noop}/>
      </Router>
     </Provider>);
  const code = container.querySelector('input[name="code"]');
  const newpassword = container.querySelector('input[name="newpassword"]');
  const confirmpassword = container.querySelector('input[name="confirmpassword"]');

  let mockUser = mockUserBuilder();
  
  fireEvent.click(getByTestId('reset-password')); 

  await wait(() =>{
    expect(getByTestId('reset-password-form')).toHaveTextContent('This field is required');
  }); 
  
  

  fireEvent.change(newpassword,{target:{value:mockUser.password}});
  await wait(()=>{
    expect(newpassword.value).toBe(mockUser.password);
  });

  fireEvent.change(confirmpassword,{target:{value:mockUser.phone}})
  await wait(()=>{
    expect(confirmpassword.value).toBe(mockUser.phone);
  });

  fireEvent.click(getByTestId('reset-password')); 

  await wait (()=>{
    expect(getByTestId('reset-password-form')).toHaveTextContent('The passwords do not match');
  }); 
});





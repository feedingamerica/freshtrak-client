import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import ForgotPasswordEmailComponent from '../ForgotPassword/ForgotPasswordEmailComponent';
import {noop, mockUserBuilder} from '../../../Testing';

const mockStore = configureStore([]);
const store = mockStore({});

test('should rendor without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <ForgotPasswordEmailComponent customError={noop} />
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});


test ("Should show the validation erros on forgot passwordemail form" ,async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
      <Router>
        <ForgotPasswordEmailComponent customError={noop}/>
      </Router>
     </Provider>);
  const username = container.querySelector('input[name="username"]');
  let mockUser = mockUserBuilder();
  
  fireEvent.click(getByTestId('forgot-pwd')); 
  await wait(() =>{
    expect(getByTestId('forgot-email-form')).toHaveTextContent('This field is required');
  }); 
  
  fireEvent.blur(username, {target: {value: mockUser.password}}); 
  await wait(() =>{
    expect(getByTestId('forgot-email-form')).toHaveTextContent('Enter a valid e-mail address');
  });
});





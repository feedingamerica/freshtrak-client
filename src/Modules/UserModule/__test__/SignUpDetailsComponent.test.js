import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render,fireEvent,act, wait } from '@testing-library/react';
import SignUpDetailsComponent from './../SignUpDetailsComponent';
import {noop, mockUserBuilder} from '../../../Testing';

const mockStore = configureStore([]);
const store = mockStore({});

test('should rendor without errors', () => {
  const store = mockStore({ event: {event:{}} });  
  expect(() => {
    render(
      <Provider store={store}>
        <Router>
          <SignUpDetailsComponent customError={noop}/>
        </Router>
      </Provider>
    );
  }).not.toThrowError();
});


test ("Should show the validation erros on signup form" ,async () => {
  const store = mockStore({ event: {event:{}} });  
  const {container,getByText,getByTestId } = render(<Provider store={store}>
      <Router>
        <SignUpDetailsComponent customError={noop}/>
      </Router>
     </Provider>);
  const username = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  const phonenumber = container.querySelector('input[name="phonenumber"]');

  let mockUser = mockUserBuilder();
  
  fireEvent.click(getByTestId('signup')); 
  await wait(() =>{
    expect(getByTestId('user-signup')).toHaveTextContent('This field is required');
  }); 
  
  fireEvent.blur(username, {target: {value: mockUser.password}}); 
  await wait(() =>{
    expect(getByTestId('user-signup')).toHaveTextContent('Enter a valid e-mail address');
  });
});


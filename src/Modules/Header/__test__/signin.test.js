import React from 'react';
import { render, fireEvent, cleanup, act,wait} from '@testing-library/react';
import HeaderComponent from '../HeaderComponent';
import { createMemoryHistory } from 'history'
import {Router} from 'react-router-dom';
let history = createMemoryHistory('/')
test('should show Signin popup on clicking Signin btn on header and should close on clicking close btn',async () => {
  const { container,getByText,baseElement} = render(
      <Router history={history}>
        <HeaderComponent />
      </Router>
  );
  
  fireEvent.click(
    getByText(/Sign in/i)
  );
  
expect(baseElement).toHaveTextContent(/Have you previously registered through FreshTrak/i);
fireEvent.click(
    getByText(/Submit/i)
  );
  
  

});

afterEach(cleanup);
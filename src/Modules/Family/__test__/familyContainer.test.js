import React from 'react';
import { render, fireEvent,wait, cleanup} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FamilyContainer from '../FamilyContainer';
import {mockPasswordBuilder,mockPrimaryInfoBuilder,  mockHouseHoldBuilder} from '../../../Testing';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<FamilyContainer />
			</Router>
		);
	}).not.toThrowError();
});

test ("Should show the validation erros on button click" ,async () => {
	const { getByText,getByTestId } = render(<Router><FamilyContainer /></Router>);
	fireEvent.click(getByText(/Continue/))
	await wait(() =>{
		expect(getByTestId('family-register')).toHaveTextContent('This field is required');
	});	
});

test ("Checking with values" ,async () => {
  let {container,getByText} = render(<Router><FamilyContainer /></Router>);
  const first_name = container.querySelector('input[name="first_name"]');
  const last_name = container.querySelector('input[name="last_name"]');
  const middle_name = container.querySelector('input[name="middle_name"]');
  const dob = container.querySelector('input[name="dob"]');
  const email = container.querySelector('input[name="email"]');
  const phno = container.querySelector('input[name="phone_number"]');
  let mockPrimary = mockPrimaryInfoBuilder();
  let mockHousehold = mockHouseHoldBuilder();
  let mockPass = mockPasswordBuilder();

  fireEvent.change(first_name,{target:{value:mockPrimary.firstName}});
  fireEvent.blur(first_name);
  fireEvent.change(last_name,{target:{value:mockPrimary.lastName}});
  fireEvent.blur(last_name);
  fireEvent.change(middle_name,{target:{value:mockPrimary.middleName}});
  fireEvent.blur(middle_name); 
  fireEvent.change(dob,{target:{value:mockPrimary.dob}});
  fireEvent.blur(dob); 
  fireEvent.change(container.querySelector('input[name="email"]'),{target:{value:mockPrimary.email}});
  fireEvent.blur(email); 
  fireEvent.change(container.querySelector('input[name="phone_number"]'),{target:{value:mockPrimary.phoneNumber}});
  fireEvent.blur(phno); 
  fireEvent.change(container.querySelector('input[name="street_address"]'),{target:{value:mockHousehold.streetAddress}});
  fireEvent.blur(container.querySelector('input[name="street_address"]')); 
  fireEvent.change(container.querySelector('input[name="apt_no"]'),{target:{value:mockHousehold.aptNo}});
  fireEvent.blur(container.querySelector('input[name="apt_no"]')); 
  fireEvent.change(container.querySelector('input[name="zip_code"]'),{target:{value:mockHousehold.zip}});
  fireEvent.blur(container.querySelector('input[name="zip_code"]'));
  fireEvent.change(container.querySelector('input[name="password"]'),{target:{value:mockPass.password}});
  fireEvent.blur(container.querySelector('input[name="password"]')); 
  fireEvent.change(container.querySelector('input[name="password_confirm"]'),{target:{value:mockPass.password}});
  fireEvent.blur(container.querySelector('input[name="password_confirm"]'));

	fireEvent.click(getByText('Continue'));
	await wait(() =>{		
		expect(getByText(/Are you sure you want to proceed/i));
	});

	fireEvent.click(getByText(/Cancel/i));
  await wait(() =>{		
	 expect(getByText(/Register Now./i));
  });

  fireEvent.click(getByText('Continue'));
  await wait(() =>{		
      expect(getByText(/Are you sure you want to proceed/i));

  });

  fireEvent.click(getByText('OK'));
  await wait(() =>{		
    expect(getByText(/Register Now./i));
  });
});

afterEach(cleanup)
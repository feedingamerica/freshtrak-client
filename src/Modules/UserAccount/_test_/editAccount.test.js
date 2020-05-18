import React from 'react';
import { render, fireEvent,wait,waitForElement} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import EditAccountComponent from '../EditAccountComponent';
import {mockPasswordBuilder,mockPrimaryInfoBuilder,  mockHouseHoldBuilder} from '../../../Testing';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<EditAccountComponent location={{ state: {page:'your-info'} }}/>
			</Router>
		);
	}).not.toThrowError();
});

test('should load Your Info page when props are passed', async()=>{

    const {container,getByText,queryByText,queryByTestId} = render(<Router><EditAccountComponent  location={{ state:{
		page: "your-info",
		title: "Edit Your Info",
		btntext: "Save Changes",
	  } }}/></Router>);
	expect(queryByTestId('title')).toHaveTextContent('Edit Your Info');
});

test('should load Pickup Info page when props are passed', async()=>{

    const {queryByTestId} = render(<Router><EditAccountComponent  location={{ state:{
		page: "pickup-info",
		title: "Your Pickup Info",
		btntext: "Continue",
	  } }}/></Router>);
	expect(queryByTestId('title')).toHaveTextContent('Your Pickup Info');
});
test('should load HouseHold page when props are passed', async()=>{

    const {queryByTestId} = render(<Router><EditAccountComponent  location={{ state:{
		page: "house-info",
		title: "Household Members",
		btntext: "Save Changes",
	  } }}/></Router>);
	expect(queryByTestId('title')).toHaveTextContent('Household Members');
});
test('should load Password page when props are passed', async()=>{

    const {queryByTestId} = render(<Router><EditAccountComponent  location={{ state:{
		page: "login-info",
		title: "Change Password",
		btntext: "Save New Password",
	  } }}/></Router>);
	expect(queryByTestId('title')).toHaveTextContent('Change Password');
});

test('should not show popup on clicking save details btn', async()=>{

    const {queryByText} = render(<Router><EditAccountComponent  location={{ state:{
		page: "your-info",
		title: "Edit Your Info",
		btntext: "Save Changes",
	  } }}/></Router>);

	fireEvent.click(queryByText('Save Changes'));
	await wait(()=>{
		expect(queryByText(/Are you sure you want to proceed/)).toBeNull();
	})
    
});

test('should  show popup on clicking save details btn after filling in details', async()=>{

    const {container,getByText,queryByText,baseElement} = render(<Router><EditAccountComponent  location={{ state:{
		page: "your-info",
		title: "Edit Your Info",
		btntext: "Save Changes",
	  } }}/></Router>);
	
	
  const first_name = container.querySelector('input[name="first_name"]');
  const last_name = container.querySelector('input[name="last_name"]');
  const middle_name = container.querySelector('input[name="middle_name"]');
  const dob = container.querySelector('input[name="dob"]');
  const email = container.querySelector('input[name="email"]');
  const phno = container.querySelector('input[name="phone_number"]');
  let mockPrimary = mockPrimaryInfoBuilder();
  let mockHousehold = mockHouseHoldBuilder();

  let fakeDOB = '1990-12-12';
  let fakePhNo = '9324562123';

  fireEvent.change(first_name,{target:{value:mockPrimary.firstName}});
  fireEvent.blur(first_name);
  fireEvent.change(last_name,{target:{value:mockPrimary.lastName}});
  fireEvent.blur(last_name);
  fireEvent.change(middle_name,{target:{value:mockPrimary.middleName}});
  fireEvent.blur(middle_name); 
  fireEvent.change(dob,{target:{value:fakeDOB}});
  fireEvent.blur(dob); 
  fireEvent.change(container.querySelector('input[name="email"]'),{target:{value:mockPrimary.email}});
  fireEvent.blur(email); 
  fireEvent.change(container.querySelector('input[name="phone_number"]'),{target:{value:fakePhNo}});
  fireEvent.blur(phno); 
  fireEvent.change(container.querySelector('input[name="street_address"]'),{target:{value:mockHousehold.streetAddress}});
  fireEvent.blur(container.querySelector('input[name="street_address"]')); 
  fireEvent.change(container.querySelector('input[name="apt_no"]'),{target:{value:mockHousehold.aptNo}});
  fireEvent.blur(container.querySelector('input[name="apt_no"]')); 
  fireEvent.change(container.querySelector('input[name="zip_code"]'),{target:{value:mockHousehold.zip}});
  fireEvent.blur(container.querySelector('input[name="zip_code"]'));











	fireEvent.click(queryByText('Save Changes'));
	await wait(()=>{
		expect(getByText(/Are you sure you want to proceed/));
	})
	fireEvent.click(getByText('Cancel'));
	expect(container).toHaveTextContent('Edit Your Info');

	fireEvent.click(getByText('Save Changes'));
	await wait(()=>{
		expect(getByText(/Are you sure you want to proceed/));
	});

	// Currently clicking Ok button has no function handling
	fireEvent.click(getByText('OK'));
	expect(container).toHaveTextContent('Edit Your Info');
});


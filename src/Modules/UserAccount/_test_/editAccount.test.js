import React from 'react';
import { render, fireEvent,wait,waitForElement} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import EditAccountComponent from '../EditAccountComponent';
import {mockPickUpBuilder,mockPrimaryInfoBuilder} from '../../../Testing';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<EditAccountComponent location={{ state: {page:'your-info'} }}/>
			</Router>
		);
	}).not.toThrowError();
});

test('should load correct page when props are passed', async()=>{

    const {container,getByText,queryByText,queryByTestId} = render(<Router><EditAccountComponent  location={{ state:{
		page: "your-info",
		title: "Edit Your Info",
		btntext: "Save Changes",
	  } }}/></Router>);
	
	expect(queryByTestId('title')).toHaveTextContent('Edit Your Info');
	
    
});



test('should not show popup on clicking save details btn', async()=>{

    const {container,getByText,queryByText} = render(<Router><EditAccountComponent  location={{ state:{
		page: "your-info",
		title: "Edit Your Info",
		btntext: "Save Changes",
	  } }}/></Router>);
	
	//   fireEvent.change(container.querySelector('input[name="first_name"]'),{target:{value:mockPrimaryInfoBuilder.firstName}});
	//   fireEvent.change(container.querySelector('input[name="last_name"]'),{target:{value:mockPrimaryInfoBuilder.lastName}});
	//   fireEvent.change(container.querySelector('input[name="middle_name"]'),{target:{value:mockPrimaryInfoBuilder.middleName}});
	//   fireEvent.change(container.querySelector('input[name="dob"]'),{target:{value:'1990-12-12'}});
	//   fireEvent.change(container.querySelector('input[name="email"]'),{target:{value:mockPrimaryInfoBuilder.email}});
	//   fireEvent.change(container.querySelector('input[name="street_address"]'),{target:mockPickUpBuilder.streetAddress});
	//   fireEvent.change(container.querySelector('input[name="apt_no"]'),{target:{value:mockPickUpBuilder.aptNo}});
	//   fireEvent.change(container.querySelector('input[name="zip_code"]'),{target:{value:mockPickUpBuilder.zip}});
	
	  
	fireEvent.click(queryByText('Save Changes'));
	await wait(()=>{
		expect(queryByText(/Are you sure you want to proceed/)).toBeNull();
	})
    
});

test('should  show popup on clicking save details btn after filling in details', async()=>{

    const {container,getByText,queryByText} = render(<Router><EditAccountComponent  location={{ state:{
		page: "your-info",
		title: "Edit Your Info",
		btntext: "Save Changes",
	  } }}/></Router>);
	
	  fireEvent.change(container.querySelector('input[name="first_name"]'),{target:{value:mockPrimaryInfoBuilder.firstName}});
	  fireEvent.change(container.querySelector('input[name="last_name"]'),{target:{value:mockPrimaryInfoBuilder.lastName}});
	  fireEvent.change(container.querySelector('input[name="middle_name"]'),{target:{value:mockPrimaryInfoBuilder.middleName}});
	  fireEvent.change(container.querySelector('input[name="dob"]'),{target:{value:'1990-12-12'}});
	  fireEvent.change(container.querySelector('input[name="email"]'),{target:{value:mockPrimaryInfoBuilder.email}});
	  fireEvent.change(container.querySelector('input[name="street_address"]'),{target:mockPickUpBuilder.streetAddress});
	  fireEvent.change(container.querySelector('input[name="apt_no"]'),{target:{value:mockPickUpBuilder.aptNo}});
	  fireEvent.change(container.querySelector('input[name="zip_code"]'),{target:{value:mockPickUpBuilder.zip}});
	
	  
	fireEvent.click(queryByText('Save Changes'));
	await wait(()=>{
		expect(queryByText(/Are you sure you want to proceed/));
	})
	fireEvent.click(getByText('Cancel'));
	expect(container).toHaveTextContent('Edit Your Info');

	fireEvent.click(queryByText('Save Changes'));
	await wait(()=>{
		expect(queryByText(/Are you sure you want to proceed/));
	})
	fireEvent.click(getByText('OK'));
	expect(container).toHaveTextContent('Edit Your Info');
});


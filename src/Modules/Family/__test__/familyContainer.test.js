import React from 'react';
import { render, fireEvent,wait,prettyDOM, waitFor,waitForElement,act} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FamilyContainer from '../FamilyContainer';
import {mockPasswordBuilder,mockPickUpBuilder,mockPrimaryInfoBuilder,  mockHouseHoldBuilder} from '../../../Testing';

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
	const {container, getByText,getByTestId } = render(<Router><FamilyContainer /></Router>);
    const zip_ode = container.querySelector('input[name="zipcode"]');
	const contact_email = container.querySelector('input[name="contact_email"]');
	fireEvent.click(getByText(/Continue/))
	await wait(() =>{
		expect(getByTestId('family-register')).toHaveTextContent('This field is required');
	});	
});
test("Data saving successful in button click",async()=>{
	const {container, getByText,getByTestId } = render(<Router><FamilyContainer /></Router>);

	let mockPrimaryData = mockPrimaryInfoBuilder();
	

	const first_name = container.querySelector('input[name="first_name"]');
	const last_name = container.querySelector('input[name="last_name"]');
	const middle_name = container.querySelector('input[name="middle_name"]');
	const dob = container.querySelector('input[name="dob"]');
	const email = container.querySelector('input[name="email"]');
	const phno = container.querySelector('input[name="phone_number"]');

    
	fireEvent.change(first_name, {target: {value: mockPrimaryData.firstName}});
	await waitFor(()=>{
        expect(first_name.value).toBe(mockPrimaryData.firstName);
    });
	fireEvent.change(last_name, {target: {value: mockPrimaryData.lastName}});
	await wait(()=>{
        expect(last_name.value).toBe(mockPrimaryData.lastName);
    });		
	fireEvent.change(middle_name, {target: {value: mockPrimaryData.middleName}});	
	await wait(()=>{
        expect(middle_name.value).toBe(mockPrimaryData.middleName);
    });	
	fireEvent.change(dob, {target: {value: mockPrimaryData.dob}});
	await wait(()=>{
        expect(middle_name.value).toBe(mockPrimaryData.middleName);
    });	
	/*fireEvent.change(email, {target: {value: mockPrimaryData.email}});*/	
	/*fireEvent.change(phno, {target: {value: mockPrimaryData.phoneNumber}});*/
	fireEvent.click(getByText(/Continue/));
	await wait(() =>{		
		expect(getByTestId('family-register')).toHaveTextContent('This field is requiredf');
	});

});

// test ("Checking with values" ,async () => {
//   let {container,getByText,queryByText} = render(<Router><FamilyContainer /></Router>);
  
//   let fakePwd = mockPasswordBuilder.password;

//   const first_name = container.querySelector('input[name="first_name"]');
//   const last_name = container.querySelector('input[name="last_name"]');
//   const middle_name = container.querySelector('input[name="middle_name"]');
//   const dob = container.querySelector('input[name="dob"]');
//   const email = container.querySelector('input[name="email"]');
//   const phno = container.querySelector('input[name="phone_number"]');

  
//   fireEvent.change(first_name,{target:{value:mockPrimaryInfoBuilder.firstName}});
//   fireEvent.change(last_name,{target:{value:mockPrimaryInfoBuilder.lastName}});
//   fireEvent.change(middle_name,{target:{value:mockPrimaryInfoBuilder.middleName}});
//   fireEvent.change(container.querySelector('input[name="dob"]'),{target:{value:'1990-12-12'}});
//   fireEvent.change(container.querySelector('input[name="email"]'),{target:{value:mockPrimaryInfoBuilder.email}});
//   fireEvent.change(container.querySelector('input[name="phone_number"]'),{target:{value:mockPrimaryInfoBuilder.phoneNumber}});
//   fireEvent.change(container.querySelector('input[name="street_address"]'),{target:{value:mockHouseHoldBuilder.streetAddress}});
//   fireEvent.change(container.querySelector('input[name="apt_no"]'),{target:{value:mockHouseHoldBuilder.aptNo}});
//   fireEvent.change(container.querySelector('input[name="zip_code"]'),{target:{value:mockHouseHoldBuilder.zip}});
//   fireEvent.change(container.querySelector('input[name="password"]'),{target:{value:fakePwd}});
//   fireEvent.change(container.querySelector('input[name="passwordConfirm"]'),{target:{value:fakePwd}});

//       fireEvent.click(queryByText('Continue'));
//       // act(() => jest.advanceTimersByTime(7000))
//         expect(getByText('Are you sure you want to proceed?'))
//         fireEvent.click(getByText('Cancel'))
//         expect(getByText(/Register Now./i))
//     // await waitForElement(() =>{	expect(getByText('Are you sure you want to proceed?'));},{container});


//     // fireEvent.click(getByText('Cancel'));
//     // await wait(() =>{		
// 		// expect(getByText(/Register Now./i));
//     // });
//     // fireEvent.click(getByText('Continue'));
//     // await wait(() =>{		
//     //     expect(getByText(/Are you sure you want to proceed/i));
  
//     // });
//     // fireEvent.click(getByText('OK'));
//     // await wait(() =>{		
//     //   expect(getByText(/Register Now./i));
//     //   });
// });
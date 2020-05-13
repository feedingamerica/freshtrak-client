import React from 'react';
import { render, fireEvent,wait,prettyDOM, waitForDomChange,waitForElement,act} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FamilyContainer from '../FamilyContainer';
import {mockPasswordBuilder,mockPickUpBuilder,mockPrimaryInfoBuilder, mockHouseHold, mockHouseHoldBuilder} from '../../../Testing';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<FamilyContainer/>
			</Router>
		);
	}).not.toThrowError();
});

test ("Checking without values" ,async () => {
    let {container,queryByText,getByText} = render(<Router><FamilyContainer /></Router>);


    let continueBtn = queryByText('Continue');
    fireEvent.click(continueBtn);
    await wait(() =>{		
        expect(queryByText(/Are you sure you want to proceed/i)).toBeNull();

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
import React from 'react';
import { render, fireEvent,wait} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FamilyContainer from '../FamilyContainer';
import {mockPasswordBuilder,mockPickUpBuilder,mockPrimaryInfoBuilder} from '../../../Testing';

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
//   let {container,getByText} = render(<Router><FamilyContainer /></Router>);
  
//   let fakePwd = mockPasswordBuilder.password;

//   fireEvent.change(container.querySelector('input[name="first_name"]'),{target:{value:mockPrimaryInfoBuilder.firstName}});
//   fireEvent.change(container.querySelector('input[name="last_name"]'),{target:{value:mockPrimaryInfoBuilder.lastName}});
//   fireEvent.change(container.querySelector('input[name="middle_name"]'),{target:{value:mockPrimaryInfoBuilder.middleName}});
//   fireEvent.change(container.querySelector('input[name="dob"]'),{target:{value:'1990-12-12'}});
//   fireEvent.change(container.querySelector('input[name="email"]'),{target:{value:mockPrimaryInfoBuilder.email}});
//   fireEvent.change(container.querySelector('input[name="street_address"]'),{target:mockPickUpBuilder.streetAddress});
//   fireEvent.change(container.querySelector('input[name="apt_no"]'),{target:{value:mockPickUpBuilder.aptNo}});
//   fireEvent.change(container.querySelector('input[name="zip_code"]'),{target:{value:mockPickUpBuilder.zip}});
//   fireEvent.change(container.querySelector('input[name="password"]'),{target:{value:fakePwd}});
//   fireEvent.change(container.querySelector('input[name="passwordConfirm"]'),{target:{value:fakePwd}});

  
//   let continueBtn = getByText('Continue');
//   fireEvent.click(continueBtn);
//   await wait(() =>{		
//       expect(getByText(/Are you sure you want to proceed/i));

//   });
   
//     fireEvent.click(getByText('Cancel'));
//     await wait(() =>{		
// 		expect(getByText(/Register Now./i));
//     });
//     fireEvent.click(continueBtn);
//     await wait(() =>{		
//         expect(getByText(/Are you sure you want to proceed/i));
  
//     });
//     fireEvent.click(getByText('OK'));
//     await wait(() =>{		
//       expect(getByText(/Register Now./i));
//       });
// },10000);
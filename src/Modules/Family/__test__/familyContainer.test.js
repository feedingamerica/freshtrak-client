import React from 'react';
import { render, fireEvent,wait,waitForElement, getByDisplayValue, queryByText, getAllByText, getByLabelText} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FamilyContainer from '../FamilyContainer';
import {fake,oneOf} from 'test-data-bot';

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


test ("Checking with values" ,async () => {
  let {container,getByText} = render(<Router><FamilyContainer /></Router>);

  fireEvent.change(container.querySelector('input[name="first_name"]'),{target:{value:fake(f=>f.name.firstName()).generate(1)}});
  fireEvent.change(container.querySelector('input[name="last_name"]'),{target:{value:fake(f=>f.name.lastName()).generate(1)}});
  fireEvent.change(container.querySelector('input[name="middle_name"]'),{target:{value:fake(f=>f.name.lastName()).generate(1)}});
  fireEvent.change(container.querySelector('input[name="dob"]'),{target:{value:'1990-12-12'}});
  fireEvent.change(container.querySelector('input[name="email"]'),{target:{value:'askdasaswsj@gmail.com'}});
  fireEvent.change(container.querySelector('input[name="street_address"]'),{target:fake(f=>f.address.streetAddress().generate(1))});
  fireEvent.change(container.querySelector('input[name="apt_no"]'),{target:{value:'112'}});
  fireEvent.change(container.querySelector('input[name="zip_code"]'),{target:{value:'23623'}});
  fireEvent.change(container.querySelector('input[name="password"]'),{target:{value:'aaa'}});
  fireEvent.change(container.querySelector('input[name="passwordConfirm"]'),{target:{value:'aaa'}});

  
  let continueBtn = getByText('Continue');
  fireEvent.click(continueBtn);
  await wait(() =>{		
      expect(getByText(/Are you sure you want to proceed/i));

  });
   
    fireEvent.click(getByText('Cancel'));
    await wait(() =>{		
		expect(getByText(/Register Now./i));
    });

});
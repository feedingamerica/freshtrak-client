import React from 'react';
import { render, fireEvent,wait,waitForElement, getByDisplayValue, queryByText, getAllByText} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import FamilyContainer from '../FamilyContainer';

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
    let {container,queryByText} = render(<Router><FamilyContainer /></Router>);


    let continueBtn = queryByText('Continue');
    fireEvent.click(continueBtn);
    await wait(() =>{		
        expect(queryByText(/Are you sure you want to proceed/i));

    });
        

    
});


test ("Checking with values" ,async () => {
  let {container,getByText,getAllByText} = render(<Router><FamilyContainer /></Router>);

  
  let continueBtn = getByText('Continue');
  fireEvent.click(continueBtn);
  await wait(() =>{		
      expect(getByText(/Are you sure you want to proceed/i));

  });
   
    fireEvent.click(getAllByText('OK'));
    await wait(() =>{		
		expect(getByText(/Register Now./i));
    });

});
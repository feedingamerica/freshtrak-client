import React from 'react';
import { render, fireEvent,wait,waitForElement} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import EditAccountComponent from '../EditAccountComponent';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<EditAccountComponent/>
			</Router>
		);
	}).not.toThrowError();
});

test('should not show popup on clicking save details btn', async()=>{

    const {container,getByText,queryByText} = render(<Router><EditAccountComponent/></Router>);

    fireEvent.click(queryByText(/Continue/i));
    
});


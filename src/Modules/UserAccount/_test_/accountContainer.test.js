import React from 'react';
import { render, fireEvent,wait} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import AccountOverviewContainer from '../AccountOverviewContainer';
import {mockPasswordBuilder,mockPickUpBuilder,mockPrimaryInfoBuilder} from '../../../Testing';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<AccountOverviewContainer/>
			</Router>
		);
	}).not.toThrowError();
});


test('should render components on clicking Edit link', async() => {
const {getByText,container,getByTestId} = render(<Router><AccountOverviewContainer/></Router>);
fireEvent.click(getByTestId('your-info-edit-btn'));
await wait(()=>{
    expect(container).toHaveTextContent('Edit Your Info');
});


});

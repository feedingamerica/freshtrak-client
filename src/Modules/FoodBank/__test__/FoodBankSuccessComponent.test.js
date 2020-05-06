import React from 'react';
import { render, fireEvent,wait ,screen} from '@testing-library/react';
import { BrowserRouter as Router,useHistory } from 'react-router-dom';
import FoodBankSuccessComponent from './../FoodBankSuccessComponent';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
test('should render foodbank contact info', () => {
	expect(() => {
		render(
			<Router>
			<FoodBankSuccessComponent />
			</Router>
		);
	}).not.toThrowError();
});
test("Checking whether the button click functionality",async() =>{
	const history = createMemoryHistory();
	const { container,getByTestId,getByText } = render(<Router><FoodBankSuccessComponent /></Router>)
	fireEvent.click(getByText(/Back to Home/i));
	await wait(() =>{
		expect(history.location.pathname).toBe("/");
	});
})


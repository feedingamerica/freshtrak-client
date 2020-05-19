import React from 'react';
import { render, fireEvent,wait} from '@testing-library/react';
import TimeSlotDetailsComponent from './../TimeSlotDetailsComponent';
import { noop, preformattedEventData} from '../../../Testing';
import {BrowserRouter as Router} from 'react-router-dom';

test('Time slot container should render', () => {
	expect(() => {
		render(<Router>
					<TimeSlotDetailsComponent eventDetails={noop}					
					/>
				</Router>
		);
	}).not.toThrowError();
});
test('should render with data provided', async () => {
	const {container,getByText} = render(<Router>
				<TimeSlotDetailsComponent
					eventDetails={preformattedEventData}
				/>
				</Router>);
	await wait(() => {
		getByText(`${preformattedEventData.agencyName}`);		
	});

	const reserveTime = container.querySelector('select[name="reserveTime"]');
	
	fireEvent.change(reserveTime, {target: {value: 30600}});
	await wait(() =>{
		expect(reserveTime.value).toBe("30600");
	});
});
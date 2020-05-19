import React from 'react';
import { render, fireEvent,wait} from '@testing-library/react';
import TimeSlotDetailsComponent from './../TimeSlotDetailsComponent';
import { noop, preformattedEventData} from '../../../Testing';

test('Time slot container should render', () => {
	expect(() => {
		render(
			<TimeSlotDetailsComponent
			eventDetails={noop}
			/>
		);
	}).not.toThrowError();
});
test('should render with data provided', async () => {
	const {getByText} = render(
				<TimeSlotDetailsComponent
					eventDetails={preformattedEventData}
				/>
				);
	await wait(() => {
		getByText(`${preformattedEventData.agencyName}`);		
	});
});
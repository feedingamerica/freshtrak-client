import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import AccountOverviewContainer from '../AccountOverviewContainer';

test('should be able to click Edit button', async() => {
	const {container,getByTestId} = render(
		<Router>
			<AccountOverviewContainer />
		</Router>
    );

    expect(getByTestId('house-info-edit-btn')).toBeTruthy();
    getByTestId('house-info-edit-btn')

    fireEvent.click(getByTestId('house-info-edit-btn'));        
});
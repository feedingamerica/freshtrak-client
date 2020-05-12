import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import AccountOverviewContainer from '../AccountOverviewContainer';

test('should be able to click Edit button', async() => {

		const {getByTestId} = render(
			<Router>
				<AccountOverviewContainer />
			</Router>
        );
        expect(getByTestId('login-info-edit-btn')).toBeTruthy();
        getByTestId('login-info-edit-btn')
        
        fireEvent.click(getByTestId('login-info-edit-btn'));
        
});
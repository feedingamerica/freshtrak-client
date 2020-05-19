import React from 'react';
import { render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import AccountOverviewContainer from '../AccountOverviewContainer';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<AccountOverviewContainer/>
			</Router>
		);
	}).not.toThrowError();
});




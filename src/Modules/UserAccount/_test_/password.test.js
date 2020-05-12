import React from 'react';
import { render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import ChangePasswordComponent from '../ChangePasswordComponent';

test('should render', () => {
	expect(() => {
		render(
			<Router>
				<ChangePasswordComponent/>
			</Router>
		);
	}).not.toThrowError();
});




import React from 'react';
import { render } from '@testing-library/react';
import FoodBankRegistrationComponent from './../FoodBankRegistrationComponent';
import ReactDOM from 'react-dom';
test('Render without crashing',()=>{
	const div = document.createElement('div');
	ReactDOM.render(<FoodBankRegistrationComponent/>,div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import BoxComponent from './../BoxComponent';
import { render} from '@testing-library/react';
import PreRegisteredIcon from '../../../Assets/img/pre-register.svg';

test('Render without crashing',()=>{
	const div = document.createElement('div');
	ReactDOM.render(<BoxComponent title = "test-content" content = "test dummy content." imageUrl ={PreRegisteredIcon} className ="test-class"/>,div);
});

test("render button correctly without props values",()=>{
	const {getByTestId} = render(<BoxComponent />);
	expect(getByTestId('box-component')).toHaveTextContent('click here');
});

test("render button correctly with the props values",()=>{
	const {getByTestId} = render(<BoxComponent title = "test-content" content = "test dummy content." imageUrl ={PreRegisteredIcon} className ="test-class"/>);
	expect(getByTestId('box-component')).toHaveTextContent('test-content');
});

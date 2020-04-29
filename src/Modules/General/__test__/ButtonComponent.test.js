import React from 'react';
import ButtonComponent from './../ButtonComponent';
import { render} from '@testing-library/react';
import {fake} from 'test-data-bot';

describe ("Checking wheather the button component loads correctly",()=>{	
	const className = String(fake(f => f.random.word()));
	const inputName = String(fake(f => f.random.word()));
	const btnId = String(fake(f => f.random.word()));
	const btnValue = String(fake(f => f.random.word()));
	const mockFun = ()=>{};
	const {getByTestId} = render(<ButtonComponent type ='button' name={inputName} dataid= '' id={btnId} value={btnValue} className = {className} onClickfunction={mockFun}/>);
	test("render button correctly",()=>{
		expect(getByTestId('button')).toHaveTextContent(btnValue);
	})
});
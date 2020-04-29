import React from 'react';
import ReactDOM from 'react-dom';
import BoxComponent from './../BoxComponent';
import { render} from '@testing-library/react';
import {fake} from 'test-data-bot';
test("render button correctly without props values",()=>{
	const {getByTestId} = render(<BoxComponent />);
	expect(getByTestId('box-component')).toHaveTextContent('click here');
});

test("render button correctly with the props values",()=> {
    const titleName = String(fake(f => f.random.word()));
	const content = String(fake(f => f.random.word()));
	const imgUrl = String(fake(f => f.internet.url()));
	const className = String(fake(f => f.random.word()));
	const {getByTestId} = render(<BoxComponent title = {titleName} content = {content} imageUrl ={imgUrl} className ={className} />);
	expect(getByTestId('box-component')).toHaveTextContent(titleName);
});

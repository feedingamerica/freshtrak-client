import React from 'react';
import ReactDOM from 'react-dom';
import ButtonComponent from './../ButtonComponent';
import { render} from '@testing-library/react';

test('Render without crashing',()=>{
	const div = document.createElement('div');
	ReactDOM.render(<ButtonComponent type ='button' name="testbutton" dataid= '' id="test-id" value="test-button" className = 'test-button' onClickfunction={()=>{}}/>,div);
});

test("render button correctly",()=>{
	const {getByTestId} = render(<ButtonComponent type ='button' name="testbutton" dataid= '' id="testid" value="test-button" className = 'test-button' onClickfunction={()=>{}}/>);
	expect(getByTestId('button')).toHaveTextContent('test-button');
});

test("render button correctly",()=>{
	const {getByTestId} = render(<ButtonComponent type ='submit' name="testsubmitbutton" dataid= '' id="submit-test" value="submit-test-button" className = 'submit-test-button' onClickfunction={()=>{}}/>);
	expect(getByTestId('button')).toHaveTextContent('submit-test-button');
});


import React from 'react';
import ButtonComponent from '../../General/ButtonComponent'
const CheckboxQstnComponent = (props) => {
let {qstn} = props.content;
    return (
		<>
			<h2 style={{marginTop:'100px',wordBreak:'break-all'}}> {qstn} </h2>

		<input type="checkbox"  />Working for pay full-time   (30 hours per week or more)
			
		</>
    )

};

export default CheckboxQstnComponent;

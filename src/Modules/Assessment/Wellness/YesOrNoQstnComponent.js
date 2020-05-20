
import React from 'react';
import ButtonComponent from '../../General/ButtonComponent'
const YesOrNoQstnComponent = (props) => {
let {qstn} = props.content;
    return (
		<>
			<h2 style={{marginTop:'100px',wordBreak:'break-all'}}> {qstn} </h2>

			<ButtonComponent name="yes_or_no" value="Yes" className = 'btn custom-button search-button' onClickfunction={()=>{}} />
			<ButtonComponent name="yes_or_no" value="No" className = 'btn custom-button search-button' onClickfunction={()=>{}} />
		</>
    )

};

export default YesOrNoQstnComponent;

import React,{useState} from 'react';

const RangeQstnComponent = (props) => {
	let {qstn,note,start_value,end_value,money,step} = props.content;
	const [currVal,setCurrVal] = useState(start_value);

	const showSliderValue = (e)=>{
		setCurrVal(e.target.value)
	}
    return (
		<>
		<div style={{marginTop:'100px',wordBreak:'break-all'}}>
			<h2> 
			What was the total combined income of all members of your family who are 15 years of age or older during the last month?
			</h2>
			<p>
			 Please include money from things such as jobs, net income from business, pensions, social security payments, and any other money income received.
			 </p>

			 <h3>{money? `$${Number(currVal)} - $${Number(currVal)+step}`: currVal}</h3>
			 <input type="range" onChange={(e)=>showSliderValue(e)} min={start_value} max={end_value} step={step} value={currVal} />
			
		</div>
		</>
    )

};

export default RangeQstnComponent;

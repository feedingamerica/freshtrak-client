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
			{qstn}
			</h2>
			<p>
			{note}
			 </p>

			 <h3>{money? `$${Number(currVal)} - $${Number(currVal)+step}`: currVal}</h3>
			 <input type="range" onChange={(e)=>showSliderValue(e)} min={start_value} max={end_value} step={step} value={currVal} />
			
		</div>
		</>
    )

};

export default RangeQstnComponent;

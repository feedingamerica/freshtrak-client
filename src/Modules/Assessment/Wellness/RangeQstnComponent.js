import React,{useState} from 'react';

const RangeQstnComponent = (props) => {
	let {qstn,note,id, start_value,end_value,money,step} = props.content;
	const [currVal,setCurrVal] = useState(start_value);

	const showSliderValue = (e)=>{
		setCurrVal(e.target.value)
	}
    return (
		<>
		  <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                            
		 <div className="a-c-content flex-grow-1">
            <span className="font-weight-bold">{qstn} </span>
            <p className="mt-2">{note}</p>
           </div>
         <div className="ac-slider">
          <h3>{money? `$${Number(currVal)} - $${Number(currVal)+step}`: currVal}</h3>
		  <input type="range" onChange={(e)=>showSliderValue(e)} min={start_value} max={end_value} step={step} value={currVal} />
			
 	     </div>
 	     </div>
 	     
		</>
    )

};                          

export default RangeQstnComponent;

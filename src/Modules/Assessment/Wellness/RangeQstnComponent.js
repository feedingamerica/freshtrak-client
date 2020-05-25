import React,{useState,useContext} from 'react';
import WellnessContext from './WellnessContext';
const RangeQstnComponent = (props) => {
	let {qstn,note,id, start_value,end_value,money,step} = props.content;
	const [currVal,setCurrVal] = useState(start_value);
	let context = useContext(WellnessContext);

	const showSliderValue = (e)=>{
		setCurrVal(e.target.value)
		Object.keys(context.answers).map((value,index)=>{
	if(value == id) context.answers[value] =  money?`$${Number(e.target.value)} - $${Number(e.target.value)+step}`: e.target.value
});
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

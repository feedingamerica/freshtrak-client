import React,{useState,useContext, useEffect} from 'react';
import WellnessContext from './WellnessContext';
const RangeQstnComponent = (props) => {
	//console.log("props are>>",props)
	let {question,
		description,
		id, 
		option_start_value,
		option_end_value,
		is_money,step} = props.content;
	
	let context = useContext(WellnessContext);
	const [currVal,setCurrVal] = useState(option_start_value);

	const showSliderValue = (e)=>{
		if(e && e.target && e.target.value){
			setCurrVal(e.target.value)
			Object.keys(context.answers).map((value,index)=>{
		if(value == id-1) {
			context.answers[value] =  is_money?`$${Number(e.target.value)} - $${Number(e.target.value)+step}`: e.target.value}
	});
		}
		
	}
	useEffect(()=>{
		if(context.answers[id-1] !== ""){
			
			if(context.answers[id-1].length <=2){
				setCurrVal(context.answers[id-1]);
			}
			else{
			setCurrVal(context.answers[id-1].slice(1,5));
		}

		}
		else{
			setCurrVal(props.content.option_start_value);
		}
		
	},[props.content])




    return (
		<>
		  <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                            
		 <div className="a-c-content flex-grow-1">
            <span className="font-weight-bold">{question} </span>
            <p className="mt-2">{description}</p>
           </div>
         <div className="ac-slider">
          <h3>{is_money? `$${Number(currVal)} - $${Number(currVal)+step}`: currVal}</h3>
		  <input type="range" onChange={(e)=>showSliderValue(e)} min={option_start_value} max={is_money? option_end_value - step : option_end_value} step={step} value={currVal} />
			
 	     </div>
 	     </div>
 	     
		</>
    )

};                          

export default RangeQstnComponent;

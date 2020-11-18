import React,{useState,useContext, useEffect} from 'react';
import WellnessContext from './WellnessContext';
const RangeQstnComponent = (props) => {
	let {question,description,id, option_start_value,option_end_value,is_money,step} = props.content;
	const [currVal,setCurrVal] = useState(option_start_value);
	//const [currVal,setCurrVal] = useState(0);
	let context = useContext(WellnessContext);

	const showSliderValue = (e)=>{
		if(e && e.target && e.target.value){
			setCurrVal(e.target.value)
			Object.keys(context.answers).map((value,index)=>{
		if(value == id-1) context.answers[value] =  is_money?`$${Number(e.target.value)} - $${Number(e.target.value)+step}`: e.target.value
		console.log("answer recorded>>",context.answers[value])
	});
		}
		
	}
	useEffect(()=>{
		//setCurrVal(option_start_value);
		console.log("props.content in range qstn cmpnt is >>",props.content.option_start_value)
		console.log("currVal is >>",currVal)
	})




    return (
		<>
		  <div className="assesment-content flex-grow-1 flex-column justify-content-between d-flex mt-3 mb-3">
                            
		 <div className="a-c-content flex-grow-1">
            <span className="font-weight-bold">{question} </span>
            <p className="mt-2">{description}</p>
           </div>
         <div className="ac-slider">
          <h3>{is_money? `$${Number(currVal)} - $${Number(currVal)+step}`: currVal}</h3>
		  <input type="range" onChange={(e)=>showSliderValue(e)} min={option_start_value} max={option_end_value} step={step} value={currVal} />
			
 	     </div>
 	     </div>
 	     
		</>
    )

};                          

export default RangeQstnComponent;

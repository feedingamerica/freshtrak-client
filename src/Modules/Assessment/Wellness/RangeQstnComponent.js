import React,{useState,useContext, useEffect} from 'react';
import WellnessContext from './WellnessContext';
const RangeQstnComponent = (props) => {
	let {question,
		description,
		assessment_qn_id, 
		option_start_value, 
		option_end_value,
		go_to_page,
		next_page,
		is_money,step} = props.content;
	
	const context = useContext(WellnessContext);
	const [currVal,setCurrVal] = useState(option_start_value);

	const showSliderValue = (e)=>{
		if(e.target.value){
			setCurrVal(e.target.value)
			context.answers[assessment_qn_id-1] =  is_money?`$${Number(e.target.value)} - $${Number(e.target.value)+step}`: e.target.value
	
		}
		
	}
	useEffect(()=>{
		context.go_to_page[assessment_qn_id-1] = go_to_page && go_to_page[0] ? go_to_page[0]-1 : null;
		if(context.previous.indexOf(assessment_qn_id-1) === -1){
			context.previous.push(assessment_qn_id-1);
	}
		context.next_page[assessment_qn_id-1] = next_page-1;
		if(context.answers[assessment_qn_id-1] !== " " && context.answers[assessment_qn_id-1] !== undefined && context.answers[assessment_qn_id-1] !== []){
			
			if(context.answers[assessment_qn_id-1].length <=2){
				setCurrVal(context.answers[assessment_qn_id-1]);
			}
			else{
			setCurrVal(context.answers[assessment_qn_id-1].slice(1,5));
		}

		}
		else{
			setCurrVal(props.content.option_start_value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[assessment_qn_id])




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

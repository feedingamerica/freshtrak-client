import React, { useContext } from 'react';
import WellnessContext from './WellnessContext';


const BeginAssessComponent = (props) => {
	let context = useContext(WellnessContext);
	return ( 
    	<>
	        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
		<div className="small-text">{context.total_questions} Questions</div> 
		        <div className="small-text text-right">Esimated Time: {context.beginAssessmentData.duration} Min</div>
		    </div>

	        <div className = "assesment-content d-flex mt-3 mb-3" >
		<span className="font-weight-bold">{context.beginAssessmentData.name}</span>
	
	        </div> 
					<div className = "assesment-content d-flex mt-3 mb-3" >
		<span className="font-weight-bold">{context.beginAssessmentData.description}</span>
	
	        </div> 
        </>
    )
};

export default BeginAssessComponent;
import React, { useContext } from 'react';

const BeginAssessComponent = (props) => {

    return ( 
    	<>
	        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
		        <div className="small-text">10 Questions</div> 
		        <div className="small-text text-right">Esimated Time: 10 Min</div>
		    </div>

	        <div className = "assesment-content d-flex mt-3 mb-3" >
	        <span className="font-weight-bold">Thanks for taking the Wellness Assessment. We are going to ask about your current life circumstances to help match you with the best programs and organizations to supplement your wellness.</span> 
	        </div> 
        </>
    )

};

export default BeginAssessComponent;
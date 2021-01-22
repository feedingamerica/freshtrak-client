import React, { useContext,useState,useEffect } from 'react';
import {ASSESSMENT_URL} from '../../../Utils/Urls';
import WellnessContext from './WellnessContext';
import axios from 'axios';
import moment from 'moment';


const BeginAssessComponent = (props) => {
	const [firstCardData,setfirstCardData] = useState(null);
	let context = useContext(WellnessContext);


const setAssessmentData = async() => {
	let assessmentUri = ASSESSMENT_URL.FIRST_CARD;
	try {
		const resp = await axios.get(assessmentUri);
		// console.log("RESP FOR FIRST CARD IS>>",resp)
		 
		if(resp && resp.data && 
			resp.data.data !== null){
				//console.log("RESP.data.data.desc>>",resp.data.data.description)
				// console.log("RESP.data.data>>",resp.data.data)
				// console.log("RESP.data.data.name>>",resp.data.data.name)
			setfirstCardData(resp.data.data)
			context.assessmentTitle = resp.data.data.name;
		}
		
	} catch (err) {
		console.log("ERROR LOADING FIRST CARD DATA",err)
	}
};
	    
useEffect(() => {
	setAssessmentData()
	setfirstCardData()
	context.start_time = moment().format('YYYY-MM-DD hh:mm');
},[]);
//console.log("firstCardData is>>",firstCardData)
    return ( 
    	<>
	        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
		<div className="small-text">{firstCardData !==null && firstCardData !== undefined ? firstCardData.total_question : " "} Questions</div> 
		        <div className="small-text text-right">Esimated Time: {firstCardData !==null && firstCardData !== undefined ? firstCardData.duration : " "} Min</div>
		    </div>

	        <div className = "assesment-content d-flex mt-3 mb-3" >
		<span className="font-weight-bold">{firstCardData !==null && firstCardData !== undefined ? firstCardData.description : " "}</span> 
	        </div> 
        </>
    )

};

export default BeginAssessComponent;
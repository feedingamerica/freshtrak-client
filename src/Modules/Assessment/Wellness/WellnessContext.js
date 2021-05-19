import React from "react";


const WellnessContext = React.createContext({

	assessment_id: null,
	total_questions : null,
	beginAssessmentData :{},
	question_source_id : null,
	start_time: null,
	assessmentTitle : "",
	previous : [],
	next_page : [],
	answers : [],
	isSkipped : [],
	option_id : [],
	go_to_page : []
});



export default WellnessContext;

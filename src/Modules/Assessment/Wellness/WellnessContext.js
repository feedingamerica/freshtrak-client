import React from "react";


const WellnessContext = React.createContext({

	assessment_id: 1,
	start_time: null,
	answers : {
		
		0:"",
		1:"",
		2:"",
		3:``,
		4:``,
		5:[],
		6:``,
		7:``,
		8:``,
		9:``,
		10:``,
		11:``,
		12:[],
		13:[]

		

	}
});



export default WellnessContext;

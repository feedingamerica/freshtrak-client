import React from "react";


const WellnessContext = React.createContext({

	assessment_id: 1,
	start_time: null,
	assessmentTitle : "",
	previous_page : [],
	next_page : [],
	answers : [],

	// option_id : {
	// 	0:[],
	// 	1:[],
	// 	2:[],
	// 	3:[],
	// 	4:[],
	// 	5:[],
	// 	6:[],
	// 	7:[],
	// 	8:[],
	// 	9:[],
	// 	10:[],
	// 	11:[],
	// 	12:[],
	// 	13:[],
	// },
	option_id : [],
	go_to_page : []
});



export default WellnessContext;

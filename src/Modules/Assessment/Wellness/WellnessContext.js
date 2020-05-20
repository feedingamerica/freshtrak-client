import React from "react";


const WellnessContext = React.createContext({

	qstns:{
		meals:{
			id:1,
			qstn:`How many meals did you miss last week because you could not make ends meet?`,
			note:``,
			start_value:0,
			end_value:20,
			money:false,
			step:1
		},
		monthlyIncome:{
			id:2,
			qstn:`What was the total combined income of all members of your family who are 15 years of age or older during the last month? `,
			note:`Please include money from things such as jobs, net income from business, pensions, social security payments, and any other money income received.`,
			start_value:0,
			end_value:10000,
			money:true,
			step:1000
		},
		annualIncome:{
			id:3,
			qstn:`What was the total combined income of all members of your family who are 15 years of age or older during the last 12 months?`,
			note:`Please include money from things such as jobs, net income from business, pensions, social security payments, and any other money income received.`,
			start_value:0,
			end_value:100000,
			money:true,
			step:15000
		},
		covid:{
			id:4,
			qstn:`Has your job or a household member’s job been impact by the Covid-19 crisis?`,


		},
		jobExpect:{
			id:5,
			qstn:`Do you expect this job to return in the future? `,


		},
		moneySources:{
			id:6,
			qstn:`Did you or did anyone in your household get money in the last month from any of the following sources? `,
			note:`You can choose more than one.`
		},
		mainInsurance:{
			id:7,
			qstn:`What is your main insurance?`,
			note:`Select one of the following`,
			options:['None/Uninsured','Medicaid','CHIP Medicaid','Medicare','Other public insurance (Not CHIP)'
					,'Other public insurance (CHIP)','Private Insurance']
		},
		insuranceReferral:{
			id:8,
			qstn:`Would you like a referral to get health insurance? `
		},
		currInsurer:{
			id:9,
			qstn:`Who is your current insurer?`,
			note:`Select one of the following`,
			options:['Molina','CareSource','United Healthcare','Paramount','Buckeye',`Don't Know`]
		},
		doctor:{
			id:10,
			qstn:`Do you have a doctor or other healthcare provider that you regularly see?`
		},
		doctorReferral:{
			id:11,
			qstn:`Would you like a referral to a doctor or other healthcare provider?`
		},
		addSupport:{
			id:12,
			qstn:`Would you like a referral for additional support services? `,
		},

		

	},
	answers:{

		
		
		
		1:{},
		2:{},
		3:{},
		4:``,
		5:``,
		6:{},
		7:``,
		8:``,
		9:``,
		10:``,
		11:``,
		12:``
		

	}
});



export default WellnessContext;

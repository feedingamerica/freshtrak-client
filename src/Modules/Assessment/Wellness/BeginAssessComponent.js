
import React,{useContext} from 'react';
import WellnessContext from './WellnessContext';

const BeginAssessComponent = (props) => {

const wellnessContext = useContext(WellnessContext);
console.log(wellnessContext)
    return (
		<>
			<h2 style={{marginTop:'100px'}}> BeginAssessComponent</h2>
		</>
    )

};

export default BeginAssessComponent;

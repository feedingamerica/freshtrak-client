import React,{useContext,useState} from 'react';
import WellnessContainer from '../Assessment/Wellness/WellnessContainer';
import WellnessContext from '../Assessment/Wellness/WellnessContext';
import moment from 'moment';
const TakeTheAssessmentComponent = () => {
	let context = useContext(WellnessContext);
	const [showModal, setShowModal] = useState(false);
	const authToken = localStorage.getItem('authToken');
	const triggerAssessment=()=> {
	    if(authToken && context.beginAssessmentData){
	      setShowModal(true)
	      context.start_time = moment().format('YYYY-MM-DD hh:mm');
	    }
  }
  return ( <div>
    <div className="take-the-assessment-wrapper d-flex flex-column justify-content-center align-items-center pl-4 pr-4">
      <h1>We’re here to help you find what you need.</h1>
      <p>Take 10 minute assessment to help us find more resources that fit your needs.</p>
      <button className="btn default-button font-weight-bold"onClick={()=>triggerAssessment()} >Take the Assessment</button>
    </div>
    {showModal && <WellnessContainer closeModal={()=>setShowModal(false)}/>}
    </div>
  );
};
export default TakeTheAssessmentComponent;

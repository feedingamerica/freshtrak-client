import React,{useContext,useState} from 'react';
import WellnessContainer from '../Assessment/Wellness/WellnessContainer';
import WellnessContext from '../Assessment/Wellness/WellnessContext';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {API_URL} from '../../Utils/Urls';
import axios from 'axios';
import { selectUser } from '../../Store/userSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import { showToast } from '../Notifications/NotifyToastComponent';

const TakeTheAssessmentComponent = () => {
	let context = useContext(WellnessContext);
	const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
	const authToken = localStorage.getItem('authToken');
  const currentUser = useSelector(selectUser);

  const setAssessmentData = async() => {
    setLoading(true)
    let assessmentUri = API_URL.TRIGGER_ASSESSMENT;
    let zip = currentUser && currentUser.zip_code;
    try {
      const resp = await axios.get(assessmentUri, {
        params: { zip_code: zip}
    });
         
        if(resp && resp.data && 
            resp.data.data){
            context.beginAssessmentData = resp.data.data;
            context.total_questions = resp.data.data.total_question;
        if(Object.keys(context.beginAssessmentData).length !== 0){
          setShowModal(true)
          context.start_time = moment().format('YYYY-MM-DD hh:mm'); 
        }
          }
          else{
            let msg = "No assessment available for you.";
            showToast(msg,'error');
          }
        setLoading(false)
    } catch (err) {
        setLoading(false)
        let msg = "Error loading Assessment Data.";
        showToast(msg,'error');
        console.log("ERROR LOADING ASSESSMENT DATA",err)
    }

  };
	const triggerAssessment=()=> {
	    if(authToken){
        setAssessmentData()
	    }
  }
  return ( <div>
    <div className="take-the-assessment-wrapper d-flex flex-column justify-content-center align-items-center pl-4 pr-4">
      <h1>We’re here to help you find what you need.</h1>
      <p>Take 10 minute assessment to help us find more resources that fit your needs.</p>
      <button className="btn default-button font-weight-bold"onClick={()=>triggerAssessment()} >Take the Assessment</button>
    </div>
    {isLoading && <SpinnerComponent />}
    {showModal && <WellnessContainer closeModal={()=>setShowModal(false)}/>}
    </div>
  );
};
export default TakeTheAssessmentComponent;

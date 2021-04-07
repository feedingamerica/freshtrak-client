
import React,{useContext,useState,useEffect} from 'react';
import ButtonComponent from '../../General/ButtonComponent';
import WellnessContainer from './WellnessContainer';
import {API_URL} from '../../../Utils/Urls';
import WellnessContext from './WellnessContext';
import axios from 'axios';
import moment from 'moment';


const TriggerAssess = (props) => {

	let context = useContext(WellnessContext);
	const [showModal, setShowModal] = useState(false);
	const [assessmentTitle, setAssessmentTitle] = useState(null);

    const setAssessmentData = async() => {
        let assessmentUri = API_URL.TRIGGER_ASSESSMENT;
        try {
            const resp = await axios.get(assessmentUri);
             
            if(resp && resp.data && 
                resp.data.data !== null){
                context.beginAssessmentData = resp.data.data;
                setAssessmentTitle(context.beginAssessmentData.name);
            }
            
        } catch (err) {
            console.log("ERROR LOADING trigger CARD DATA",err)
        }
    };




    useEffect(() => {
        setAssessmentData()
        context.start_time = moment().format('YYYY-MM-DD hh:mm');
    },[]);
    return (
		<>
	<div className="main-wrapper">
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-lg-4 col-xl-4">
                    <div className="wellness-assessment">
                        <div className="p-3">
                            <h3 className="mt-3 mb-3">Take the {assessmentTitle}</h3>
                            <button className="btn mt-2 custom-button w-100" data-toggle="modal"
                            data-target="#assessment" onClick={()=>setShowModal(true)}>Begin Assessment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 


    {showModal && <WellnessContainer closeModal={()=>setShowModal(false)}/>}
			
		</>
    );

}

export default TriggerAssess;

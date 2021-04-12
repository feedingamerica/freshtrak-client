import React,{useContext,useState,useEffect} from 'react';
import foodImage from '../../Assets/img/food.png';
import healthImage from '../../Assets/img/health.png';
import educationImage from '../../Assets/img/education.png';
import economicImage from '../../Assets/img/economic.png';
import homeImage from '../../Assets/img/home.png';
import { RENDER_URL } from '../../Utils/Urls';
import WellnessContainer from '../Assessment/Wellness/WellnessContainer';
import WellnessContext from '../Assessment/Wellness/WellnessContext';
import {API_URL} from '../../Utils/Urls';
import axios from 'axios';
import moment from 'moment';

const ResourceCategoryComponent = () => {
  let context = useContext(WellnessContext);
  const assessmentUrl = RENDER_URL.WELLNESS_ASSESS_URL;

  const [showModal, setShowModal] = useState(false);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if(Object.keys(context.beginAssessmentData).length === 0){
      setAssessmentData()
    }
  },[]);

  const setAssessmentData = async() => {
    let assessmentUri = API_URL.TRIGGER_ASSESSMENT;
    try {
        const resp = await axios.get(assessmentUri);
         
        if(resp && resp.data && 
            resp.data.data !== null){
            context.beginAssessmentData = resp.data.data;
            //setAssessmentTitle(context.beginAssessmentData.name);
        }
        
    } catch (err) {
        console.log("ERROR LOADING ASSESSMENT DATA",err)
    }
  };


  const triggerAssessment=()=>{
    if(authToken && context.beginAssessmentData){
      setShowModal(true)
      context.start_time = moment().format('YYYY-MM-DD hh:mm');
    }
    }
  return (
    <>
    <h5 className="section-title font-weight-bold">Resource Categories</h5>
     <p>Description</p>
     <div className="row">
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={foodImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Food</div>
               <a onClick={()=>triggerAssessment()} className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
             <img src={healthImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Health</div>
               <a onClick={()=>triggerAssessment()} className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={healthImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Social & Community</div>
               <a onClick={()=>triggerAssessment()} className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={educationImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Education</div>
               <a onClick={()=>triggerAssessment()} className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={homeImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Neighborhood & Environment</div>
               <a onClick={()=>triggerAssessment()} className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img src={economicImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Economic Stability</div>
               <a onClick={()=>triggerAssessment()} className="small">Take the Assessment</a>
             </div>
           </div>
         </div>
       </div>
     </div>
     {showModal && <WellnessContainer closeModal={()=>setShowModal(false)}/>}
    </>
  )
}
export default ResourceCategoryComponent;
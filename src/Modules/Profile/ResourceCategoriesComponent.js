import React,{useContext,useState,useEffect} from 'react';
import foodImage from '../../Assets/img/food.png';
import healthImage from '../../Assets/img/health.png';
import educationImage from '../../Assets/img/education.png';
import economicImage from '../../Assets/img/economic.png';
import homeImage from '../../Assets/img/home.png';
import WellnessContainer from '../Assessment/Wellness/WellnessContainer';
import WellnessContext from '../Assessment/Wellness/WellnessContext';
import {API_URL} from '../../Utils/Urls';
import axios from 'axios';
import moment from 'moment';
import { formatMMDDYYYY } from '../../Utils/DateFormat';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../Store/userSlice';
import SpinnerComponent from '../General/SpinnerComponent';

const ResourceCategoryComponent = () => {
  let context = useContext(WellnessContext);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const authToken = localStorage.getItem('authToken');


  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const userType = Number(localStorage.getItem('userType'));

  useEffect(() => {

    if(user === null || ((user !== undefined && user!== null) && 
    (Object.keys(user).length === 0))) {
      setCurrentUserData(userType)
    }
    if(Object.keys(context.beginAssessmentData).length === 0){
      setAssessmentData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const setCurrentUserData=(userType)=>{
    let authToken;
    if(userType === 0 ){
      authToken = localStorage.getItem('authToken');      
    } else {
      authToken = localStorage.getItem('userToken');
    }
      getUser(authToken);
    
  }


  const getUser = async token => {
    let url,authHeader;    
    setLoading(true);
    const { GUEST_USER ,COGNITO_USER} = API_URL;
    if(userType === 0){
      url = COGNITO_USER;
      authHeader = `${token}`;
    } else {
      url = GUEST_USER;
      authHeader =`Bearer ${token}`
    }    
    try {
      const resp = await axios.get(url, {
        params: {},
        headers: { Authorization: `${authHeader}` },
      });
      const { data } = resp;
      if (data["date_of_birth"] !== null){
        data["date_of_birth"] = formatMMDDYYYY(data["date_of_birth"]);
      }
      if (data["phone"] !== null && data["phone"] !== undefined){
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        data["phone"] = data["phone"].replace(phoneRegex, '($1) $2-$3')
      }
      
      setUser(data);
      setLoading(false);
      dispatch(setCurrentUser(data));
    } catch (e) {
      console.error(e);
    }
  };

  const setAssessmentData = async() => {
    let assessmentUri = API_URL.TRIGGER_ASSESSMENT;
    try {
      const resp = await axios.get(assessmentUri, {
        params: { zip_code: '43219'}
    });
         
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
    {isLoading && <SpinnerComponent />}
    <h5 className="section-title font-weight-bold">Resource Categories</h5>
     <p>Description</p>
     <div className="row">
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img alt="foodimage" src={foodImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Food</div>
               <div onClick={()=>triggerAssessment()} className="small">Take the Assessment</div>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
             <img alt="healthimage" src={healthImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Health</div>
               <div onClick={()=>triggerAssessment()} className="small">Take the Assessment</div>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img alt="healthimage" src={healthImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Social & Community</div>
               <div onClick={()=>triggerAssessment()} className="small">Take the Assessment</div>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img alt="educationimage" src={educationImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Education</div>
               <div onClick={()=>triggerAssessment()} className="small">Take the Assessment</div>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img alt="home" src={homeImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Neighborhood & Environment</div>
               <div onClick={()=>triggerAssessment()} className="small">Take the Assessment</div>
             </div>
           </div>
         </div>
       </div>
       <div className="col-12 col-lg-4 col-xl-4 mb-3">
         <div className="card p-3">
           <div className="d-flex align-items-center">
             <div className="profile-item-image">
               <img alt="economicimage" src={economicImage}/>
             </div>
             <div className="flex-grow-1">
               <div className="font-weight-bold mb-0 profile-title">Economic Stability</div>
               <div onClick={()=>triggerAssessment()} className="small">Take the Assessment</div>
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
import React,{useContext,useState,useEffect} from 'react';
import foodImage from '../../Assets/img/food.png';
import healthImage from '../../Assets/img/health.png';
import educationImage from '../../Assets/img/education.png';
import economicImage from '../../Assets/img/economic.png';
import homeImage from '../../Assets/img/home.png';
import {API_URL} from '../../Utils/Urls';
import axios from 'axios';
//import { formatMMDDYYYY } from '../../Utils/DateFormat';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../Store/userSlice';
import SpinnerComponent from '../General/SpinnerComponent';

const ResourceCategoryComponent = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const authToken = localStorage.getItem('authToken');


  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const [addressDetails, setAddressData] = useState({});
  const userType = Number(localStorage.getItem('userType'));

  useEffect(() => {
    if(user === null || ((user !== undefined && user!== null) && 
    (Object.keys(user).length === 0))) {
      setCurrentUserData(userType)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[addressDetails,currentUser]);

  const setCurrentUserData=(userType)=>{
    let authToken,authHeader;
    if(userType === 0 ){
      authToken = localStorage.getItem('authToken');
      authHeader = `${authToken}`;    
    } else {
      authToken = localStorage.getItem('userToken');
      authHeader =`Bearer ${authToken}`;
    }
      //getUser(authHeader);


      getUserDetails(authHeader)
    
  }


  const getUserDetails = async(authHeader)=>{
    const { GET_USER_DETAILS } = API_URL;
    let data;
    try {
      const UserDataResp = await axios.get(GET_USER_DETAILS, {
         headers: { Authorization: authHeader },
      });
      if(UserDataResp && UserDataResp.data && UserDataResp.data.user ){
        let resp = UserDataResp.data.user
        let person = resp.person
        let userDetails = {
          "id":person.id,
          "user_type": resp.user_type
        }
        
        data = {...user,...userDetails}
        setUser(data)
        //dispatch(setCurrentUser(data));
      if(userType === 0){
        //let userId = userDetails.id;
        getUserData(authHeader)
      }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }

  }



  const getUserData = async (authHeader) =>{
    
    getAddressDetails(authHeader)

  }

  const getAddressDetails = async (authHeader)=>{
    const { GET_ADDRESS } = API_URL;
    try {
      const AddressDataResp = await axios.get(GET_ADDRESS, {
         headers: { Authorization: authHeader },
      });
      if(AddressDataResp && AddressDataResp.data && AddressDataResp.data.address){
        let addressDetailsResp,addressDetails;
        addressDetailsResp = AddressDataResp.data.address
        addressDetails ={
          "city": addressDetailsResp.city,
          "line_1": addressDetailsResp.line_1,
          "line_2": addressDetailsResp.line_2,
          "state": addressDetailsResp.state,
          "zip_code": addressDetailsResp.zip_code
        }
        let data = {...user,...addressDetails}
      setUser(data)
      dispatch(setCurrentUser(data));
      setAddressData(addressDetails)
      }
      setLoading(false);
      
    } catch (e) {
      setLoading(false);
      console.error(e);
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
               {/* <div onClick={()=>triggerAssessment()} className="small">Take the Assessment</div> */}
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
                </div>
           </div>
         </div>
       </div>
     </div>
    </>
  )
}
export default ResourceCategoryComponent;
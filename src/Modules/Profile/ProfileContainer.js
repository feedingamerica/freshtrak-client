import React, { useEffect,useState } from "react";
import ProfileComponent from "../Profile/ProfileComponent";
import ProfileTabComponent from "../Profile/ProfileTabComponent";
import TakeTheAssessmentComponent from "../General/TakeTheAssessmentComponent";
import axios from 'axios';
import { API_URL } from '../../Utils/Urls';
import { useHistory } from 'react-router-dom';
import { RENDER_URL } from "../../Utils/Urls";
import SpinnerComponent from '../General/SpinnerComponent';
import { formatMMDDYYYY } from '../../Utils/DateFormat';
import { selectUser } from '../../Store/userSlice';
import { useSelector } from 'react-redux';

const ProfileContainer = () => {
  //const dispatch = useDispatch();
  const history = useHistory();
  const authToken = localStorage.getItem('authToken');
  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const [loading, setLoading] = useState(false);

  const [informationData, setInformationData] = useState({})
  useEffect(()=>{
    
    if(authToken === undefined){
      redirectToHome()
    }
    if(Object.keys(informationData).length === 0){
      getInformationDetails()
    }
    
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[informationData])

  const redirectToHome=()=>{
    
    if(history){
      history.push(`${RENDER_URL.ROOT_URL}`);
    }
  }

  const getInformationDetails = async () =>{

  setLoading(true);
  const { GET_USER_DETAILS } = API_URL;
    try {
      const UserDataResp = await axios.get(GET_USER_DETAILS, {
         headers: { Authorization: authToken },
      });
      if(UserDataResp && UserDataResp.data && UserDataResp.data.user && UserDataResp.data.user.person){
        let resp = UserDataResp.data.user
        let person = resp.person
        let userDetails = {
          "id":person.id,
          "user_type": resp.user_type
        }
        setUser({...user,...userDetails})
        let userId = userDetails.id;
        getPersonDetails(authToken,userId)
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }


}

const getPersonDetails = async (authToken,id) =>{
  setLoading(true);
    const {GET_PEOPLE} = API_URL;
    let GET_PEOPLE_DATA = `${GET_PEOPLE}/${id}`;
    try {
      const PersonDataResp = await axios.get(GET_PEOPLE_DATA, {
         headers: { Authorization: authToken },
      });
      
      if(PersonDataResp && PersonDataResp.data && PersonDataResp.data.person){
        let personDetailsResponse,personDetails;
        personDetailsResponse = PersonDataResp.data.person
         if (personDetailsResponse["date_of_birth"] !== null){
          personDetailsResponse["date_of_birth"] = formatMMDDYYYY(personDetailsResponse["date_of_birth"]);
       }
       personDetails = {
         "first_name" : personDetailsResponse.first_name,
         "middle_name" : personDetailsResponse.middle_name,
         "last_name" : personDetailsResponse.last_name,
         "date_of_birth" : personDetailsResponse.date_of_birth,
       }

      let data = {...user,...personDetails}
      setUser(data)
      //dispatch(setCurrentUser(data));
      setInformationData(data)
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  
  
}

  return (
    <div>
      <div className="container pt-100 pb-50">
      {loading && <SpinnerComponent />}
      {!loading && informationData && <ProfileComponent data={informationData}/>}
    </div>
    <div className="profile-tabs-wrapper">
      <ProfileTabComponent onRefresh={()=>getInformationDetails()}/>
    </div>
    <div className="assessment-section">
      <TakeTheAssessmentComponent/>
    </div>
    </div>
  );
};
export default ProfileContainer;

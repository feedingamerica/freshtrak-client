import React, { useEffect,useState } from "react";
import ProfileComponent from "../Profile/ProfileComponent";
import ProfileTabComponent from "../Profile/ProfileTabComponent";
import TakeTheAssessmentComponent from "../General/TakeTheAssessmentComponent";
import SpinnerComponent from '../General/SpinnerComponent';
import axios from 'axios';
import { API_URL } from '../../Utils/Urls';
import { useHistory } from 'react-router-dom';
import { RENDER_URL } from "../../Utils/Urls";

const ProfileContainer = () => {
  const history = useHistory();
  const authToken = localStorage.getItem('authToken');
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
    const {USER_INFORMATION} = API_URL;
    try {
      const userInfoResp = await axios.get(USER_INFORMATION, {
        headers: { Authorization: `${authToken}` }
      });
      // setUsersReservation(usersRegData.data);
      //getEventByDateId(usersRegData.data);
       
      if(userInfoResp && userInfoResp.data && userInfoResp.data.data && userInfoResp.data.data[0]){
        setInformationData(userInfoResp.data.data[0])
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("api error information >>",e);
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

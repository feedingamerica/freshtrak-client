
import React ,{ useEffect, useState }from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from './AddressComponent';
import EditInformationComponent from './EditInformationComponent';
import EditAddressComponent from "./EditAddressComponent";
import EditEmailComponent from "./EditEmailComponent";
import EditPhoneComponent from "./EditPhoneComponent";
import EditVehicleComponent from "./EditVehicleComponent";
import EmailComponent from './EmailComponent';
import PhoneComponent from './PhoneComponent';
import InformationComponent from './InformationComponent';
import LanguagePreferenceComponent from './LanguagePreferenceComponent';
import VehiclesComponent from './VehiclesComponent';
import SideTrayComponent from './SideTrayComponent';
import axios from 'axios';
import { selectUser } from '../../../Store/userSlice';
//import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../../General/SpinnerComponent';
import { formatMMDDYYYY } from '../../../Utils/DateFormat';

import { API_URL } from '../../../Utils/Urls';

const YourInformationContainer = (props) =>{
  //const dispatch = useDispatch();
  const { errors } = useForm();
  const [showInformationTray, setShowInformationTray] = useState(false)
  const [showAddressTray, setShowAddressTray] = useState(false)
  const [showPhoneTray, setShowPhoneTray] = useState(false)
  const [showEmailTray, setShowEmailTray] = useState(false)
  const [showLangPrefTray, setShowLangPrefTray] = useState(false)
  const [showVehicleTray, setShowVehicleTray] = useState(false)

  //const [languagePreferenceData, setLanguagePreferenceData] = useState(null)
  const [vehicleData, setVehicleData] = useState(null)

  //new code
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [personData, setPersonData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [phoneData, setPhoneData] = useState({});
  const [emailData, setEmailData] = useState({});
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);
  const authToken = localStorage.getItem('authToken');

  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);


  useEffect(() => {
    if(user == null || ((user !== undefined && user!== null) && 
     (Object.keys(user).length === 0))) {
      getUserDetails()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[addressData,vehicleData,userData,personData,emailData,phoneData,user])

  const refreshInformationTab=()=>{
    getPersonDetails(userData.id)
    props.onRefresh()
  }


  const refreshAddressTab=()=>{
    getAddressDetails(userData.id)
  }

  
  const refreshPhoneTab=()=>{
    getPhoneDetails()
  }

  const refreshEmailTab=()=>{
    getEmailDetails()
  }
  // const refreshLanguagePreferenceTab=()=>{
  //   getLanguageDetails()
  // }

  const refreshVehicleTab=()=>{
    getVehicleDetails(userData.id)
  }


const getUserDetails = async()=>{
  const { GET_USER_DETAILS } = API_URL;
  try {
    const UserDataResp = await axios.get(GET_USER_DETAILS, {
       headers: { Authorization: authToken },
    });
    if(UserDataResp && UserDataResp.data && UserDataResp.data.user ){
      let resp = UserDataResp.data.user
      let person = resp.person
      let userDetails = {
        "id":person.id,
        "user_type": resp.user_type
      }
      let data = {...user,...userDetails}
      setUser(data)
      setUserData(data)
      //dispatch(setCurrentUser(data));
      let userId = userDetails.id;
      getUserData(userId)
    }
    setLoading(false);
  } catch (e) {
    setLoading(false);
    console.error(e);
  }

}

const getPersonDetails = async(id)=>{ 
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
       "id" : personDetailsResponse.id
     }

    let data = {...user,...personDetails}
    setUser(data)
    //dispatch(setCurrentUser(data));
    setPersonData(data)
    }
    setLoading(false);
  } catch (e) {
    setLoading(false);
    console.error(e);
  }
}

  const getAddressDetails = async (id)=>{
    const { GET_ADDRESS } = API_URL;
    let URL = `${GET_ADDRESS}/${id}`;
    try {
      const AddressDataResp = await axios.get(URL, {
         headers: { Authorization: authToken },
      });
      if(AddressDataResp && AddressDataResp.data && AddressDataResp.data.address){
        let addressDetailsResp,addressDetails;
        addressDetailsResp = AddressDataResp.data.address
        addressDetails ={
          "id": addressDetailsResp.id,
          "city": addressDetailsResp.city,
          "line_1": addressDetailsResp.line_1,
          "line_2": addressDetailsResp.line_2,
          "state": addressDetailsResp.state,
          "zip_code": addressDetailsResp.zip_code
        }
        let data = {...user,...addressDetails}
      setUser(data)
      setAddressData(data)
      //dispatch(setCurrentUser(data));
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }


const getPhoneDetails = async()=>{
  const { GET_PHONE } = API_URL;
  try {
    const PhoneDataResp = await axios.get(GET_PHONE, {
       headers: { Authorization: authToken },
    });

    if(PhoneDataResp && PhoneDataResp.data && PhoneDataResp.data.phones){
      let phonesArray = PhoneDataResp.data.phones
      let phoneDetailsResponse,phoneDetails;

      phonesArray.forEach((data)=>{
        if(data.is_primary === true){
          phoneDetailsResponse = data
        }
      })
      setPhones(phonesArray)
      phoneDetails = {
        "phone" : phoneDetailsResponse.phone
        //"permission_to_text": phoneDetailsResponse.permission_to_text
      }
      if (phoneDetails.phone["phone"] !== null && phoneDetails.phone["phone"] !== undefined){
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      phoneDetails.phone["phone"] = phoneDetails.phone["phone"].replace(phoneRegex, '($1) $2-$3')
    }
    let data = {...user,...phoneDetails}
    setUser(data)
    //dispatch(setCurrentUser(data));
    setPhoneData(data)
    }
    
    setLoading(false);
  } catch (e) {
     setLoading(false);
    console.error(e);
  }
}

const getEmailDetails = async()=>{
  const { GET_EMAIL } = API_URL;
  try {
    const EmailDataResp = await axios.get(GET_EMAIL, {
       headers: { Authorization: authToken },
    });
    if(EmailDataResp && EmailDataResp.data && EmailDataResp.data.emails){
      let emailsArray = EmailDataResp.data.emails
      let emailDetailsResponse,emailDetails;
      setEmails(emailsArray)
      emailsArray.forEach((data)=>{
        if(data.is_primary === true){
          emailDetailsResponse = data
        }
      })
      emailDetails = {
        "email" : emailDetailsResponse.email
        //"permission_to_email" : emailDetailsResponse.permission_to_email
      }
    let data = {...user,...emailDetails}
    setUser(data)
    //dispatch(setCurrentUser(data));
    setEmailData(data)
    }
    setLoading(false);
  } catch (e) {
     setLoading(false);
    console.error(e);
  }
}




// const getLanguageDetails = async () =>{
//   const {USER_LANGUAGE} = API_URL;
//   try {
//     const userLangPrefResp = await axios.get(USER_INFORMATION, {
//       headers: { Authorization: `${authToken}` }
//     });
//     // setUsersReservation(usersRegData.data);
//     //getEventByDateId(usersRegData.data);
//     // setLoading();
//     if(userLangPrefResp.data && userLangPrefResp.data.data[0]){
//       setLanguagePreferenceData(userLangPrefResp.data.data[0])
//     }
//     console.log("api resp >>",userLangPrefResp.data)
//   } catch (e) {
//     console.log("api error address >>",e);
//   } 
// }


const getVehicleDetails = async (id) =>{
  const {GET_EVENT_RESERVATION} = API_URL;
  let URL = `${GET_EVENT_RESERVATION}/${id}`;
  try {
    const userVehicleResp = await axios.get(URL, {
      headers: { Authorization: `${authToken}` }
    });
    if(userVehicleResp && userVehicleResp.data && 
      userVehicleResp.data.data && userVehicleResp.data){
        let licenseData = userVehicleResp.data;
      let licenseDetails = {
        "license_plate" : licenseData.license_plate
      }
      let data = {...user,...licenseDetails}
      setVehicleData(data)
    }
    setLoading(false);
  } catch (e) {
    setLoading(false);
    console.error(e);
  } 
}



const getUserData = async (id) =>{
    
  getPersonDetails(id)
  
  getAddressDetails(id)

  getPhoneDetails()
 
  getEmailDetails()

  getVehicleDetails(id)

  
}


  const setInformationTab = () => {
    if(showInformationTray === true){
      setShowInformationTray(false)
    }else{
      setShowInformationTray(true)
    }
  }


  const setAddressTab = () => {
    if(showAddressTray === true){
      setShowAddressTray(false)
    }else{
      setShowAddressTray(true)
    }
  }


  const setPhoneTab = () => {
    if(showPhoneTray === true){
      setShowPhoneTray(false)
    }else{
      setShowPhoneTray(true)
    }
  }

  const setEmailTab = () => {
    if(showEmailTray === true){
      setShowEmailTray(false)
    }else{
      setShowEmailTray(true)
    }
  }



  const setLangPrefTab = () => {
    if(showLangPrefTray === true){
      setShowLangPrefTray(false)
    }else{
      setShowLangPrefTray(true)
    }
  }
  const setVehicleTab = () => {
    if(showVehicleTray === true){
      setShowVehicleTray(false)
    }else{
      setShowVehicleTray(true)
    }
  }
  return(
    
    <div className="d-flex flex-column">
      <div>
      {isLoading && <SpinnerComponent />}
      </div>
      
      
      <SideTrayComponent
                show={showInformationTray}
                header={"Edit Information"}
                onClose={()=> setShowInformationTray(false)}
            >
                {personData && <EditInformationComponent
                    informationData={personData}
                    states={[]}
                    refreshMainTab={()=>refreshInformationTab()}
                    tabClose={() => setShowInformationTray(false)}
                />}
      </SideTrayComponent>
      {personData && <InformationComponent 
      onEditClick={()=>setInformationTab()} 
      data={personData}/>}






      <SideTrayComponent
                show={showAddressTray}
                header={"Edit Address"}
                onClose={()=> setShowAddressTray(false)}
            >
                {addressData && <EditAddressComponent
                    addressData={addressData}
                    refreshMainTab={()=>refreshAddressTab()}
                    errors={errors}
                    tabClose={() =>setShowAddressTray(false)}
                />}
      </SideTrayComponent>
      {addressData && <AddressComponent onEditClick={()=>setAddressTab()} data={addressData}/>}





    <SideTrayComponent
                show={showPhoneTray}
                header={"Edit Phone"}
                onClose={()=> setShowPhoneTray(false)}
            >
                {phoneData && <EditPhoneComponent
                    phoneData={phoneData}
                    phones={phones}
                    refreshMainTab={()=>refreshPhoneTab()}
                    tabClose={() => setShowPhoneTray(false)}
                />}
      </SideTrayComponent>
      {phoneData && <PhoneComponent onEditClick={()=>setPhoneTab()} 
      data={phoneData} phones={phones}/>}





      <SideTrayComponent
                show={showEmailTray}
                header={"Edit Email"}
                onClose={()=> setShowEmailTray(false)}
            >
                {emailData && <EditEmailComponent
                    emailData={emailData}
                    emails={emails}
                    refreshMainTab={()=>refreshEmailTab()}
                    tabClose={() => setShowEmailTray(false)}
                />}
      </SideTrayComponent>
      {emailData && <EmailComponent 
      onEditClick={()=>setEmailTab()} 
      data={emailData} emails={emails}/>}



      {/* <SideTrayComponent
                show={showLangPrefTray}
                header={"Information Data"}
                onClose={()=> setShowLangPrefTray(false)}
            >
                {lang && <EditInformationComponent
                    informationData={informationData}
                    states={[]}
                    refreshMainTab={()=>refreshLanguagePreferenceTab()}
                    //resetData={() => setServiceData(null)}
                    tabClose={() => setShowInformationTray(false)}
                   //editServiceId={editServiceId}
                    //loadProfileData={props.loadProfileData}
                />}
      </SideTrayComponent>


      <LanguagePreferenceComponent onEditClick={()=>setLangPrefTab()}/> */}

      <LanguagePreferenceComponent onEditClick={()=>setLangPrefTab()}/>






      <SideTrayComponent
                show={showVehicleTray}
                header={"Edit Vehicle"}
                onClose={()=> setShowVehicleTray(false)}
            >
                {vehicleData && <EditVehicleComponent
                    vehicleData={vehicleData}
                    states={[]}
                    refreshMainTab={()=>refreshVehicleTab()}
                    tabClose={() => setShowVehicleTray(false)}
                />}
      </SideTrayComponent>
      {vehicleData && <VehiclesComponent onEditClick={()=>setVehicleTab()} data={vehicleData} />}
    </div>
  )
}
export default YourInformationContainer;
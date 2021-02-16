
import React ,{ useEffect, useState }from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from './AddressComponent';
import EditInformationComponent from './EditInformationComponent';
import EditAddressComponent from "./EditAddressComponent";
import EditContactComponent from "./EditContactComponent";
import ContactComponent from './ContactComponent';
import InformationComponent from './InformationComponent';
import LanguagePreferenceComponent from './LanguagePreferenceComponent';
import VehiclesComponent from './VehiclesComponent';
import SideTrayComponent from './SideTrayComponent';
import axios from 'axios';

import { API_URL } from '../../../Utils/Urls';

const YourInformationContainer = () =>{
  const { register, handleSubmit, errors,setValue,watch } = useForm();
  const [showInformationTray, setShowInformationTray] = useState(false)
  const [showAddressTray, setShowAddressTray] = useState(false)
  const [showContactTray, setShowContactTray] = useState(false)
  const [showLangPrefTray, setShowLangPrefTray] = useState(false)
  const [showVehicleTray, setShowVehicleTray] = useState(false)

  const [informationData, setInformationData] = useState(null)
  const [addressData, setAddressData] = useState(null)
  const [contactData, setContactData] = useState(null)
  const [languagePreferenceData, setLanguagePreferenceData] = useState(null)
  const [vehicleData, setVehicleData] = useState(null)


  useEffect(() => {
    if(informationData == null || addressData == null || contactData == null || vehicleData == null){
      getInformationDetails()
      getAddressDetails()
      getContactDetails()
      //getLanguageDetails()
      getVehicleDetails()
    }
  
    console.log("use effect in yic")
    
   
  },[informationData,addressData,contactData,vehicleData])

  const getInformationDetails = async () =>{
    const userToken = localStorage.getItem('userToken');
    console.log("userToken is >>",userToken)
    const {USER_INFORMATION} = API_URL;
    try {
      const userInfoResp = await axios.get(USER_INFORMATION, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      // setUsersReservation(usersRegData.data);
      //getEventByDateId(usersRegData.data);
      // setLoading();
      if(userInfoResp.data && userInfoResp.data.data[0]){
        setInformationData(userInfoResp.data.data[0])
      }
      console.log("api resp information>>",userInfoResp.data.data[0])
    } catch (e) {
      console.log("api error information >>",e);
    } 
}


const getAddressDetails = async () =>{
  const userToken = localStorage.getItem('userToken');
  console.log("userToken is >>",userToken)
  const {USER_ADDRESS} = API_URL;
  try {
    const userAddressResp = await axios.get(USER_ADDRESS, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    if(userAddressResp.data && userAddressResp.data.data[0]){
      setAddressData(userAddressResp.data.data[0])
    }
    console.log("api resp address>>",userAddressResp.data)
  } catch (e) {
    console.log("api error address >>",e);
  } 
}


const getContactDetails = async () =>{
  const userToken = localStorage.getItem('userToken');
  console.log("userToken is >>",userToken)
  const {USER_CONTACT} = API_URL;
  try {
    const userContactResp = await axios.get(USER_CONTACT, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    if(userContactResp.data && userContactResp.data.data[0]){
      setContactData(userContactResp.data.data[0])
    }
    console.log("api resp contact>>",userContactResp.data)
  } catch (e) {
    console.log("api error contact >>",e);
  } 
}



// const getLanguageDetails = async () =>{
//   const userToken = localStorage.getItem('userToken');
//   console.log("userToken is >>",userToken)
//   const {USER_LANGUAGE} = API_URL;
//   try {
//     const userLangPrefResp = await axios.get(USER_INFORMATION, {
//       headers: { Authorization: `Bearer ${userToken}` }
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


const getVehicleDetails = async () =>{
  const userToken = localStorage.getItem('userToken');
  console.log("userToken is >>",userToken)
  const {USER_VEHICLE} = API_URL;
  try {
    const userVehicleResp = await axios.get(USER_VEHICLE, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    if(userVehicleResp.data && userVehicleResp.data.data[0]){
      setVehicleData(userVehicleResp.data.data[0])
    }
    console.log("api resp vehicle>>",userVehicleResp.data)
  } catch (e) {
    console.log("api error vehicle >>",e);
  } 
}


  const setInformationTab = () => {
    console.log("setting info tray to true")
    if(showInformationTray === true){
      setShowInformationTray(false)
    }else{
      setShowInformationTray(true)
    }
  }


  const setAddressTab = () => {
    console.log("setting address tray to true")
    if(showAddressTray === true){
      setShowAddressTray(false)
    }else{
      setShowAddressTray(true)
    }
  }


  const setContactTab = () => {
    console.log("setting contact tray to true")
    if(showContactTray === true){
      setShowContactTray(false)
    }else{
      setShowContactTray(true)
    }
  }



  const setLangPrefTab = () => {
    console.log("setting lang pref tray to true")
    if(showLangPrefTray === true){
      setShowLangPrefTray(false)
    }else{
      setShowLangPrefTray(true)
    }
  }
  const setVehicleTab = () => {
    console.log("setting vehicle tray to true")
    if(showVehicleTray === true){
      setShowVehicleTray(false)
    }else{
      setShowVehicleTray(true)
    }
  }
console.log("information data>>",informationData)
  return(
    
    <div className="d-flex flex-column">
     
      
      
      <SideTrayComponent
                show={showInformationTray}
                //header={editServiceId ? "Update Service" : "Schedule Service"}
                header={"Edit Information"}
                onClose={()=> setShowInformationTray(false)}
            >
                {informationData && <EditInformationComponent
                    informationData={informationData}
                    states={[]}
                    //watch={watch}
                    //resetData={() => setServiceData(null)}
                    tabClose={() => setShowInformationTray(false)}
                   //editServiceId={editServiceId}
                    //loadProfileData={props.loadProfileData}
                />}
      </SideTrayComponent>
      <InformationComponent 
      onEditClick={()=>setInformationTab()} 
      data={informationData}/>






      <SideTrayComponent
                show={showAddressTray}
                header={"Edit Address"}
                onClose={()=> setShowAddressTray(false)}
            >
                {addressData && <EditAddressComponent
                    addressData={addressData}
                    // states={[]}
                    // watch={watch}
                    // setValue={setValue}
                    // register={register}
                    errors={errors}
                   // states={[]}
                    //states={addressData.states}
                    //resetData={() => setServiceData(null)}
                    tabClose={() =>setShowAddressTray(false)}
                   //editServiceId={editServiceId}
                    //loadProfileData={props.loadProfileData}
                />}
      </SideTrayComponent>
      <AddressComponent onEditClick={()=>setAddressTab()}/>






      <SideTrayComponent
                show={showContactTray}
                //header={editServiceId ? "Update Service" : "Schedule Service"}
                header={"Edit Contact"}
                onClose={()=> setShowContactTray(false)}
            >
                {contactData && <EditContactComponent
                    contactData={contactData}
                    //states={[]}
                    //resetData={() => setServiceData(null)}
                    tabClose={() => setShowContactTray(false)}
                   //editServiceId={editServiceId}
                    //loadProfileData={props.loadProfileData}
                />}
      </SideTrayComponent>
      <ContactComponent onEditClick={()=>setContactTab()}/>






      {/* <SideTrayComponent
                show={showLangPrefTray}
                header={"Information Data"}
                onClose={()=> setShowLangPrefTray(false)}
            >
                {lang && <EditInformationComponent
                    informationData={informationData}
                    states={[]}
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
                header={"Information Data"}
                onClose={()=> setShowVehicleTray(false)}
            >
                {vehicleData && <EditInformationComponent
                    vehicleData={vehicleData}
                    states={[]}
                    //resetData={() => setServiceData(null)}
                    tabClose={() => setShowInformationTray(false)}
                   //editServiceId={editServiceId}
                    //loadProfileData={props.loadProfileData}
                />}
      </SideTrayComponent>
      <VehiclesComponent onEditClick={()=>setVehicleTab()}/>
    </div>
  )
}
export default YourInformationContainer;
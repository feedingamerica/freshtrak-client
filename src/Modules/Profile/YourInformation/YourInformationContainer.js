
import React ,{ useEffect, useState }from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from './AddressComponent';
import EditInformationComponent from './EditInformationComponent';
import EditAddressComponent from "./EditAddressComponent";
import EditContactComponent from "./EditContactComponent";
import EditVehicleComponent from "./EditVehicleComponent";
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
    if(informationData == null){
      getInformationDetails()
      getAddressDetails()
      getContactDetails()
      //getLanguageDetails()
      getVehicleDetails()
    }
  },[informationData,addressData,contactData,vehicleData])

  const refreshInformationTab=()=>{
    getInformationDetails()
  }

  const refreshAddressTab=()=>{
    getAddressDetails()
  }

  const refreshContactTab=()=>{
    getContactDetails()
  }

  // const refreshLanguagePreferenceTab=()=>{
  //   getLanguageDetails()
  // }

  const refreshVehicleTab=()=>{
    getVehicleDetails()
  }


  const getInformationDetails = async () =>{
    const userToken = localStorage.getItem('userToken');
    console.log("userToken is >>",userToken)
    const {USER_INFORMATION} = API_URL;
    try {
      const userInfoResp = await axios.get(USER_INFORMATION, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
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
  const {USER_VEHICLE} = API_URL;
  try {
    const userVehicleResp = await axios.get(USER_VEHICLE, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    if(userVehicleResp.data && userVehicleResp.data.data[0]){
      setVehicleData(userVehicleResp.data.data[0])
    }
  } catch (e) {
    console.log("api error vehicle >>",e);
  } 
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


  const setContactTab = () => {
    if(showContactTray === true){
      setShowContactTray(false)
    }else{
      setShowContactTray(true)
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
     
      
      
      <SideTrayComponent
                show={showInformationTray}
                //header={editServiceId ? "Update Service" : "Schedule Service"}
                header={"Edit Information"}
                onClose={()=> setShowInformationTray(false)}
            >
                {informationData && <EditInformationComponent
                    informationData={informationData}
                    states={[]}
                    refreshMainTab={()=>refreshInformationTab()}
                    //watch={watch}
                    //resetData={() => setServiceData(null)}
                    tabClose={() => setShowInformationTray(false)}
                />}
      </SideTrayComponent>
      {informationData && <InformationComponent 
      onEditClick={()=>setInformationTab()} 
      data={informationData}/>}






      <SideTrayComponent
                show={showAddressTray}
                header={"Edit Address"}
                onClose={()=> setShowAddressTray(false)}
            >
                {addressData && <EditAddressComponent
                    addressData={addressData}
                    refreshMainTab={()=>refreshAddressTab()}
                    // states={[]}
                    // watch={watch}
                    // setValue={setValue}
                    // register={register}
                    errors={errors}
                    //states={addressData.states}
                    //resetData={() => setServiceData(null)}
                    tabClose={() =>setShowAddressTray(false)}
                />}
      </SideTrayComponent>
      {addressData && <AddressComponent onEditClick={()=>setAddressTab()} data={addressData}/>}






      <SideTrayComponent
                show={showContactTray}
                header={"Edit Contact"}
                onClose={()=> setShowContactTray(false)}
            >
                {contactData && <EditContactComponent
                    contactData={contactData}
                    refreshMainTab={()=>refreshContactTab()}
                    //resetData={() => setServiceData(null)}
                    tabClose={() => setShowContactTray(false)}
                />}
      </SideTrayComponent>
      {contactData && <ContactComponent onEditClick={()=>setContactTab()} data={contactData}/>}






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
                    
                    //resetData={() => setServiceData(null)}
                    tabClose={() => setShowVehicleTray(false)}
                />}
      </SideTrayComponent>
      {vehicleData && <VehiclesComponent onEditClick={()=>setVehicleTab()} data={vehicleData} />}
    </div>
  )
}
export default YourInformationContainer;
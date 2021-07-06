import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TagManager from 'react-gtm-module'
import { setCurrentEvent, selectEvent } from '../../Store/Events/eventSlice';
import { setCurrentUser, selectUser } from '../../Store/userSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import ErrorComponent from '../General/ErrorComponent';
import { API_URL, BASE_URL, RENDER_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationComponent from './RegistrationComponent';
import { EventFormat } from '../../Utils/EventHandler';
import { formatMMDDYYYY } from '../../Utils/DateFormat';
import { NotifyToast, showToast } from '../Notifications/NotifyToastComponent';
import { sendRegistrationConfirmationEmail } from '../../Services/ApiService';

const RegistrationContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { eventDateId, eventSlotId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [personData, setPersonData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [userData, setUserData] = useState({});
  const [phoneData, setPhoneData] = useState({});
  const [emailData, setEmailData] = useState({});

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const userType = Number(localStorage.getItem('userType'));
  
  
   const fetchBusinesses = () =>{ 
    let authToken;
    if(userType === 0 ){
      authToken = localStorage.getItem('authToken');      
    } else {
      authToken = localStorage.getItem('userToken');
    }
    if (!isError && !pageError) {
      setUserToken(authToken);
      if(Object.keys(selectedEvent).length === 0) {
        getEvent();
      }
      // if(user == null || ((user !== undefined && user!== null) && 
      // (Object.keys(user).length === 0))) {
        getUser(authToken);
      //}  //calling get api's to retrieve user data
    }
  }

  //useEffect(fetchBusinesses, [user]);

  useEffect(() => {
    fetchBusinesses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const getEvent = async () => {
    setLoading(true)
    try {
      const resp = await axios.get(
        `${BASE_URL}api/event_dates/${eventDateId}/event_details`
      )
      const { data } = resp;
      if (data && data.event !== undefined) {
        const eventData = EventFormat(data.event, eventDateId);
        dispatch(setCurrentEvent(eventData));
        setSelectedEvent(eventData);
      } else {
        setPageError(true);
        setErrors(data.errors || []);
      }
      setLoading(false)
    } catch (e) {
      console.error(e);
      setIsError(true);
      if(e.response){
        setPageError(true);
        setErrors(e.response.data);
      }
      setLoading(false)
    }
  };

  const getUser = async token => {
    let authHeader;    
    setLoading(true);
    if(userType === 0){
       authHeader = `${token}`;
     } else {
       authHeader =`Bearer ${token}`;
     }
    getUserDetails(authHeader)
  };




  const getPersonDetails = async(authHeader,id)=>{ 
    setLoading(true)
    const {GET_PEOPLE} = API_URL;
    let GET_PEOPLE_DATA = `${GET_PEOPLE}/${id}`;
    try {
      const PersonDataResp = await axios.get(GET_PEOPLE_DATA, {
         headers: { Authorization: authHeader },
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
         "gender" : personDetailsResponse.gender,
         "id" : personDetailsResponse.id
       }
       
      let data = {...user,...personDetails}
      setUser(data)
      //dispatch(setCurrentUser({...user,personDetails}));
      setPersonData(data)
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }

  const getAddressDetails = async (authHeader,id)=>{
    setLoading(true)
    const { GET_ADDRESS } = API_URL;
    let URL = `${GET_ADDRESS}/${id}`
    try {
      const AddressDataResp = await axios.get(URL, {
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
      //dispatch(setCurrentUser({...user,...addressDetails}));
      setAddressData(data)
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  }

    const getUserDetails = async(authHeader)=>{
    setLoading(true)
    const { GET_USER_DETAILS } = API_URL;
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
        let data = {...user,...userDetails}
        setUser(data)
        setUserData(data)
        //dispatch(setCurrentUser({...user,...userDetails}));
      if(userType === 0){
        let userId = userDetails.id;
        getUserData(authHeader,userId)
      }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }

  }
  const normalizeInput = (value) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (value.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`;
    } else {
      return value
    }
  };
  const getPhoneDetails = async(authHeader)=>{
    setLoading(true)
    const { GET_PHONE } = API_URL;
    try {
      const PhoneDataResp = await axios.get(GET_PHONE, {
         headers: { Authorization: authHeader },
      });

      if(PhoneDataResp && PhoneDataResp.data && PhoneDataResp.data.phones){
        let phonesArray = PhoneDataResp.data.phones
        let phoneDetailsResponse,phoneDetails;

        phonesArray.forEach((data)=>{
          if(data.is_primary === true){
            phoneDetailsResponse = data
          }
        })
        phoneDetails = {
          "phone" :  normalizeInput(phoneDetailsResponse.phone),
          "permission_to_text": phoneDetailsResponse.permission_to_text
        }
        if (phoneDetails.phone["phone"] !== null && phoneDetails.phone["phone"] !== undefined){
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        phoneDetails.phone["phone"] = phoneDetails.phone["phone"].replace(phoneRegex, '($1) $2-$3')
      }
      let data = {...user,...phoneDetails}
      setUser(data)
      //dispatch(setCurrentUser({...user,...phoneDetails}));
      setPhoneData(data)
      }
      
      setLoading(false);
    } catch (e) {
       setLoading(false);
      console.error(e);
    }
  }


  const getEmailDetails = async(authHeader)=>{
    setLoading(true)
    const { GET_EMAIL } = API_URL;
    try {
      const EmailDataResp = await axios.get(GET_EMAIL, {
         headers: { Authorization: authHeader },
      });
      if(EmailDataResp && EmailDataResp.data && EmailDataResp.data.emails){
        let emailsArray = EmailDataResp.data.emails
        let emailDetailsResponse,emailDetails;

        emailsArray.forEach((data)=>{
          if(data.is_primary === true){
            emailDetailsResponse = data
          }
        })
        emailDetails = {
          "email" : emailDetailsResponse.email,
          "permission_to_email" : emailDetailsResponse.permission_to_email
        }
      let data = {...user,...emailDetails}
      setUser(data)
      //dispatch(setCurrentUser({...user,...emailDetails}));
      setEmailData(data)
      }
      setLoading(false);
    } catch (e) {
       setLoading(false);
      console.error(e);
    }
  }



  const getUserData = async (authHeader,id) =>{
    
    //get person details
    getPersonDetails(authHeader,id)
    
    //get address details
    getAddressDetails(authHeader,id)

    //get phone data
    getPhoneDetails(authHeader)
   
    //get email data
    getEmailDetails(authHeader)
 
    
  }


  const getReservationText = () => {
    return location.state? `at ${event.agencyName} on ${location.state.event_date} from ${location.state.event_slot.start_time} - ${location.state.event_slot.end_time}. For more information, including a reservation QR code,`: "";
  }

  const getCodeURL = (identification_code) => {
    return `Your QRCode for the Reservation ${CLIENT_URL}qrcode/${identification_code}/${eventDateId}${eventSlotId?"/" + eventSlotId: ""}`;
  }

  const notify = (msg, error) => {
    //let formatted_msg = (msg.user_id && msg.user_id[0]) || msg.event_date_id &&  msg.event_date_id[0] || "Something Went Wrong"
    let formatted_msg = (msg.user_id && msg.user_id[0]) || (msg.event_date_id && msg.event_date_id[0]) || "Something Went Wrong"
    showToast(formatted_msg, error);
  }
  const send_sms = async user => {
    const { TWILIO_SMS } = API_URL;
    let to_phone_number = user['phone']
    debugger
    let identification_code =  user['identification_code']
    let message = `You have successfully registered for an event, ${getReservationText()} Your confirmation code is ${identification_code.toUpperCase()}.
    ${getCodeURL(identification_code)}`
    let search_zip = localStorage.getItem('search_zip')
    if (search_zip) {
      setLoading(true);
      let foodBankUri = API_URL.FOODBANK_LIST;
      try {
        const resp = await axios.get(foodBankUri, {
        params: { zip_code: search_zip },
        });
        const { data } = resp;
        let from_phone_number = data.foodbanks[0].twilio_phone_number
        try {
          await axios.post(TWILIO_SMS, { from_phone_number, to_phone_number, message });
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
  }

  const register = async (user, event) => {
    setDisabled(!disabled);
    let authHeader; 
      if(userType === 0){
      authHeader = `${userToken}`
      customer_registration(user,authHeader);
    } else {
      authHeader = `Bearer ${userToken}`;
      guest_registration(user,authHeader);
    // First save user
  //   const { GUEST_USER, CREATE_RESERVATION } = API_URL;
    }
}

const guest_registration = async (user,authHeader) => {
  setLoading(true)
  let event_date_id = parseInt(eventDateId, 10);
    let event_slot_id = parseInt(eventSlotId, 10);
    
    let reservation = {
      "user_id": userData.id,
      "event_date_id": event_date_id,
      }
      reservation = eventSlotId ?
        reservation = {
          ...reservation,
          "event_slot_id": event_slot_id
          } : reservation 

      createReservation(user,reservation,authHeader)

      let updatedUser = {
        ...user,
        id: userData.id,
      }
      setUser(updatedUser);
      dispatch(setCurrentUser(updatedUser));

      if(user['permission_to_text']){
        send_sms(user)
      }
      if(user['permission_to_email']){
        sendRegistrationConfirmationEmail(user, location)
       }
}


const customer_registration = async (user,authHeader) => {
    setLoading(true)
    let event_date_id = parseInt(eventDateId, 10);
    let event_slot_id = parseInt(eventSlotId, 10);
    let person = {
      "first_name":user.first_name,
      "date_of_birth": user.date_of_birth,
      "middle_name":user.middle_name,
      "last_name":user.last_name,
      "gender":user.gender,
      "suffix":user.suffix
      } 

    let phone = {
      "phone" : user.phone
      }

    let email = {
      "email" : user.email
      }

    let address = {
      "line_1": user.line_1,
      "line_2": user.line_2,
      "city": user.city,
      "state": user.state,
      "zip_code":user.zip_code
      }

    let reservation = {
      "user_id": userData.id,
      "event_date_id": event_date_id,
      }
      reservation = eventSlotId ?
        reservation = {
          ...reservation,
          "event_slot_id": event_slot_id
          } : reservation 
    
    updatePerson(person,authHeader)


    updateAddress(address,authHeader)

    if(!user.no_phone_number){
      
    updatePhone(phone,authHeader)
    }

    if(!user.no_email){
    updateEmail(email,authHeader)
    }
    let updatedUser = {
       ...user,
      //  ...person,
        //...phone,
        //...email,
        //...address,
      id: userData.id,
      //identification_code:userData.identification_code
    }
    setUser(updatedUser);
    dispatch(setCurrentUser(updatedUser));


    createReservation(user,reservation,authHeader)

  }
  if(pageError) {
    return (
      <ErrorComponent error={errors}/>
    );
  }

  const updatePerson = async(person,authHeader)=>{
    const {UPDATE_PEOPLE}= API_URL;
    let id = userData.id
    let UPDATE_PEOPLE_DATA = `${UPDATE_PEOPLE}/${id}`;
    try{
      await axios.post(UPDATE_PEOPLE_DATA, { person },
              { headers: { Authorization: authHeader } }
            );
            setLoading(false)
      }
    catch (e){
      if (!e.response){
          e.response = {data: {"user_id": ["Something Went Wrong"]}}
        }
        notify(e.response.data, 'error')
        setTimeout(()=> window.scrollTo(0, 0))
        setDisabled(disabled);
        console.error(e);
        setErrors(e);
        setLoading(false)
    }  
  }

  const updateAddress = async(address,authHeader)=>{
    const {UPDATE_ADDRESS}= API_URL;
    let id = personData.id;
    let URL = `${UPDATE_ADDRESS}`;
    try{
      await axios.post(URL,{ address },
              { headers: { Authorization: authHeader } }
            );
            setLoading(false)

    }
    catch (e){
      if (!e.response){
          e.response = {data: {"user_id": ["Something Went Wrong"]}}
        }
        notify(e.response.data, 'error')
        setTimeout(()=> window.scrollTo(0, 0))
        setDisabled(disabled);
        console.error(e);
        setErrors(e);
        setLoading(false)
    }
    
  }

  const updatePhone = async(phone,authHeader)=>{
    const {UPDATE_PHONE}= API_URL;
    try{
      await axios.post(UPDATE_PHONE, { phone },
              { headers: { Authorization: authHeader } }
            );
            setLoading(false)
    }
    
    catch (e){
      if (!e.response){
          e.response = {data: {"user_id": ["Something Went Wrong"]}}
        }
        notify(e.response.data, 'error')
        setTimeout(()=> window.scrollTo(0, 0))
        setDisabled(disabled);
        console.error(e);
        setErrors(e);
        setLoading(false)
    } 
  }

  
  const updateEmail  = async(email,authHeader)=>{
    const {UPDATE_EMAIL}= API_URL;
    try{
      await axios.post(UPDATE_EMAIL, { email },
              { headers: { Authorization: authHeader } }
            );
            setLoading(false)
    }
    catch (e){
      if (!e.response){
          e.response = {data: {"user_id": ["Something Went Wrong"]}}
        }
        notify(e.response.data, 'error')
        setTimeout(()=> window.scrollTo(0, 0))
        setDisabled(disabled);
        console.error(e);
        setErrors(e);
        setLoading(false)
    }  
  }

  const createReservation = async(user,reservation,authHeader)=>{
    
    let event_slot_id = parseInt(eventSlotId, 10);
    let identification_code;
    const {CREATE_EVENT_RESERVATION}= API_URL;
    try{
      const ReservationUpdateResp = await axios.post(CREATE_EVENT_RESERVATION,{ reservation },
                  { headers: { Authorization: authHeader } }
                );
                
     
    if(ReservationUpdateResp.data && ReservationUpdateResp.data){
      identification_code = ReservationUpdateResp.data.identification_code;
      user = {...user,identification_code : identification_code}
      if(user['permission_to_text']){
                  send_sms(user)
                }
      if(user['permission_to_email']){
                  sendRegistrationConfirmationEmail(user, location)
                }

                TagManager.dataLayer({
                  dataLayer: {
                  event: "reservation"
                  }
                })

                sessionStorage.setItem("registeredEventDateID", eventDateId);
                setLoading(false)

                history.push({
                  pathname: RENDER_URL.REGISTRATION_CONFIRM_URL,
                  state: { user: {...user, 
                              identification_code:identification_code}, 
                              eventDateId: eventDateId, 
                              eventTimeStamp : {
                                start_time: location.state?.event_slot?.start_time, 
                                end_time: location.state?.event_slot?.end_time,
                                event_slot_id: event_slot_id
                              } 
                            }
                });
    }
                
        }
        catch (e){
          if (!e.response){
              e.response = {data: {"user_id": ["Something Went Wrong"]}}
            }
            notify(e.response.data, 'error')
            setTimeout(()=> window.scrollTo(0, 0))
            setDisabled(disabled);
            console.error(e);
            setErrors(e);
            setLoading(false)
        }
  }

  return (
    
    <Fragment>
      <div>
      {isLoading && <SpinnerComponent />}
      </div>
      
      <Fragment>
        <NotifyToast />
          <RegistrationComponent
            user={{
                  ...user,
                  ...personData,
                  ...userData,
                  ...addressData,
                  ...phoneData,
                  ...emailData
                }}
            onRegister={register}
            event={selectedEvent}
            disabled={disabled} />
        </Fragment>
    </Fragment>
  );
};

export default RegistrationContainer;

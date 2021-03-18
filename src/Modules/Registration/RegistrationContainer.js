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
import {USER_TYPES} from '../../Utils/Constants';

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

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  const currentUser = useSelector(selectUser);
  //debugger
  const [user, setUser] = useState(currentUser);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

  useEffect(fetchBusinesses, []);

  function fetchBusinesses(){
    let userType = localStorage.getItem('userType');
    //setUserToken(localStorage.getItem('userToken'));
    setUserToken(userType == 1 ? 
      localStorage.getItem('userToken') : 
      localStorage.getItem('authtoken'));
    //debugger
    console.log("user token set >>",userToken)
    console.log("user token from localstrg >>",localStorage.getItem('userToken'))
    console.log("user is >>",user)
    if (!isError && !pageError) {
      if(Object.keys(selectedEvent).length === 0) {
        getEvent();
      }
      if(user === null ) {
        let userType = localStorage.getItem("userType");
        console.log("userType is >>",userType)
        getUser(userType == 1 ? 
          localStorage.getItem('userToken') : 
          localStorage.getItem('authtoken'));
        //getUser(localStorage.getItem('authtoken'));
        
    }
  }
}
  
  const getEvent = async () => {
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
    } catch (e) {
      console.error(e);
      setIsError(true);
      if(e.response){
        setPageError(true);
        setErrors(e.response.data);
      }
    }
  };





  const getUser = async token => {
    let userType = localStorage.getItem("userType");
    const { GUEST_USER } = API_URL;
    const { COGNITO_USER_DATA } = API_URL;
    console.log("checking usertype")
    //if(userType == USER_TYPES.GUEST) {
     // if(userType == USER_TYPES.GUEST) {
      try {
      setLoading(true);
      //const resp = await axios.get(GUEST_USER, {
        const resp = await axios.get(userType == 1 ? GUEST_USER : COGNITO_USER_DATA, {
        params: {},
        headers: { Authorization: userType == 1 ? `Bearer ${token}` : `${token}` },
      });
      const { data } = userType == 1 ? resp : resp.data;
      if (data["date_of_birth"] !== null){
        data["date_of_birth"] = formatMMDDYYYY(data["date_of_birth"]);
      }
      if (data["phone"] !== null){
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        data["phone"] = data["phone"].replace(phoneRegex, '($1) $2-$3')
      }
      dispatch(setCurrentUser(data));
      setUser(data);
      setLoading(false);
      console.log("success gettingUser...")
    } catch (e) {
      setLoading(false);
      console.error("error in reg container gteUser",e);
    }
  //}
  };



  const getReservationText = () => {
    return location.state? `Your reservation time is at ${location.state.event_slot.start_time} - ${location.state.event_slot.end_time} on ${location.state.event_date}. `: "";
  }

  const getCodeURL = (identification_code) => {
    return `Your QRCode for the Reservation ${CLIENT_URL}qrcode/${identification_code}`;
  }

  const notify = (msg, error) => {
    let formatted_msg = (msg.user_id && msg.user_id[0]) || msg.event_date_id[0] || "Something Went Wrong"
    showToast(formatted_msg, error);
  }
  const send_sms = async user => {
    const { TWILIO_SMS } = API_URL;
    let to_phone_number = user['phone']
    let identification_code =  user['identification_code']
    let message = `You have successfully registered for FreshTrak, ${getReservationText()} Your confirmation code is ${identification_code.toUpperCase()}.
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

  const register = async user => {
    setDisabled(!disabled);
    const event_date_id = parseInt(eventDateId, 10);
    const event_slot_id = parseInt(eventSlotId, 10);
    // First save user
    let userType = localStorage.getItem("userType");
    const { GUEST_USER, CREATE_RESERVATION,COGNITO_AUTH } = API_URL;
    
  if(userType == USER_TYPES.GUEST){ 
    try {
      await axios.post(GUEST_USER, { user }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      console.log("success register in reg container")
    } catch (e) {
      console.log("error while registering")
      console.log(e);
    }
    try {
      await axios.post(CREATE_RESERVATION, {
        reservation: eventSlotId ? {event_date_id, event_slot_id} : {event_date_id}
      },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      TagManager.dataLayer({
        dataLayer: {
        event: "reservation"
        }
      })
      if(user['permission_to_text']){
        send_sms(user)
      }
      sessionStorage.setItem("registeredEventDateID", eventDateId);
      history.push({
        pathname: RENDER_URL.REGISTRATION_CONFIRM_URL,
        state: { user: {...user,identification_code:currentUser.identification_code}, eventDateId: eventDateId, eventTimeStamp : {start_time: location.state?.event_slot?.start_time, end_time: location.state?.event_slot?.end_time} }
      });
    } catch (e) {
      if (!e.response){
        e.response = {data: {"user_id": ["Something Went Wrong"]}}
      }
      notify(e.response.data, 'error')
      setTimeout(()=> window.scrollTo(0, 0))
      setDisabled(disabled);
      setErrors(e);
    }
    }
    else{

    let data = {
      user,
      reservation: eventSlotId ? {event_date_id, event_slot_id} : {event_date_id}
    }

      try {
        const resp = await axios.post(COGNITO_AUTH, { data }, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
      } catch (e) {
        console.log(e);
      }

    }

  }

  if(pageError) {
    return (
      <ErrorComponent error={errors}/>
    );
  }

  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      <Fragment>
        <NotifyToast />
          <RegistrationComponent
            user={user}
            onRegister={register}
            event={selectedEvent}
            disabled={disabled} />
        </Fragment>
    </Fragment>
  );
};

export default RegistrationContainer;

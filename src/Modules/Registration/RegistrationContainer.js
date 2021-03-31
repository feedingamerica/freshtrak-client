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

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;

  const userType = localStorage.getItem('userType');

  

  const fetchBusinesses = () =>{ 
    let authToken;
    if(userType == 0 ){ 
      console.log()
      authToken = localStorage.getItem('authToken');      
    } else {
      authToken = localStorage.getItem('userToken');
    }
    if (!isError && !pageError) {
      setUserToken(authToken);
      if(Object.keys(selectedEvent).length === 0) {
        getEvent();
      }
      if(user === null) {
        getUser(authToken);
      }
    }
  }
  useEffect(fetchBusinesses, []);

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
    let url,authHeader;    
    setLoading(true);
    const { GUEST_USER ,COGNITO_USER} = API_URL;
    if(userType == 0){
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
      dispatch(setCurrentUser(data));
      setUser(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };
  const getReservationText = () => {
    return location.state? `Your reservation time is at ${location.state.event_slot.start_time} - ${location.state.event_slot.end_time} on ${location.state.event_date}. `: "";
  }

  const getCodeURL = (identification_code) => {
    return `Your QRCode for the Reservation ${CLIENT_URL}qrcode/${identification_code}/${eventDateId}${eventSlotId?"/" + eventSlotId: ""}`;
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
    
    if(userType == 0){
      customer_registration(user);
    } else {
    // First save user
      const { GUEST_USER, CREATE_RESERVATION } = API_URL;
      console.log(user,'<user data>',);
      try {
        await axios.post(GUEST_USER, { user }, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
      } catch (e) {
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

        if(user['permission_to_email']){
          sendRegistrationConfirmationEmail(user, location)
        }

        sessionStorage.setItem("registeredEventDateID", eventDateId);

        history.push({
          pathname: RENDER_URL.REGISTRATION_CONFIRM_URL,
          state: { user: 
            {...user,
              identification_code:currentUser.identification_code},
              eventDateId: eventDateId, 
              eventTimeStamp : {
                start_time: location.state?.event_slot?.start_time, 
                end_time: location.state?.event_slot?.end_time,
                event_slot_id: event_slot_id
              } 
            }
        });
      } catch (e) {
        if (!e.response){
          e.response = {data: {"user_id": ["Something Went Wrong"]}}
        }
        notify(e.response.data, 'error')
        setTimeout(()=> window.scrollTo(0, 0))
        setDisabled(disabled);
        console.error(e);
        setErrors(e);
      }
   }
  }

  const customer_registration = async (user) => {  
    let event_date_id = parseInt(eventDateId, 10);
    let event_slot_id = parseInt(eventSlotId, 10);
    const { USER_REGISTRATION } = API_URL;
    try {
        await axios.post(USER_REGISTRATION, { user :{user},
          reservation: eventSlotId ? {event_date_id, event_slot_id} : {event_date_id}
        
        },
          { headers: { Authorization: `${userToken}` } }
        );
        TagManager.dataLayer({
          dataLayer: {
          event: "reservation"
          }
        })
        if(user['permission_to_text']){
          send_sms(user)
        }
        if(user['permission_to_email']){
          sendRegistrationConfirmationEmail(user, location)
        }
        sessionStorage.setItem("registeredEventDateID", eventDateId);
        history.push({
          pathname: RENDER_URL.REGISTRATION_CONFIRM_URL,
          state: { user: {...user,
                      identification_code:currentUser.identification_code}, 
                      eventDateId: eventDateId, 
                      eventTimeStamp : {
                        start_time: location.state?.event_slot?.start_time, 
                        end_time: location.state?.event_slot?.end_time,
                        event_slot_id: event_slot_id
                      } 
                    }
        });
    } catch (e){
      if (!e.response){
          e.response = {data: {"user_id": ["Something Went Wrong"]}}
        }
        notify(e.response.data, 'error')
        setTimeout(()=> window.scrollTo(0, 0))
        setDisabled(disabled);
        console.error(e);
        setErrors(e);
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

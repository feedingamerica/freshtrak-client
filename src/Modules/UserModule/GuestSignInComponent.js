import React, { useState }from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL, RENDER_URL } from '../../Utils/Urls';
import TagManager from 'react-gtm-module';
import { useSelector } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import SpinnerComponent from '../General/SpinnerComponent';

const GuestSignInComponent = (props) => {  
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);


  const fetchUserToken = async () => {
    setLoading(true);
    const { GUEST_AUTH} = API_URL;
    try {
        const resp = await axios.post(GUEST_AUTH);
        const {
          data: { token, expires_at },
        } = resp;
        localStorage.setItem('userToken', token);
        localStorage.setItem('tokenExpiresAt', expires_at);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userType', 1);
        console.log("pushing reg url in guestsignincomp")
        if(selectedEvent && selectedEvent.id){
          console.log("going to reg url")
          history.push(`${RENDER_URL.REGISTRATION_FORM_URL}/${selectedEvent.id}`);
        }else{
          console.log("going to home")
          props.handleClose()
          setLoading(false)
          history.push(`${RENDER_URL.ROOT_URL}`);
        }
        
    } catch (e) {
      console.error(e);
    }
    
  };


  const onGuestLogin =  () => {
    
    localStorage.setItem('isLoggedIn', false);
    TagManager.dataLayer({
      dataLayer: {
      event: "guest-login"
      }
    })

    fetchUserToken()
  }


  return (
    <div>
       {isLoading && <SpinnerComponent />}      
      <button type="submit" className="btn btn-outline-secondary mt-3 w-100" onClick={onGuestLogin}>
        Continue as Guest
      </button> 
    </div>
  );
};

export default GuestSignInComponent;
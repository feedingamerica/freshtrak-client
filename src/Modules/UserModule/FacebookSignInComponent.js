import React, { useState }from 'react';
import { Auth } from 'aws-amplify';
import TagManager from 'react-gtm-module'
import {COGNITO_CONFIG}  from "../../Utils/Constants";
import { useSelector } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';

Auth.configure(COGNITO_CONFIG);

const FacebookSignInComponent = () => { 

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  const setEventInLocalStorage = () => {  
    localStorage.setItem('userType', 0);

    if(selectedEvent && selectedEvent.id)  {
      localStorage.setItem('selectedEventId', selectedEvent.id);
      localStorage.setItem('isLoggedIn', true);  
      localStorage.setItem('userType', 0);
    }

    TagManager.dataLayer({
      dataLayer: {
      event: 'facebook-login'
      }
    });
    
    Auth.federatedSignIn({provider: 'Facebook'})
  }

  return (
    <div>
      <button type="submit" className="btn fb-button mt-3 w-100" 
      onClick={() => setEventInLocalStorage()}>
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookSignInComponent;
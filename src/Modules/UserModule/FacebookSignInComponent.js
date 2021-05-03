import React, { useState }from 'react';
import { Auth } from 'aws-amplify';
import TagManager from 'react-gtm-module'
import {COGNITO_CONFIG}  from "../../Utils/Constants";
import { useSelector } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import SpinnerComponent from '../General/SpinnerComponent';

Auth.configure(COGNITO_CONFIG);

const FacebookSignInComponent = () => { 

  const event = useSelector(selectEvent);
  //const [selectedEvent, setSelectedEvent] = useState(event);
  const [isLoading, setLoading] = useState(false);

  const setEventInLocalStorage = () => {  
    localStorage.setItem('userType', 0);
    setLoading(true);
    if(event && event.id)  {
      localStorage.setItem('selectedEventId', event.id);
      //localStorage.setItem('isLoggedIn', true);
    }

    TagManager.dataLayer({
      dataLayer: {
      event: 'facebook-login'
      }
    });
    
    Auth.federatedSignIn({provider: 'Facebook'})
    .then(res=>{
      setLoading(false);
    })
    .catch(e=>{
      setLoading(false);
    })
  }

  return (
    <div>
      {isLoading && <SpinnerComponent />}
      <button type="submit" className="btn fb-button mt-3 w-100" 
      onClick={() => setEventInLocalStorage()}>
        Login with Facebook
      </button>
    </div>
  );
};

export default FacebookSignInComponent;
import React, { useState }from 'react';
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports";


import { useSelector } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import {useHistory } from 'react-router-dom';
import { RENDER_URL } from '../../Utils/Urls';


Auth.configure(awsExports);

const FacebookSignInComponent = () => { 

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  const setEventInLocalStorage=()=>{
  console.log("selectedEvent in fb comp",selectedEvent)
  if(selectedEvent && selectedEvent.id)
  localStorage.setItem('selectedEventId', selectedEvent.id);
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
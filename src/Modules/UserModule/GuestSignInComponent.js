import React, { useState }from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import { API_URL, RENDER_URL } from '../../Utils/Urls';
import TagManager from 'react-gtm-module';
import { useSelector,useDispatch } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import { setLoggedIn } from '../../Store/loggedInSlice';

const GuestSignInComponent = (props) => {  
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const event = useSelector(selectEvent);
  //const [selectedEvent, setSelectedEvent] = useState(event);
  const dispatch = useDispatch();


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
        dispatch(setLoggedIn(localStorage.getItem("isLoggedIn")))
        if(event && event.id){
          history.push(`${RENDER_URL.REGISTRATION_FORM_URL}/${event.id}`);
        }else{
          props.handleClose()
          setLoading(false)
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('userType',1);
          dispatch(setLoggedIn(localStorage.getItem("isLoggedIn")))
          history.push(`${RENDER_URL.ROOT_URL}`);
        }
        
    } catch (e) {
      console.error(e);
      setLoading(false)
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
      <button type="submit" data-testid="continue-as-guest" className="btn btn-outline-secondary mt-3 w-100" onClick={onGuestLogin}>
        Continue as Guest
      </button> 
    </div>
  );
};

export default GuestSignInComponent;
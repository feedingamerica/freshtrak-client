import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import { API_URL, BASE_URL, RENDER_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationTextInfoComponent from '../Registration/RegistrationTextInfoComponent';
import AuthenticationModalComponent from '../Authentication/AuthenticationModal';
import { EventFormat } from '../../Utils/EventHandler';
import TagManager from 'react-gtm-module';

//new changes for 18.1 User Module
import UserBlockContainer from '../UserModule/UserBlockContainer';
import {Modal,Button} from 'react-bootstrap';

const RegistrationEventDetailsContainer = (props) => {
  const history = useHistory();

  const { id: eventDateId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [showAuthenticationModal, setshowAuthenticationModal] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
  const [isSuccessful, setSuccessful] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  useEffect(() => {
      if(Object.keys(selectedEvent).length === 0 && !isError && !pageError) {
        getEvent();
      }
  });

  const getEvent = async () => {
    try {
      const resp = await axios.get(
        `${BASE_URL}api/event_dates/${eventDateId}/event_details`
      ).catch(error=>{
        console.log("error in getEvent")
        setIsError(true);
      })
      const { data } = resp;
      if (data && data.event !== undefined) {
        setSelectedEvent(EventFormat(data.event, eventDateId));
        setLoading(false);
        setSuccessful(true);
      } else {
        console.log("in else of getEvent")
        setPageError(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserToken = async (response) => {
    setLoading(true);
    const { GUEST_AUTH, FB_AUTH} = API_URL;
    try {
      if(response){
        const resp = await axios({
          method: 'post',
          url: FB_AUTH,
          data: JSON.stringify(response),
          headers: { 'Content-Type': 'application/json' }
        });
        const {
          data: { authentication },
        } = resp;
        TagManager.dataLayer({ dataLayer: { event: "returning-customer-login" } })
        localStorage.setItem('userToken', authentication.token);
        localStorage.setItem('tokenExpiresAt', authentication.expires_at);
        setLoading(false);
      }else{
        const resp = await axios.post(GUEST_AUTH);
        const {
          data: { token, expires_at },
        } = resp;
        localStorage.setItem('userToken', token);
        localStorage.setItem('tokenExpiresAt', expires_at);
      setLoading(false);
      history.push(`${RENDER_URL.REGISTRATION_FORM_URL}/${selectedEvent.id}`);
      }
    } catch (e) {
      console.error(e);
      setshowAuthenticationModal(false);
      setLoading(false);
    }
  };

  const getUserToken = (response) => { 

    let userType ,localUserToken, tokenExpiresAt;
    userType = localStorage.getItem('userType');;
    
    if(userType == 0){
      localUserToken = localStorage.getItem('authToken');
    } else {
      localUserToken = localStorage.getItem('userToken');
      tokenExpiresAt = localStorage.getItem('tokenExpiresAt');
    }
    

    if (new Date(tokenExpiresAt) < new Date() || !localUserToken || localUserToken === 'undefined') {
      setLoading(false);
      showAuthenticationModal ? fetchUserToken(response) : setshowAuthenticationModal(true);
      
    } else {
      setUserToken(localUserToken);
      setshowAuthenticationModal(false);
      setLoading(false);
      history.push(`${RENDER_URL.REGISTRATION_FORM_URL}/${selectedEvent.id}`);
    }
  };

  const handleClose = () => setshowAuthenticationModal(false);
  const handleShow = () => setshowAuthenticationModal(true);

  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      {/* <AuthenticationModalComponent
            show={showAuthenticationModal}
            setshow={setshowAuthenticationModal}
            onLogin={getUserToken} /> */}


    <Modal show={showAuthenticationModal} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <UserBlockContainer
          onLogin={()=>getUserToken}
          handleClose={()=>setshowAuthenticationModal(false)} />
        </Modal.Body>
      </Modal>


      {!isLoading && isSuccessful && (
        <div className="mt-4">
          <section className="container pt-100 pb-100 register-confirmation">
            <RegistrationTextInfoComponent event={selectedEvent} onRegisterNow={getUserToken} />
          </section>
        </div>
      ) }
    </Fragment>
  );
};

export default RegistrationEventDetailsContainer;

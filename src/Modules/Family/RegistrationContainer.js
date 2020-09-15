import React, { Fragment, useEffect, useState } from 'react';
import TagManager from 'react-gtm-module'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import { API_URL, BASE_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationComponent from './RegistrationComponent';
import RegistrationConfirmComponent from './RegistrationConfirmComponent';
import LoginModalComponent from '../Sign-In/LoginModal';
import { EventFormat } from '../../Utils/EventHandler';

const RegistrationContainer = (props) => {
  const { eventDateId, eventSlotId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSuccessful, setSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const [showForm, setShowForm] = useState(false);

  //const showForm = () => setShowForm(true);

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  useEffect(() => {
      if(Object.keys(selectedEvent).length === 0 && !isError && !pageError) {
        const { match: { params: { eventDateId } } } = props;
        getEvent(eventDateId);
      }
  });

  const getEvent = async (eventId) => {
    try {
      const resp = await axios.get(
        `${BASE_URL}api/event_dates/${eventDateId}/event_details`
      ).catch(error=>{
        setIsError(true);
      })
      const { data } = resp;
      if (data && data.event !== undefined) {
        setSelectedEvent(EventFormat(data.event, eventDateId));
      } else {
        setPageError(true);
        setErrors(data.errors || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUserToken = async () => {
    setLoading(true);
    const { GUEST_AUTH } = API_URL;
    try {
      const resp = await axios.post(GUEST_AUTH);
      const {
        data: { token, expires_at },
      } = resp;
      localStorage.setItem('userToken', token);
      localStorage.setItem('tokenExpiresAt', expires_at);
      setUserToken(token);
      setShowLoginModal(false);
      setLoading(false);
      getUser(token);
      setShowForm(true);
    } catch (e) {
      console.error(e);
      setShowLoginModal(false);
      setLoading(false);
    }
  };

  const getUserToken = () => {
    TagManager.dataLayer({
      dataLayer: {
      event: "guest-login"
      }
    })
    const localUserToken = localStorage.getItem('userToken');
    const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');
    if (new Date(tokenExpiresAt) < new Date() || !localUserToken || localUserToken === 'undefined') {
      showLoginModal ? fetchUserToken() : setShowLoginModal(false);
    } else {
      setUserToken(localUserToken);
      setShowLoginModal(false);
      setShowForm(true);
    }
  };

  const getUser = async token => {
    setLoading(true);
    const { GUEST_USER } = API_URL;
    try {
      const resp = await axios.get(GUEST_USER, {
        params: {},
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = resp;
      setUser(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const register = async user => {
    setDisabled(!disabled);
    const event_date_id = parseInt(eventDateId, 10);
    const event_slot_id = parseInt(eventSlotId, 10);
    // First save user
    const { GUEST_USER, CREATE_RESERVATION } = API_URL;
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
      setSuccessful(true);
      getUser(userToken);
      setErrors([]);
      TagManager.dataLayer({
        dataLayer: {
        event: "reservation"
        }
      })
    } catch (e) {
      setDisabled(disabled);
      console.error(e);
      setErrors(e);
    }
  }

  const showRegistrationForm = () => {
    user ? setShowForm(true) : setShowLoginModal(true)
  }

  if(pageError) {
    return (
      <div className="pt-100 container">
        <p className="text-danger">There was an error saving your reservation</p>
        {
          errors.map((error, index) => {
            return <p key={`error-${index}`} className="text-danger">{error}</p>
          })
        }
      </div>
    );
  }

  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      <LoginModalComponent
            show={showLoginModal}
            onLogin={getUserToken} />
      {!isLoading && !isSuccessful && (
        <Fragment>
          <RegistrationComponent
            user={user}
            showForm={!showLoginModal && showForm}
            setShowForm={showRegistrationForm}
            onRegister={register}
            event={selectedEvent}
            disabled={disabled} />
        </Fragment>
      )}
      {isSuccessful && user && (
        <div className="container">
          <RegistrationConfirmComponent user={user} eventDateId={eventDateId} />
        </div>
      )}
      {isError && (
        <div className="container">
          <p className="text-danger">There was an error saving your reservation</p>
        </div>
      )}
    </Fragment>
  );
};

export default RegistrationContainer;

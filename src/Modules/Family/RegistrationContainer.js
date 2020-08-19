import React, { Fragment, useEffect, useState } from 'react';
import TagManager from 'react-gtm-module'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import { API_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationComponent from './RegistrationComponent';
import RegistrationConfirmComponent from './RegistrationConfirmComponent';
import EventSlotsModalComponent from './EventSlotsModalComponent';

const RegistrationContainer = (props) => {
  const { eventDateId, eventSlotId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
  const [isSuccessful, setSuccessful] = useState(false);
  const [isError, setError] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [disabled, setDisabled] = useState(false);
  const event = useSelector(selectEvent);
  useEffect(() => {
    if (userToken === undefined) {
      getUserToken();
    } else {
      getUser(userToken);
    }
  }, [userToken]);

  const getUserToken = async () => {
    const localUserToken = localStorage.getItem('userToken');
    const tokenExpiresAt = localStorage.getItem('tokenExpiresAt');
    if (new Date(tokenExpiresAt) < new Date() || !localUserToken || localUserToken === 'undefined') {
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
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    } else {
      setUserToken(localUserToken);
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
      setError(undefined);
      TagManager.dataLayer({
        dataLayer: {
        event: "reservation"
        }
      })
    } catch (e) {
      setDisabled(disabled);
      console.error(e);
      setError(e);
    }
  }

  return (
    <Fragment>
      {<EventSlotsModalComponent event={event} />}
      {isLoading && <SpinnerComponent />}
      {!isLoading && user && !isSuccessful && (
        <RegistrationComponent user={user} onRegister={register} event={event} disabled={disabled} />
      )}
      {isSuccessful && (
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

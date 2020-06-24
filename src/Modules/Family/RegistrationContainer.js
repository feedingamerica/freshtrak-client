import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerComponent from '../General/SpinnerComponent';
import { API_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationComponent from './RegistrationComponent';
import RegistrationConfirmComponent from './RegistrationConfirmComponent';

const RegistrationContainer = (props) => {
  const { eventDateId, eventSlotId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
  const [isSuccessful, setSuccessful] = useState(false);
  const [isError, setError] = useState(undefined);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    if (userToken === undefined) {
      getUserToken();
    } else {
      getUser(userToken);
    }
  }, [userToken]);

  const getUserToken = async () => {
    const localUserToken = localStorage.getItem('userToken');
    if (!localUserToken || localUserToken === 'undefined') {
      setLoading(true);
      const { GUEST_AUTH } = API_URL;
      try {
        const resp = await axios.post(GUEST_AUTH);
        const {
          data: { token },
        } = resp;
        localStorage.setItem('userToken', token);
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
    const event_date_id = parseInt(eventDateId, 10);
    const event_slot_id = parseInt(eventSlotId, 10) || '';
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
        reservation: { event_date_id, event_slot_id }
      },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setSuccessful(true);
      getUser(userToken);
      setError(undefined);
    } catch (e) {
      console.error(e);
      setError(e);
    }
  }

  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      {!isLoading && user && !isSuccessful && (
        <RegistrationComponent user={user} onRegister={register} />
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

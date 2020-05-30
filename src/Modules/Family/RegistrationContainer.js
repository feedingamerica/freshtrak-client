import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerComponent from '../General/SpinnerComponent';
import { API_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationComponent from './RegistrationComponent';

const RegistrationContainer = () => {
  const { eventId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
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

  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      {!isLoading && user && (
        <RegistrationComponent eventId={eventId} user={user} />
      )}
    </Fragment>
  );
};

export default RegistrationContainer;

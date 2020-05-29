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
  useEffect(() => {
    if (userToken === undefined) {
      getUser();
    }
  }, [userToken]);

  const getUser = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken || userToken === 'undefined') {
      setLoading(true);
      const { GUEST_AUTH } = API_URL;
      try {
        const resp = await axios.post(GUEST_AUTH);
        const { data: { token } } = resp;
        localStorage.setItem('userToken', token);
        setUserToken(token);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    } else {
      setUserToken(userToken);
    }
  };
  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      {!isLoading && <RegistrationComponent />}
    </Fragment>
  );
};

export default RegistrationContainer;

import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../Utils/Urls';
import axios from 'axios';

const RegistarationContainer = () => {
  const { eventId } = useParams();
  const [userToken, setUserToken] = useState(undefined);
  useEffect(() => {
    if (userToken === undefined) {
      getUser();
    }
  }, [userToken]);

  const getUser = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken || userToken === 'undefined') {
      const { GUEST_AUTH } = API_URL;
      try {
        const resp = await axios.post(GUEST_AUTH);
        const { data: { token } } = resp;
        localStorage.setItem('userToken', token);
        setUserToken(token);
      } catch (e) {
        console.error(e);
      }
    } else {
      setUserToken(userToken);
    }
  };
  return (
    <Fragment>
      <h2>{eventId}</h2>
      <h1>{userToken}</h1>
    </Fragment>
  );
};

export default RegistarationContainer;

import React, { Fragment, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentEvent, selectEvent } from '../../Store/Events/eventSlice';
import { setCurrentUser, selectUser } from '../../Store/userSlice';
import SpinnerComponent from '../General/SpinnerComponent';
import ErrorComponent from '../General/ErrorComponent';
import { API_URL, BASE_URL, RENDER_URL } from '../../Utils/Urls';
import axios from 'axios';
import RegistrationComponent from './RegistrationComponent';
import { EventFormat } from '../../Utils/EventHandler';

const RegistrationContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { eventDateId, eventSlotId } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);

  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUserToken(localStorage.getItem('userToken'));
    if (!isError && !pageError) {
      if(Object.keys(selectedEvent).length === 0) {
        getEvent();
      }
      if(user === null) {
        getUser(localStorage.getItem('userToken'));
      }
    }
  });

  const getEvent = async () => {
    try {
      const resp = await axios.get(
        `${BASE_URL}api/event_dates/${eventDateId}/event_details`
      )
      const { data } = resp;
      if (data && data.event !== undefined) {
        const eventData = EventFormat(data.event, eventDateId);
        dispatch(setCurrentEvent(eventData));
        setSelectedEvent(eventData);
      } else {
        setPageError(true);
        setErrors(data.errors || []);
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
      if(e.response){
        setPageError(true);
        setErrors(e.response.data);
      }
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
      dispatch(setCurrentUser(data));
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
      history.push({
        pathname: RENDER_URL.EVENT_REGISTRATION_CONFIRM_URL,
        state: { user: {...user,identification_code:currentUser.identification_code}, eventDateId: eventDateId}
      });
    } catch (e) {
      setDisabled(disabled);
      console.error(e);
      setErrors(e);
    }
  }

  if(pageError) {
    return (
      <ErrorComponent error={errors}/>
    );
  }

  return (
    <Fragment>
      {isLoading && <SpinnerComponent />}
      <Fragment>
          <RegistrationComponent
            user={user}
            onRegister={register}
            event={selectedEvent}
            disabled={disabled} />
        </Fragment>
    </Fragment>
  );
};

export default RegistrationContainer;

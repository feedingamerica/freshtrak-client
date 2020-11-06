import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../../Assets/scss/main.scss';
import axios from 'axios';
import { API_URL} from '../../Utils/Urls';
import { EventFormat } from '../../Utils/EventHandler';
import EventListComponent from '../Events/EventListComponent';

const UsersRegistrations = props => {
  const [events,setEvents] = useState();
  const [usersReservation,setUsersReservation] = useState();
  const [loading, setLoading] = useState(true);

  useEffect( () =>{
    const usersReservation = getUsersReservations();
  }, []);
  const getUsersReservations = async () =>{
    const userToken = localStorage.getItem('userToken');
    const {CREATE_RESERVATION, EVENT_URL} = API_URL;
    try {
      const usersRegData = await axios.get(CREATE_RESERVATION, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setUsersReservation(usersRegData.data);
      getEvents(usersRegData.data);
      // setLoading();
      console.log("*****usersRegData*****", usersRegData)
    } catch (e) {
      console.log(e);
    } 
  }
  const getEvents = async (userRegData) =>{
    const userRegEvents = []; 
    const {EVENT_URL} = API_URL;
    userRegData.map( (userReg) => {
      userRegEvents.push(axios.get(`${EVENT_URL}?event_date_id=${userReg.event_date_id}`))
    }
    )
    const regEvents = await axios.all(userRegEvents)
    const events = [];
    regEvents.map((event, index) => {
      events.push(EventFormat(event,userRegData[index].event_date_id))
    })
    setEvents(events);
    console.log("inside getEvents for events******",regEvents)
  }

  return (
    <Fragment>
      <h2 className="font-weight-bold mobile-text-left">
        Your Registrations
      </h2>
      {events && <EventListComponent events={events} showHeader= {false} registrationView = {true}/>}
    </Fragment>
  );
};

export default UsersRegistrations;
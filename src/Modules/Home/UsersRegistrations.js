import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import '../../Assets/scss/main.scss';
import axios from 'axios';
import { API_URL} from '../../Utils/Urls';
import { HomeEventFormat } from '../../Utils/EventHandler';
import EventListComponent from '../Events/EventListComponent';
import EventCardComponent from '../Events/EventCardComponent';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import '../../Assets/scss/main.scss';

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
    regEvents.forEach((event, index) => {
      let filteredEvents;
      if (event.data?.events[0]){
         filteredEvents = HomeEventFormat(event.data.events[0],userRegData[index].event_date_id) 
      }
      filteredEvents && events.push(filteredEvents)
    });
    setEvents(events);
  }

  return (
    <Fragment>
      <h2 className="font-weight-bold mt-60">
        Your UpComing Reservations
      </h2>
      <div className="search-results-list">
      <div className="row mt-5">
            <div className="col-md-12">
              <div className="day-view">
                <div className="row mt-2">
                {events && events.map(event => (
                    <EventCardComponent key={event.id} event={event}/>
                ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </Fragment>
  );
};

export default UsersRegistrations;
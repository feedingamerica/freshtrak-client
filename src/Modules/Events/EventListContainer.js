import React, { useState, useEffect, Fragment } from 'react';
import EventListComponent from './EventListComponent';
import { EventHandler } from '../../Utils/EventHandler';
import { API_URL } from '../../Utils/Urls';
import SpinnerComponent from '../General/SpinnerComponent';
import axios from 'axios';

const EventListContainer = ({ zipCode , agencyData}) => {
  const [loading, setLoading] = useState(false);
  const EventList = () => {
    const agencyDataSorted = EventHandler(agencyData);
    return <EventListComponent events={agencyDataSorted} zipCode={zipCode} />;
  };

  return (
    <Fragment>
      {!loading && <EventList />}
      {loading && <SpinnerComponent />}
    </Fragment>
  );
};

export default EventListContainer;

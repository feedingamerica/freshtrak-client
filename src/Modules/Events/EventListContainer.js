import React, { useState, useEffect, Fragment } from 'react';
import EventListComponent from './EventListComponent';
import { EventHandler } from '../../Utils/EventHandler';
import { API_URL } from '../../Utils/Urls';
import SpinnerComponent from '../General/SpinnerComponent';
import axios from 'axios';

const EventListContainer = ({ zipCode }) => {
  const [agencyResponse, setAgencyResponse] = useState(false);
  const [agencyData, setAgencyData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (zipCode) {
      getEvents(zipCode);
    }
  }, [zipCode]);

  const getEvents = async zip => {
    if (zip) {
      setLoading(true);
      try {
        const resp = await axios.get(API_URL.EVENTS_LIST, {
          params: { zip_code: zip },
        });

        const {
          data: { agencies },
        } = resp;
        setAgencyData(agencies);
        setAgencyResponse(true);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  const EventList = () => {
    if (agencyResponse) {
      const agencyDataSorted = EventHandler(agencyData);
      return <EventListComponent events={agencyDataSorted} />;
    }
    return null;
  };

  return (
    <Fragment>
      {!loading && <EventList />}
      {loading && <SpinnerComponent />}
    </Fragment>
  );
};

export default EventListContainer;

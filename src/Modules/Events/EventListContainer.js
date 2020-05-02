import React, { useState, useEffect, Fragment } from 'react';
import EventListComponent from './EventListComponent';
import { EventHandler } from '../../Utils/EventHandler';
import { API_URL } from '../../Utils/Urls';
import axios from 'axios';
import './event-styles.css'

const EventListContainer = ({ searchData }) => {
  const [agencyResponse, setAgencyResponse] = useState(false);
  const [agencyData, setAgencyData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isSearchData = !!searchData.zip_code;
    const buildSearchData = data => {
      if (Object.keys(data)[0]) {
        handleSubmit(data);
      }
    };

    if (isSearchData) {
      buildSearchData(searchData);
    }
  }, [searchData]);

  const handleSubmit = async (query) => {
    if (query) {
      setLoading(true);
      const { zip_code } = query;
      try {
        const resp = await axios.get(API_URL.EVENTS_LIST, { params: { zip_code } });
        const { data: { agencies } } = resp;
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
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border loading-spinner-height" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EventListContainer;

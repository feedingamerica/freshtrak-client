import React, { useState, useEffect } from 'react';
import EventListComponent from './EventListComponent';
import { EventHandler } from '../../Utils/EventHandler';
import { API_URL } from '../../Utils/Urls';
import axios from 'axios';

const EventListContainer = (props) => {
  const {searchData} = props; 
  const [agencyResponse, setAgencyResponse] = useState(false);
  const [agencyData, setAgencyData] = useState({});

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



  const handleSubmit = async query => {
    if (query) {
      const { zip_code } = query;
      try {
        const resp = await axios.get(API_URL.EVENTS_LIST, { params: { zip_code } });        
        const { data: { agencies} } = resp;
        setAgencyData(agencies);
        setAgencyResponse(true);
      } catch (err) {
        console.error(err);
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
    <EventList />
  );
}

export default EventListContainer;

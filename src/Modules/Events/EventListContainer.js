import React, { useState, Fragment } from 'react';
import EventListComponent from './EventListComponent';
import { EventHandler } from '../../Utils/EventHandler';

const EventListContainer = ({ zipCode , agencyData}) => {
  const EventList = () => {
    const agencyDataSorted = EventHandler(agencyData);
    return <EventListComponent events={agencyDataSorted} zipCode={zipCode} />;
  };

  return (
    <Fragment>
      <EventList />
    </Fragment>
  );
};

export default EventListContainer;

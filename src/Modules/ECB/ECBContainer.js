import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { EventFormat } from '../../Utils/EventHandler';
import { BASE_URL, RENDER_URL } from '../../Utils/Urls';
import EventSlotsModalComponent from '../Family/EventSlotsModalComponent';
import { selectEvent } from '../../Store/Events/eventSlice';
import { useParams } from 'react-router-dom';
import ECBOverlay from './EventOverlayComponent';

const ECBContainer = (props) => {
  const { id: eventDateId } = useParams();
  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [isSuccessful, setSuccessful] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
      if(Object.keys(selectedEvent).length === 0 && !isError && !pageError) {
        getEvent();
      }
  });

  const getEvent = async () => {
    try {
      const resp = await Axios.get(
        `${BASE_URL}api/event_dates/${eventDateId}/event_details`
      ).catch(error=>{
        setIsError(true);
      })
      const { data } = resp;
      if (data && data.event !== undefined) {
        setSelectedEvent(EventFormat(data.event, eventDateId));
        setLoading(false);
        setSuccessful(true);
      } else {
        setPageError(true);
      }
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div >
      <section className="gray-bg">
        <div className="container pt-150 pb-150 register-confirmation">
          <ECBOverlay event={selectedEvent} />
        </div>
      </section>
      {/* <EventSlotsModalComponent event={selectedEvent} targetUrl={RENDER_URL.ECB_CONTAINER}/> */}
    </div>
  );
};

export default ECBContainer;

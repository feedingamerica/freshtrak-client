import Axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EventFormat } from '../../Utils/EventHandler';
import { BASE_URL, RENDER_URL } from '../../Utils/Urls';
import EventSlotsModalComponent from '../Family/EventSlotsModalComponent';
import { selectEvent, setCurrentEvent } from '../../Store/Events/eventSlice';
import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const ECBOverlay = (props) => {
  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [isError, setIsError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [isSuccessful, setSuccessful] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    event: {
      id,
      startTime,
      endTime,
      date,
      eventAddress,
      eventCity,
      eventState,
      eventZip,
      phoneNumber,
      agencyName,
      eventName,
      eventService,
      acceptReservations,
      acceptInterest,
      eventDetails,
      exceptionNote
    },
    registrationView,
  } = props;

  const getButton = (buttonName, targetUrl) => {
    return (
      <LinkContainer to={targetUrl}>
        <button
          type="button"
          className="btn custom-button ml-1 flex-grow-1"
          onClick={() => dispatch(setCurrentEvent(props.event))}
        >
          {buttonName}
        </button>
      </LinkContainer>
    )
  }

  const ButtonView = () => {
    let targetUrl = `${RENDER_URL.REGISTRATION_FORM_URL}/${id}`
    if (registrationView) {
      return null;
    }
    if (acceptReservations) {
      return getButton('Reserve Time', targetUrl)
    } else if (acceptInterest && !acceptReservations) {
      return getButton('RSVP', targetUrl)
    } else {
      return null;
    }
  };


  return (
    <Fragment>  
      <div className="search-area" style={{"marginTop":"-10%"}}>
        <div className="row mt-2">
          <div className="col-lg-4">
            <LinkContainer to="/home">
              <button
                type="button"
                className="btn custom-button ml-1 flex-grow-1"
                onClick={() => dispatch(setCurrentEvent(props.event))}
              >
                Edit data
              </button>
            </LinkContainer>  
          </div>
          <div className="col-lg-4 "></div>
          <div className="col-lg-4">{ButtonView()}</div>
        </div>


        <section className="search-results" aria-live="polite">
          <div className="search-list-title">Event Details</div>
          <div className="row align-items-center mt-2">
            <div className="col-lg-4 col-sm-6">
              <div className="d-flex align-items-center">{date}</div>
            </div>
            <div className="col-lg-4 col-sm-6 caption-text"></div>
            <div className="col-lg-4 col-sm-6 caption-text">{startTime} - {endTime}</div>
          </div>
        </section>
        <hr/>
        <section className="search-results" aria-live="polite">
          <div className="search-list-title">Address</div>
          <div className="row align-items-center mt-2">
            <div className="col-lg-4 col-sm-6">
              <div className="d-flex align-items-center">
               <div className="ml-2 link-wrap"><a href="http://">link</a></div>
              </div>
              <div className="d-flex align-items-center">
                <span className="ml-2">{eventAddress}</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="ml-2">{eventCity} {eventState} </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="ml-2">{eventZip}</span>
              </div>
            </div>
            </div>
        </section>
        <hr/>
        <section className="search-results" aria-live="polite">
          <div className="search-list-title">Details</div>
          <div className="row align-items-center mt-2">
            <div className="col-lg-12 col-sm-6">
              <div className="d-flex align-items-center">Your family will....</div>
              </div>
            </div>
        </section>
      </div>
    </Fragment>
  );
};

export default ECBOverlay;

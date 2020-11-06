/**
 * Event Card Component
 */
import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch } from 'react-redux';
import { setCurrentEvent } from '../../Store/Events/eventSlice';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import { RENDER_URL } from '../../Utils/Urls';
import '../../Assets/scss/main.scss';

const EventCardComponent = props => {
  const [showDetails, setShowDetails] = useState(false);
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
    registrationView
  } = props;
  const showRsvp = acceptInterest && !acceptReservations;

  // const ButtonView = () => {
  //   if(registrationView) {
  //     return null;
  //   }
  //   if (acceptReservations) {
  //     return (
  //     <LinkContainer to={`${RENDER_URL.REGISTRATION_EVENT_DETAILS_URL}/${id}`}>
  //       <button
  //         type="button"
  //         className="btn custom-button ml-1 flex-grow-1"
  //         onClick={() => dispatch(setCurrentEvent(props.event))}
  //       >
  //         Reserve Time
  //       </button>
  //     </LinkContainer>
  //     )
  //   } else if (acceptInterest && !acceptReservations) {
  //     return (
  //       <LinkContainer to={`${RENDER_URL.REGISTRATION_EVENT_DETAILS_URL}/${id}`}>
  //         <button
  //           type="button"
  //           className="btn custom-button ml-1 flex-grow-1"
  //           onClick={() => dispatch(setCurrentEvent(props.event))}
  //         >
  //           RSVP
  //         </button>
  //       </LinkContainer>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

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
    let targetUrl = props.targetUrl != undefined ?  `${props.targetUrl}/${id}`:`${RENDER_URL.REGISTRATION_EVENT_DETAILS_URL}/${id}`
    if(registrationView) {
      return null;
    }
    if (acceptReservations) {
      return getButton('Reserve Time', targetUrl)
    } else if (showRsvp) {
      return getButton('RSVP', targetUrl)
    } else {
      return null;
    }
  };

  return (
    <section className={registrationView ? "" : "col-lg-4 col-xl-4"} tabIndex="0">
      <div className="day-view-item">
        <div className="day-view-item-header">
          <div className="day-view-header-title">{agencyName}</div>
          <div className="day-view-header-title">{eventName}</div>
          <div className="day-view-item-location d-flex justify-content-between">
            <div className="day-view-item-name">{eventService}</div>
          </div>
        </div>
        <div className="day-view-item-details mb-3 d-flex flex-column justify-content-between">
          {/* <div className="registration-required">
              <span className="registration-required-label">Registration Required</span>
            </div> */}
          <div className="timings d-flex justify-content-between">
            <div className="date-wrapper">{formatDateDayAndDate(date)}</div>
            <div className="timing-wrapper">
              {startTime} - {endTime}
            </div>
          </div>
          <div className="address-wrap">
            {eventAddress}
            <br />
            {eventCity} {eventState} {eventZip}
            <br />
            {phoneNumber}
            <br />
          </div>
          {exceptionNote && exceptionNote !== '' && (
            <div className="timings">
              Service Area Limitations:
              <br />
              <span className="text-danger" data-testid="exception-note">{exceptionNote}</span>
              <br />
            </div>
          )}
          {showDetails && (
            <div className="">
              <p>
                <b> Information </b>
                <br />
                {eventDetails}
              </p>
            </div>
          )}
         {!!showRsvp && <span className="text-danger font-size-point-85rem">RSVP is required for this event</span>}
          <div className="day-view-item-detail-footer d-flex mt-3">
            {eventDetails && eventDetails.length > 0 && (
              <button
                className="btn default-button flex-grow-1"
                onClick={() => {
                  setShowDetails(!showDetails);
                }}
              >
                {!showDetails ? 'View Details' : 'Hide details'}
              </button>
            )}
            {ButtonView()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCardComponent;

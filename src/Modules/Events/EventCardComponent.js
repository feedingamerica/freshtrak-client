/**
 * Event Card Component
 */
import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import { RENDER_URL } from '../../Utils/Urls';
import '../../Assets/scss/main.scss';
import ReserveTimeButton from './ReserveTimeButton';

const EventCardComponent = props => {
  const [showDetails, setShowDetails] = useState(false);
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
  } = props;

  const ButtonView = () => {
    if (acceptReservations) {
      return <ReserveTimeButton event_date_id={id} />;
    } else if (acceptInterest && !acceptReservations) {
      return (
        <LinkContainer to={`${RENDER_URL.EVENT_REGISTRATION_URL}/${id}`}>
          <button type="button" className="btn custom-button ml-1 flex-grow-1">
            RSVP
          </button>
        </LinkContainer>
      );
    } else {
      return null;
    }
  };

  return (
    <section className="col-lg-4 col-xl-4" tabIndex="0">
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
              <span className="text-danger">{exceptionNote}</span>
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
          <div className="day-view-item-detail-footer d-flex mt-3">
            {eventDetails.length > 0 && (
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

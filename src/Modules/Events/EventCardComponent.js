/**
 * Event Card Component
 */
import React,{useContext} from 'react';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import '../../Assets/scss/main.scss';
import EventContext from '../../Store/ContextApi/EventContext';

const EventCardComponent = (props) => {

  const eventContext = useContext(EventContext);
  const {
    event: {
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
    },
  } = props;

  const loadEventDetails = () =>{
   
    eventContext.setCurrentEvent(props.event);
    eventContext.showEventDetails(true);
  }
  return (
    <div className="col-12">
      <div className="day-view-item">
        <div className="day-view-item-header">
          <div className="day-view-header-title">{agencyName}</div>
          <div className="day-view-header-title">{eventName}</div>
          <div className="day-view-item-location d-flex justify-content-between">
            <div className="day-view-item-name">{eventService}</div>
          </div>
        </div>
        <div className="day-view-item-details">
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
            {eventCity} {eventState} {eventZip}<br />
            {phoneNumber}
          </div>
          
          <div className="day-view-item-detail-footer d-flex mt-3">
            <button className="btn default-button flex-grow-1" onClick={loadEventDetails}>
              View Details
            </button>
            {/* Out of scope */}
            {/* <button className="btn custom-button ml-1 flex-grow-1">
              Reserve Time
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardComponent;

import React, { Fragment, useEffect, useState } from 'react';
import TagManager from 'react-gtm-module'


import RegistrationHeaderComponent from './RegistrationHeaderComponent';
import EventCardComponent from '../Events/EventCardComponent';
import BackButtonComponent from '../General/BackButtonComponent';

const RegistrationTextInfoComponent = ({event, onRegisterNow}) => {
const isFBLoggedIn = localStorage.getItem("isFBLoggedIn");
  const clickedRegisterNow = () => {
    onRegisterNow(true)
    TagManager.dataLayer({
      dataLayer: {
      event: "modal-open"
      }
    })
  }
  return (
    <Fragment>
      <BackButtonComponent />
      {!isFBLoggedIn && <RegistrationHeaderComponent event={event} />}
      { event &&
        <div className="col-6">
          <div className="day-view">
            <EventCardComponent key={event.id} event={event} registrationView={true}/>
          </div>
        </div>
      }
      
      <div className="button-wrap mt-4">
        <button
          type="submit"
          className="btn custom-button"
          data-testid="continue button"
          onClick={clickedRegisterNow}
        >
          Register Now
        </button>
      </div>
    </Fragment>
  );
};

export default RegistrationTextInfoComponent;
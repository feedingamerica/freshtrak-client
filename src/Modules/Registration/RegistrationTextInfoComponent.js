import React, { Fragment } from 'react';
import TagManager from 'react-gtm-module'


import RegistrationHeaderComponent from './RegistrationHeaderComponent';
import EventCardComponent from '../Events/EventCardComponent';
import BackButtonComponent from '../General/BackButtonComponent';
import { getItemLocalStorage } from '../../Utils/Util';

const RegistrationTextInfoComponent = ({event, onRegisterNow}) => {
const isLoggedIn = JSON.parse(getItemLocalStorage("isLoggedIn"));
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
      {!isLoggedIn && <RegistrationHeaderComponent event={event} />}
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
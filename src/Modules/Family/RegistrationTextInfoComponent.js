import React, { Fragment } from 'react';
import TagManager from 'react-gtm-module'
//import '../../Assets/scss/main.scss';
import { Link } from 'react-router-dom';
import { RENDER_URL } from '../../Utils/Urls';
import RegistrationHeaderComponent from './RegistrationHeaderComponent';
import EventCardComponent from '../Events/EventCardComponent';
// import RegistrationTextComponent from './RegistrationTextComponent';

const RegistrationTextInfoComponent = ({event, onRegisterNow}) => {
  return (
    <Fragment>
      <RegistrationHeaderComponent event={event} />
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
          onClick={(e) => onRegisterNow(true)}
        >
          Register Now
        </button>
      </div>
    </Fragment>
  );
};

export default RegistrationTextInfoComponent;
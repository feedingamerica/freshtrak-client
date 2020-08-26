import React, { Fragment, useEffect, useState } from 'react';
//import '../../Assets/scss/main.scss';
import { Link } from 'react-router-dom';
import { RENDER_URL } from '../../Utils/Urls';
import RegistrationTextComponent from './RegistrationTextComponent';
import RegistrationHeaderComponent from './RegistrationHeaderComponent';
// import RegistrationTextComponent from './RegistrationTextComponent';


const RegistrationTextInfoComponent = ({event,showForm}) => {
  return (
    <Fragment>
      <RegistrationHeaderComponent event={event}/>
      <RegistrationTextComponent/>
          <Link to={`${RENDER_URL.EVENT_REGISTRATION_URL}/${event.id}`}>
            <div className="button-wrap mt-4">
              <button
                type="submit"
                className="btn custom-button"
                data-testid="continue button"
                onClick={(e) => showForm()}
              >
                Register Now
              </button>
            </div>
          </Link>
    </Fragment>
  );
};

export default RegistrationTextInfoComponent;
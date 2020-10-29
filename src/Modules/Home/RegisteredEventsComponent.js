import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import '../../Assets/scss/main.scss';

const RegisteredEventsComponent = props => {
  

  return (
    <Fragment>
      <h2 className="font-weight-bold mobile-text-left">
        Your Registrations
      </h2>
    </Fragment>
  );
};

export default withRouter(RegisteredEventsComponent);

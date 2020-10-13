import React, { useState, useEffect, Fragment } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import '../../Assets/scss/main.scss';

const EventNearByComponent = props => {
  

  return (
    <Fragment>
      <h2 className="font-weight-bold mobile-text-left">
        Events Nearby Today
      </h2>
      <div>
        <div className="events-nearby-header">
          Events Within your area.
        </div>
        {/* <div className="events-nearby-header">
          Events Within your area.
        </div> */}
      </div>
    </Fragment>
  );
};

export default withRouter(EventNearByComponent);

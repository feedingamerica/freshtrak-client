import React from 'react';
import '../../App.scss';

const EventDescriptionFormComponent = (props) => {

  return (
      <div className="content-wrapper">
          <div className="medium-title font-weight-bold">
              Kroger Food Pantry EXPRESS
          </div>
          <div className="d-flex">
              <div className="pantry-name flex-grow-1">Prepack Pantry</div>

          </div>
          <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
              <span>Selected Time</span>
              <span className="font-weight-bold time-value">1:00 pm</span>
              <span>Monday, 4/2/2020</span>
          </div>
          <div className="d-flex flex-column mt-3 mb-3 address-wrapper">
              <span>225 E Gates St,</span>
              <span>Columbus, OH 43206</span>
              <span>(321) 456-0987</span>
          </div>
      </div>
              )
};

export default EventDescriptionFormComponent;
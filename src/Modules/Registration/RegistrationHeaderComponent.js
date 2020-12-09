import React, { Fragment } from 'react';
import '../../Assets/scss/main.scss';
import RegistrationTextComponent from './RegistrationTextComponent';

const RegistrationHeaderComponent = ({event}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="title-wrap">
            <h1 className="big-title mt-5 mb-5 mobile-mb">
              Register Now.<br />
              Save Time.<br />
              Stay Safe.
            </h1>
          </div>
        </div>
      </div>
      <RegistrationTextComponent event= {event}/>
    </Fragment>
  )
};

export default RegistrationHeaderComponent;

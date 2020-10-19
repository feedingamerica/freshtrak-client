import React, { Fragment } from 'react';
import '../../Assets/scss/main.scss';
import RegistrationTextComponent from './RegistrationTextComponent';
import BackButtonComponent from '../General/BackButtonComponent';

const RegistrationHeaderComponent = ({event}) => {
  return (
    <Fragment>
       <BackButtonComponent />
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
      <RegistrationTextComponent />
    </Fragment>
  )
};

export default RegistrationHeaderComponent;
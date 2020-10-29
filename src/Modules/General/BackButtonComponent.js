import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import back from '../../Assets/img/back.svg';
import '../../Assets/scss/main.scss';

const BackButtonComponent = ( ) => {
  const home = useHistory();
  const backHome = () => {
    home.goBack();
  }
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          <button type="button" className="btn back-button" onClick={backHome}>
            <span className="back-arrow">
              <img alt="back button" src={back} />
            </span>
            <span className="font-weight-bold text-uppercase ml-2">
              Back
            </span>
          </button>
        </div>
      </div>
    </Fragment>
  )
};

export default BackButtonComponent;

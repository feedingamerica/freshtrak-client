import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import back from '../../Assets/img/back.svg';
import '../../Assets/scss/main.scss';
import EventCardComponent from '../Events/EventCardComponent';
import { formatDateDayAndDate } from '../../Utils/DateFormat';


const RegistrationHeaderComponent = ({event}) => {
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
      <div className="row">
        <div className="col-6">
          <div className="title-wrap">
            <h1 className="big-title mt-5 mb-5 mobile-mb">
              Register Now.<br />
              Save Time.<br />
              Stay Safe.
            </h1>
          </div>

        </div>
        { event &&
          <div className="col-6">
            <div className="day-view">
              <EventCardComponent key={event.id} event={event} registrationView={true}/>
            </div>
          </div>
        }
      </div>
    </Fragment>
  )
};

export default RegistrationHeaderComponent;

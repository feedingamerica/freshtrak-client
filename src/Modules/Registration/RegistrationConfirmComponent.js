import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RENDER_URL } from '../../Utils/Urls';
import { selectEvent } from '../../Store/Events/eventSlice';
import { formatDateDayAndDate } from '../../Utils/DateFormat';
import { Link } from 'react-router-dom';
import identificationCodeImg1 from '../../Assets/img/id_code1.png';
import identificationCodeImg2 from '../../Assets/img/id_code2.png';
import idImg from '../../Assets/img/id_img.png';
import EventCardComponent from '../Events/EventCardComponent';

const RegistrationConfirmComponent = props => {
  const user_data = props.location.state.user;
  const event = useSelector(selectEvent);

  // Need to have isFBLoggedIn => true in local storage to show loggedin home page(Returning Users)
  localStorage.setItem('isFBLoggedIn', false);
  localStorage.removeItem('userToken');
  localStorage.removeItem('tokenExpiresAt');

  const HOME_OR_ROOT_URL = localStorage.getItem('isFBLoggedIn') === "true" ? RENDER_URL.HOME_URL : RENDER_URL.ROOT_URL

  const formatPhoneNumber = input => {
    const regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (input) {
      return input.replace(regExp, '($1) $2-$3');
    } else {
      return '';
    }
  };

  const {
    first_name,
    middle_name,
    last_name,
    suffix,
    address_line_1,
    address_line_2,
    city,
    zip_code,
    state,
    phone,
    identification_code,
    license_plate,
  } = user_data;

  return (
    <Fragment>
      {event && (
        <div className="mt-4">
          <section className="container pt-100 pb-100 register-confirmation">
            <h1 className="big-title med-title mt-5 mb-5 mobile-mb">
              You're Registered
            </h1>
            <h4>
              <b> {event.agencyName} </b>
            </h4>
            <div className="address-wrap mb-5">
              <div className="date-wrapper">
                {formatDateDayAndDate(event.date)}
              </div>
              <div className="timing-wrapper">
                {event.startTime} -{event.endTime}
              </div>
            </div>
            <div className="mt-5">
              <h2>
                Your Confirmation Number <br />
                <b> {identification_code.toUpperCase()} </b>
              </h2>
              <br />
            </div>
            { event &&
                  <div className="col-6">
                    <div className="day-view">
                      <EventCardComponent key={event.id} event={event} noRsvpMessage = {true} registrationView={true}/>
                    </div>
                  </div>
            }
            <h5 className="mb-4">
              <b> Your Information </b>
            </h5>
            <div className="mb-2">
              <h6 className="mb-4">HEAD OF HOUSEHOLD</h6>
              {first_name} {middle_name} {last_name} {suffix} <br />
              {address_line_1} <br />
              {address_line_2} <br />
              {city} {state} <br />
              {zip_code} <br />
              {formatPhoneNumber(phone)} <br />
            </div>
            <div className="mt-5">
              As a part of our contactless service process, please display the
              above confirmation number <br />
              <div className="mb-2">
                Notes: This code is unique to you, please write it on a piece of
                paper and display in your driver-side front window.
                <div className=" ">
                  <img
                    src={identificationCodeImg1}
                    alt="identificationCodeImg1"
                    height="300"
                    width="auto"
                  />
                  <img
                    className="ml-2"
                    src={identificationCodeImg2}
                    alt="identificationCodeImg2"
                    height="300"
                    width="auto"
                  />
                </div>
                For expedite service at many locations, please also include an
                ID, and a document with your current address
                <div className=" ">
                  <img src={idImg} alt="idImg" height="300" width="auto" />
                </div>
              </div>
            </div>
            {license_plate && license_plate.length > 0 && (
              <div className="mt-4 mb-4">
                <span>
                  Special Instructions: You included a license plate in your
                  registration: <b> {license_plate} </b>
                </span>
                <br />
                For the possibility of expedited service, please try to arrive
                in this vehicle.
              </div>
            )}
            {event.eventDetails && event.eventDetails.length > 0 && (
              <h5>
                <b> Additional Location Information </b>
              </h5>
            )}
            <p className="mb-5">{event.eventDetails}</p>
            <Link to={HOME_OR_ROOT_URL}>
              <div className="button-wrap mt-4">
                <button
                  type="submit"
                  className="btn custom-button"
                  data-testid="continue button"
                >
                  Back To Home
                </button>
              </div>
            </Link>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default RegistrationConfirmComponent;

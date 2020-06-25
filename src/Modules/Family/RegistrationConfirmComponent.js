import React, { Fragment, useEffect, useState } from "react";
import { API_URL, RENDER_URL } from "../../Utils/Urls";
import axios from "axios";
import { formatDateDayAndDate } from "../../Utils/DateFormat";
import { Link } from "react-router-dom";
import identificationCodeImg1 from '../../Assets/img/id_code1.png';
import identificationCodeImg2 from '../../Assets/img/id_code2.png';
import formatPhoneNumber from "../../Utils/PhoneFormat";
import idImg from '../../Assets/img/id_img.png';

const RegistrationConfirmComponent = (props) => {
  const user_data = props.user;
  const [eventDate, setEventDate] = useState(undefined);
  const [eventId, setEventId] = useState(undefined);
  const [event, setEvent] = useState(undefined);
  const eventDateId = props.eventDateId;

  useEffect(() => {
    if (eventId) {
      getEvent(eventId);
    }
    localStorage.removeItem('userToken');
  }, [eventId]);

  useEffect(() => {
    const event_date_id = parseInt(eventDateId, 10);
    if (event_date_id) {
      getEventDate(event_date_id);
    }
    localStorage.removeItem('userToken');
  }, [eventDateId]);

  const getEvent = async (event_id) => {
    try {
      const { EVENT_URL } = API_URL;
      const resp = await axios.get(EVENT_URL + "/" + event_id);
      const { data } = resp;
      setEvent(data);
    } catch (e) {
      console.error(e);
    }
  };

  const getEventDate = async (event_date_id) => {
    try {
      const { EVENT_DATES_URL } = API_URL;
      const resp = await axios.get(EVENT_DATES_URL + "/" + event_date_id);
      const { data } = resp;
      setEventDate(data);
      setEventId(data.event_date.event_id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Fragment>
      {eventDate && (
        <div className="main-wrapper mt-4">
          <section className="container pt-100 pb-100 register-confirmation">
            <h1 className="big-title med-title mt-5 mb-5 mobile-mb">
              You're Registered
            </h1>
            <h4>
              <b> {event && event.event.agency_name} </b>
            </h4>
            <div className="address-wrap mb-5">
              <div className="date-wrapper">
                {formatDateDayAndDate(eventDate.event_date.date)}
              </div>
              <div className="timing-wrapper">
                {eventDate.event_date.start_time} -
                {eventDate.event_date.end_time}
              </div>
            </div>
            <h5 className="mb-4">
              <b> Your Information </b>
            </h5>
            <div className="mb-2">
              <h6 className="mb-4">
                HEAD OF HOUSEHOLD
              </h6>
              {user_data.first_name} {user_data.middle_name} {user_data.last_name} {user_data.suffix} <br />
              {user_data.address_line_1} <br />
              {user_data.address_line_2} <br />
              {user_data.city} {user_data.state} <br />
              {user_data.zip_code} <br />
              {formatPhoneNumber(user_data.phone)} <br />
            </div>
            <div className="mt-5">
              As a part of our contactless service process, please display the following information <br />
              <h4>
                Identification Code <br />
                <b> {user_data.identification_code} </b>
              </h4>
              <div className="mb-2">
                Notes: This code is unique to you, please write it on a piece of
                paper and display in your driver-side front window.
                <div className=" ">
                  <img src={identificationCodeImg1} alt="identificationCodeImg1" height="300" width="auto" />
                  <img className="ml-2" src={identificationCodeImg2} alt="identificationCodeImg2" height="300" width="auto" />
                </div>
                For expedite service at many locations, please also include an ID,
                and a document with your current address
                <div className=" ">
                  <img src={idImg} alt="idImg" height="300" width="auto" />
                </div>
              </div>
            </div>
            {user_data.license_plate && user_data.license_plate.length > 0 && (
              <div className="mt-4 mb-4">
                <span>
                  Special Instructions: You included a license plate in your registration: <b> {user_data.license_plate} </b>
                </span>
                <br />
                For the possibility of expedited service, please try to arrive in this vehicle.
              </div>
            )}
            {user_data.event_details && user_data.event_details.length > 0 && (
              <h5>
                <b> Additional Location Information </b>
              </h5>
            )}
            <p className="mb-5">{event && event.event_details}</p>
            <Link to={RENDER_URL.HOME_URL}>
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

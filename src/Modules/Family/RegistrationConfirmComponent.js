import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, RENDER_URL } from "../../Utils/Urls";
import axios from "axios";
import { formatDateDayAndDate } from "../../Utils/DateFormat";
import { Link } from "react-router-dom";

const RegistrationConfirmComponent = (props) => {
  const { eventId } = useParams();
  const user_data = props.user;
  const [eventDate, setEventDate] = useState(undefined);

  useEffect(() => {
    const event_date_id = parseInt(eventId, 10);
    getEventDateId(event_date_id);
  }, [eventId]);

  const getEventDateId = async (event_date_id) => {
    try {
      const { EVENT_DATES_URL } = API_URL;
      const resp = await axios.get(EVENT_DATES_URL + "/" + event_date_id);
      const { data } = resp;
      setEventDate(data);
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
              <b> {eventDate.event_date.event.name} </b>
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
              {user_data.first_name} {user_data.last_name}
              {user_data.middle_name} {user_data.suffix} <br />
              {user_data.address_line_1} <br />
              {user_data.address_line_2} <br />
              {user_data.city} {user_data.state} <br />
              {user_data.zip_code} <br />
              {user_data.phone} <br />
            </div>
            <div className="mt-5">
              Identification Code:
              <h4>
                <b> {user_data.identification_code} </b>
              </h4>
              <p className="mb-2">
                Notes: This code is unique to you, please write it on a piece of
                paper and display in your driver-side front window.
              </p>
            </div>
            {user_data.license_plate && user_data.license_plate.length > 0 && (
              <p className="mt-4 mb-4">
                Special Instructions: You included a license plate in your
                registration. Please try to arrive in this vehicle, but if you
                are unable to do so it will not impact your service.
              </p>
            )}
            <h5>
              <b> Additional Location Information </b>
            </h5>
            <p className="mb-5">{eventDate.event_date.event.event_details}</p>
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

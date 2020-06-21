import React, { useState, Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { API_URL, RENDER_URL } from '../../Utils/Urls';
import axios from 'axios';
import alarmIcon from '../../Assets/img/alarm.svg';

const ReserveTimeButton = (props) => {
  const event_date_id = props.event_date_id;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eventHour, setEventHour] = useState([]);
  const [show, setShow] = useState(false);
  const { register, watch } = useForm();
  const event_slot_id = watch('time_slot');

  const getEventHours = async (event_date_id) => {
    try {
      const { EVENT_DATES_URL } = API_URL;
      const resp = await axios.get(
        EVENT_DATES_URL + '/' + event_date_id + '/event_hours'
      );
      const { data } = resp;
      if (
        data &&
        data.event_date &&
        data.event_date.event_hours !== undefined
      ) {
        setEventHour(data.event_date.event_hours);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showModal = () => {
    if (event_date_id) {
      handleShow();
      getEventHours(event_date_id);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn custom-button ml-1 flex-grow-1"
        onClick={(e) => showModal()}
      >
        Reserve Time
			</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="pr-3">
              <img aria-hidden="true" alt="Go back" src={alarmIcon} />
            </span>
            Choose Delivery Time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {eventHour.map((item, index) => (
              <div className="" key={'ul' + index}>
                {item.event_slots.map((e, i) => (
                  <div className="form-check p-2" key={index + '-' + i}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="time_slot"
                      value={e.event_slot_id}
                      ref={register}
                    />
                    <label className="form-check-label pl-2">
                      {e.start_time} - {e.end_time}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn default-button"
            onClick={handleClose}
          >
            Close
          </button>
          <LinkContainer to={`${RENDER_URL.EVENT_REGISTRATION_URL}/${event_date_id}/${event_slot_id}`}>
            <button
              type="submit"
              disabled={!event_slot_id}
              className="btn primary-button ml-1 flex-grow-1"
              onClick={handleClose}
            >
              Save and Continue
            </button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ReserveTimeButton;

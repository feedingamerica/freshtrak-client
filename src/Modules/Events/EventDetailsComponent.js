import React, { useContext, useEffect, useState } from "react";
import Close from "../../Assets/img/add.svg";
import EventContext from "../../Store/ContextApi/EventContext";

import ImageViewModal from "../General/ImageViewModal";

const EventDetailsComponent = () => {
  const { event, showEventDetails } = useContext(EventContext);
  const [images, setImages] = useState([]);

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const eventImages = ["/pantry1.jpg"];
    setImages(eventImages);
  }, []);
  return (
    <div className="list-view-detail">
      <div className="list-view-detail-header p-3">
        <div className="close-button text-right">
          <a
            onClick={() => {
              showEventDetails(false);
            }}
          >
            <img src={Close} />
          </a>
        </div>
        <div className="list-view-header-title">{event.agencyName}</div>
        <div className="list-view-item-location d-flex justify-content-between">
          <div className="list-view-item-name">{event.eventName}</div>
          <div className="list-view-item-distance">14 Miles</div>
        </div>
      </div>
      <div className="list-view-detail-wrapper d-flex flex-column justify-content-between p-3">
        <div className="flex-grow-1 list-view-detail-sub">
          <div className="registration-required">
            <span className="registration-required-label">
              Registration Required
            </span>
          </div>
          <div className="timings d-flex justify-content-between">
            <div className="date-wrapper">{event.date}</div>
            <div className="timing-wrapper">
              {event.startTime}-{event.endTime}
            </div>
          </div>
          <div className="address-wrap">
            {event.eventAddress}
            <br />
            {event.eventCity} {event.eventState} {event.eventZip}
            <br />
            {event.phoneNumber}
          </div>
          <div className="list-view-contents mt-4">
            <h3 className="list-view-content-title">Information</h3>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                non erat vestibulum, bibendum risus non, gravida felis.
                Vestibulum vulputate vel odio hendrerit eleifend. Duis ut neque
                iaculis, aliquam neque eget, tempor nibh.
              </p>
              <p>
                Foodbank can add details to an event using an open form field.
                Light styling optins available (bold, italic, line breaks,
                ordered lists, preset text styles)
              </p>
            </div>
            <div className="image-view mt-3 mb-3">
              <img src={images} onClick={() => setShowImage(true)} />
            </div>
          </div>
        </div>
        <div className="reserve-time">
          <button type="submit" className="btn custom-button w-100">
            Reserve Time
          </button>
        </div>
      </div>

      {showImage == true && (
        <ImageViewModal
          src={"/pantry1.jpg"}
          close={() => setShowImage(false)}
        />
      )}
    </div>
  );
};

export default EventDetailsComponent;

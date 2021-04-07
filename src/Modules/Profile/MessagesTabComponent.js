import React from "react";

const MessagesTabComponent = () => {
  return (
    <div className="container">
      <ul className="message-wrapper-lists p-0 m-0">
        <li className="new">
          <div className="message-wrapper mb-3">
            <div className="message-subject card-title d-flex">
            <div className="flex-grow-1">
              Pantry Update
              </div>
              <div className="ml-2 status-new-text">New</div>
            </div>
            <div className="small pantry-name mb-2">MidOhio Food Bank</div>
            <div>
              <p className="mb-1">
                All party locations require you to wear a mask or face covering
              </p>
            </div>
            <div>Jan 19th, 2021</div>
          </div>
        </li>
        <li>
          <div className="message-wrapper mb-3">
            <div className="message-subject card-title d-flex">
              <div className="flex-grow-1">
              Pantry Update
              </div>
              <div className="ml-2 status-read-text">Read</div>
            </div>
            <div className="small pantry-name mb-2">MidOhio Food Bank</div>
            <div>
              <p className="mb-1">
                All party locations require you to wear a mask or face covering
              </p>
            </div>
            <div>Jan 19th, 2021</div>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default MessagesTabComponent;

import React from "react";
import { useHistory } from "react-router-dom";
const YourInfoComponent = () => {
  let history = useHistory();

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className=" d-flex mb-3 flex-wrap">
          <div className="flex-grow-1 medium-title font-weight-bold">
            Your Information
          </div>
          <div
            className="ml-auto"
            onClick={() => {
              history.push("/account/edit", {
                page: "your-info",
                title: "Edit Your Info",
                btntext: "Save Changes",
              });
            }}
          >
            <span className="cursor text-underline">Edit</span>
          </div>
        </div>
        <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
          <span>Savannah Neeley</span>
          <span>5190 Preferred Place</span>
          <span>Unit 304</span>
          <span>Hilliard Ohio </span>
          <span>43026</span>
        </div>
        <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
          <span>sneeley@gmail.com</span>
          <span>(312) 456-6789</span>
        </div>
        <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
          <span>
            <span className="font-weight-bold"> Head of Household?</span> Yes
          </span>
          <span>
            <span className="font-weight-bold">Contact Preference: </span>Email
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default YourInfoComponent;

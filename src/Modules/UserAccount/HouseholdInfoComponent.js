import React from "react";
import { useHistory } from "react-router-dom";
const HouseholdInfoComponent = () => {
  let history = useHistory();

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className=" d-flex flex-wrap mb-3">
          <div className="flex-grow-1 medium-title font-weight-bold">
            Household Info
          </div>
          <div data-testid="house-info-edit-btn"
            className="ml-auto"
            onClick={() => {
              history.push("/account/edit", {
                page: "house-info",
                title: "Household Members",
                btntext: "Save Changes",
              });
            }}
          >
            <span className="cursor text-underline">Edit</span>
          </div>
        </div>
        <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
          <span className="font-weight-bold">First Adult Member</span>
          <span>Savannah Neeley</span>
          <span>04/04/1980 </span>
          <span>Female</span>
        </div>
        <div className="d-flex flex-column mt-3 mb-3 time-wrapper">
          <span className="font-weight-bold">Second Adult Member</span>
          <span>Jeremia Neeley</span>
          <span>07/09/1976 </span>
          <span>Male</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HouseholdInfoComponent;

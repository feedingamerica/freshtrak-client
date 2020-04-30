import React from "react";
import { useHistory } from "react-router-dom";
const HouseholdInfoComponent = () => {
  let history = useHistory();

  return (
    <React.Fragment>
      <div className="content-wrapper">
        <div className=" d-flex flex-wrap mb-3">
          <div className="flex-grow-1 medium-title font-weight-bold">
            Login Info
          </div>
        </div>
        <div className="row mt-3 mb-3 time-wrapper">
          <div className="col-xl-8 col-lg-8 col-sm-8 col-8">
            <div className="font-weight-bold">Email or Username</div>
            <div>s*******@gmail.com</div>
          </div>
          <div className="col-xl-4 col-lg-4 col-sm-4 col-4 text-right">
            <span
              onClick={() => {
                history.push("/account/edit", {
                  page: "login-info",
                  title: "Change Password",
                  btntext: "Save New Password",
                });
              }}
              className="cursor text-underline"
            >
              Change Password
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HouseholdInfoComponent;

import React from "react";
const ChangePasswordComponent = () => {
    
  return (
    <React.Fragment>
      <div className="form-fields pb-50">
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            className="form-control"
            // onChange={buildForm}
            name="password_current"
            id="password_current"
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            name="password_new"
            id="password_new"
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            name="password_confirm"
            id="password_confirm"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePasswordComponent;

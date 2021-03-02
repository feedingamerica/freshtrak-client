import React from "react";

const SignUpDetailsComponent = () => {
  return (
    <div className="mt-4 pb-3">
      <p className="small text-center">Once you sign up, you can register in advance for services, speed up your check-in time at the pantry, and find other programs that may benefit you.</p>
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="number" className="form-control" />
      </div>
      <button type="submit" class="btn primary-button mt-3 w-100">
        Login
      </button>
    </div>
  );
};
export default SignUpDetailsComponent;
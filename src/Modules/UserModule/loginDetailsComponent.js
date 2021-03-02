import React from "react";

const loginDetailsComponent = () => {
  return (
    <div className="mt-4 pb-3">
      <p className="font-weight-bold text-center">Welcome Back !</p>
      <div className="form-group">
        <label>Email</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="rememberme" />
        <label className="form-check-label" htmlFor="rememberme">
          Remember Me
        </label>
      </div>

      <button type="submit" className="btn primary-button mt-3 w-100">
        Sign In
      </button>
      <hr/>
      <button type="submit" className="btn fb-button mt-3 w-100">
        Login with Facebook
      </button>
      <button type="submit" className="btn btn-outline-secondary mt-3 w-100">
        Continue as Guest
      </button>
    </div>
  );
};
export default loginDetailsComponent;

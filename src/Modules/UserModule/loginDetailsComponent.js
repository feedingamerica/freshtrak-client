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
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="rememberme" />
        <label class="form-check-label" for="rememberme">
          Remember Me
        </label>
      </div>
      <button type="submit" class="btn primary-button mt-3 w-100">
        Sign In
      </button>
      <hr/>
      <button type="submit" class="btn fb-button mt-3 w-100">
        Login with Facebook
      </button>
      <button type="submit" class="btn btn-outline-secondary mt-3 w-100">
        Continue as Guest
      </button>
    </div>
  );
};
export default loginDetailsComponent;

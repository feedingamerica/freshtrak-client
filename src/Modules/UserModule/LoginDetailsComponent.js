import React ,{useState}from "react";
import { useForm } from "react-hook-form";
const LoginDetailsComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (signinData) => {
      props.onSignIn(signinData);
  };
  return (
    <div className="mt-4 pb-3">
      <p className="font-weight-bold text-center">Welcome Back !</p>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        <div className="form-group">
          <label>Username</label>
          <input type="text" 
            className="form-control"
            name="username"
            id="username"
            ref={register({ required: true })}
          />
          {errors.username && <span className="text-danger">Username is required</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password"
            className="form-control"
            name="password"
            id="password"
            ref={register({ required: true })}
          />
          {errors.password && <span className="text-danger">Password is required</span>}
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
      </form>
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
export default LoginDetailsComponent;

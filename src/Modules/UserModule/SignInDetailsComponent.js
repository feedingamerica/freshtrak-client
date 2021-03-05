import React ,{useState}from "react";
import { useForm } from "react-hook-form";
import FacebookSignInComponent from "../UserModule/FacebookSignInComponent";
import GuestSignInComponent from "../UserModule/GuestSignInComponent";
const SignInDetailsComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (signinData) => {
      props.onSignIn(signinData);
  };
  const onForgotPassword = () => {
    props.onForgotPassword();
  }
  return (
    <div className="mt-4 pb-3">
      <p className="font-weight-bold text-center">Welcome Back !</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="d-flex justify-content-between">
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="rememberme" />
            <label className="form-check-label" htmlFor="rememberme">
              Remember Me
            </label>
          </div>
          <div>
            <a className="pointer font-weight-bold" onClick={onForgotPassword}>Forgot Password ?</a>
          </div>
        </div>
        <button type="submit" className="btn primary-button mt-3 w-100">
          Sign In
        </button>
      </form>
      <hr/>
      <FacebookSignInComponent />
      <GuestSignInComponent />
    </div>
  );
};
export default SignInDetailsComponent;

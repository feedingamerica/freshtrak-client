import React from "react";
import { useForm } from "react-hook-form";
import FacebookSignInComponent from "./FacebookSignInComponent";
import GuestSignInComponent from "./GuestSignInComponent";

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
          <label>Email</label>
          <input type="text" 
            className="form-control"
            name="username"
            id="username"
            autoComplete="off"
            ref={register({ required: 'Email is required' ,
                             pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Enter a valid e-mail address",
                                  }, 

                           })
                  }
          />
          {errors.username && <span className="text-danger">{errors.username.message}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password"
            className="form-control"
            name="password"
            id="password"
            autoComplete="off"
            ref={register({ required: true })}
          />
          {errors.password && <span className="text-danger">Password is required</span>}   
           {props.customError.userError && <span className="text-danger">{props.customError.userError}</span>}        
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

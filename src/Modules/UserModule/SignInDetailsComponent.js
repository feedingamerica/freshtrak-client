import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FacebookSignInComponent from "./FacebookSignInComponent";
import GuestSignInComponent from "./GuestSignInComponent";

const SignInDetailsComponent = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (signinData) => {
      props.onSignIn(signinData);
  };
  const onForgotPassword = () => {
    props.onForgotPassword();
  }

   const setUser=(e)=>{
    if(e.target.name === "username"){
    setEmail(e.target.value)
    if(email == null || email === ''){
      props.customError.emailError = null;
    }
    }
    else{
    setPassword(e.target.value)
    if(password == null || password === ''){
      props.customError.userError = null;
    }
    }

   }


  return (
    <div className="mt-4 pb-3" data-testid="user-signin">
      <p className="font-weight-bold text-center">Welcome Back !</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" 
            className="form-control"
            name="username"
            id="username"
            autoComplete="off"
            data-testid="username"
            onChange={(e)=>setUser(e)}
            ref={register({ required: 'This field is required' ,
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
            data-testid="password"
            onChange={(e)=>setUser(e)}
            ref={register({ required: true })}
          />
          {errors.password && <span className="text-danger">This field is required</span>}
           {props.customError.userError && !errors.password && !errors.username && <span className="text-danger">{props.customError.userError}</span>}        
        </div>
        <div className="d-flex justify-content-between">
          {/* <div className="form-check">
            <input type="checkbox" className="form-check-input" id="rememberme" onClick={(e)=>storeSignInData(e)}/>
            <label className="form-check-label" htmlFor="rememberme">
              Remember Me
            </label>
          </div> */}
          <div>
            <a href="/#" className="pointer font-weight-bold" onClick={onForgotPassword} data-testid="forgot-password">Forgot Password ?</a>
          </div>
          
        </div>
        <button type="submit" className="btn primary-button mt-3 w-100" data-testid="signin">
          Sign In
        </button>
      </form>
      <hr/>
      <FacebookSignInComponent />
      <GuestSignInComponent handleClose={()=> props.handleClose()}/>
    </div>
  );
};
export default SignInDetailsComponent;
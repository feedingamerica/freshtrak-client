/* 
* Sign in Component
*/

import React, {useState} from "react";
import useForm from '../../Utils/UseForm';

const SignInComponent =()=> {

  const [signInForm,setSignInForm] = useState({username:'',password:''});
  const handleSubmit = () => {
    localStorage.setItem("isLoggedIn", true);
    window.location.reload();
  };

// binding data to state
 const buildSignInFormData = (event)=>{
  setSignInForm({...signInForm,[event.target.name] : event.target.value});
  }

  const { errors, handleErrors } =
  useForm({}, {
      'username' : ['required','is_address'],
      'password' : ['required']
  }, ()=>{});


  return (
    <div className="form-fields sign-in-form">
      <div className="form-title">
        <h1>Sign In</h1>
      </div>
      <div className="mb-2">
        <div>Have you previously registered through FreshTrak?</div>
        <div className="small-title">
          Input your email address and the password you entered when you created
          your account.
        </div>
      </div>
      <div className="form-group">
        <label>Username or Email Address</label>
        <input
          type="text"
          className="form-control"
          onChange={buildSignInFormData}
          onBlur={handleErrors}
          name="username"
          id="username"
        />
        {errors.username? errors.username :''}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          onChange={buildSignInFormData}
          onBlur={handleErrors}
          name="password"
          id="password"
        />
         {errors.password? errors.password :''}
      </div>
      <div>
        <a>Forgot Password?</a>
      </div>
      <div className="button-wrap d-flex mt-3">
        <button 
          className="btn primary-button flex-grow-1" 
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default SignInComponent;

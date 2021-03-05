import React ,{useState}from "react";
import { useForm } from "react-hook-form";
import FacebookSignInComponent from "../UserModule/FacebookSignInComponent";
import GuestSignInComponent from "../UserModule/GuestSignInComponent";
const SignUpDetailsComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (signupData) => {
      props.onSignUp(signupData);
  };
  return (
    <div className="mt-4 pb-3">
      <p className="small text-center">Once you sign up, you can register in advance for services, speed up your check-in time at the pantry, and find other programs that may benefit you.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control"
             name="email"
             id="email"
             ref={register({ required: true })}
          />
          {errors.email && <span className="text-danger">Email is required</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" 
             name="password"
             id="password"
             ref={register({ required: true })}
          />
          {errors.password && <span className="text-danger">Password is required</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-group phone-input">
          <span className="input-group-btn">
							<select className="form-control">
                <option>+91</option>
              </select>
						</span>
          <input type="text" className="form-control" 
             name="phonenumber"
             id="phonenumber"
             ref={register({ required: true })}
          />
           {errors.phonenumber && <span className="text-danger">Phonenumber is required</span>}
        </div>
        </div>
        <button type="submit" className="btn custom-button mt-3 w-100">
          Sign Up
        </button>
      </form>
        <hr/>
      <FacebookSignInComponent/>
      <GuestSignInComponent />
    </div>
    
  );
};
export default SignUpDetailsComponent;
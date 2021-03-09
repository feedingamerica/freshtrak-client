import React ,{useState}from "react";
import { useForm } from "react-hook-form";
import FacebookSignInComponent from "../UserModule/FacebookSignInComponent";
import GuestSignInComponent from "../UserModule/GuestSignInComponent";
import PhoneInputComponent from '../Family/PhoneInputComponent';
const SignUpDetailsComponent = (props) => {
  const { register, handleSubmit, errors,setValue,watch } = useForm();
  const phonenumber = watch('phonenumber') || '';
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
             autocomplete="off"
             ref={register({ required: 'Email is required' ,
                             pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Enter a valid e-mail address",
                                  },
                            })
                  }
          />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
          {props.customError.emailError && <span className="text-danger">{props.customError.emailError}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" 
             name="password"
             id="password"
             autocomplete="off"
             ref={register({ required: true })}
          />
          {errors.password && <span className="text-danger">Password is required</span>}
          {props.customError.passowrdError && <span className="text-danger">{props.customError.passowrdError}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-group phone-input">     
             <PhoneInputComponent
                type="text"
                className= {`form-control ${errors.phonenumber && 'invalid'}`}
                name="phonenumber"
                placeholder="(xxx) xxx-xxxx"
                id="phonenumber"
                autocomplete="off"
                value={phonenumber}
                onChange={(e) => { setValue('phonenumber', e) }}
                register={register}
              />           
          </div>
          {errors.phonenumber && <span className="text-danger">Phonenumber is required</span>}
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
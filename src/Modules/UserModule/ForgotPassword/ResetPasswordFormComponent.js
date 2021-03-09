import React ,{useState,useRef}from "react";
import { useForm } from "react-hook-form";


const ResetPasswordFormComponent = (props) => {
  const { register, handleSubmit, errors ,watch} = useForm();
  const newpassword = useRef({});
  newpassword.current = watch("newpassword", "");
  const onSubmit = async (resetData) => {
    props.onResetPassword(resetData);
  };
   
  return (
    <div className="mt-4 pb-3">
      <p className="font-weight-bold text-center">Reset password !</p>
      <p className="small text-center">The verification code is send to {props.destinationEmail}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Verification Code</label>
          <input type="text" className="form-control"
             name="code"
             id="code"
             autocomplete="off"
             ref={register({ required: true })}
          />
          {errors.code && <span className="text-danger">Code is required</span>}
          {props.customError.codeError && <span className="text-danger">{props.customError.codeError}</span>}
        </div>
        <div className="form-group">
          <label>New Passoword</label>
          <input type="password" className="form-control" 
             name="newpassword"
             id="newpassword"
             autocomplete="off"
             ref={register({ required: true })}
          />
          {errors.newpassword && <span className="text-danger">New Password is required</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="text" className="form-control" 
             name="confirmpassword"
             id="confirmpassword"
             autocomplete="off"
             ref={register({ 
          validate: value =>
            value === newpassword.current || "The passwords do not match"
         })}
          />
          
           {errors.confirmpassword && <span className="text-danger">{errors.confirmpassword.message}</span>}
           {props.customError.passowrdError && <span className="text-danger">{props.customError.passowrdError}</span>}
           {props.customError.limitError && <span className="text-danger">{props.customError.limitError}</span>}
        </div>
        <button type="submit" className="btn custom-button mt-3 w-100">
          Reset Password
        </button>
      </form>
        
    </div>
    
  );
};
export default ResetPasswordFormComponent;
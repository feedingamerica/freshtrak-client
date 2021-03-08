import React, { useState }from 'react';
import { useForm } from "react-hook-form";
const CodeVerificationModalComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (confirmData) => {
      props.onConfirm(confirmData);
  };
  const onClickResend = () =>{
    props.onResendConfirmCode();
  }
  return (
    <div className="mt-4 pb-3">
    <p className="font-weight-bold text-center">Confirm Sign Up!</p>
      <p className="small text-center">The verification code is send to {props.destinationMedium}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">        
        <div className="form-group">
          <label>Verifcation Code</label>
          <input type="text" className="form-control" 
             name="code"
             id="code"
             ref={register({ required: true })}
          />
           {errors.code && <span className="text-danger">Code is required</span>}
           {props.customError.codeError && <span className="text-danger">{props.customError.codeError}</span>}
           <div onClick={onClickResend}>Resend Code</div>
        </div>
        <button type="submit" className="btn custom-button mt-3 w-100">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default CodeVerificationModalComponent;
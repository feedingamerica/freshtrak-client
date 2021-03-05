import React, { useState }from 'react';
import { useForm } from "react-hook-form";

const ForgotPasswordEmailComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (emailValue) => {
      props.onSendEmail(emailValue);
  };
  return (
    <div className="mt-4 pb-3">
      <p className="font-weight-bold text-center">Forgot password !</p>
      <form onSubmit={handleSubmit(onSubmit)}>        
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" 
             name="username"
             id="username"
             ref={register({ required: true })}
          />
           {errors.username && <span className="text-danger">Code is required</span>}
        </div>
        <button type="submit" className="btn custom-button mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordEmailComponent;
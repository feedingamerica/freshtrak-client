import React, { useState }from 'react';
import { useForm } from "react-hook-form";

const ForgotPasswordEmailComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (emailValue) => {
      props.onSendEmail(emailValue);
  };
  return (
    <div className="mt-4 pb-3" data-testid="forgot-email-form">
      <p className="font-weight-bold text-center">Forgot password !</p>
      <form onSubmit={handleSubmit(onSubmit)}>        
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" 
             autoComplete="off"
             name="username"
             id="username"
             ref={register({ required: 'This field is required' ,
                             pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Enter a valid e-mail address",
                                  },
                            })}
          />
           {errors.username && <span className="text-danger">{errors.username.message}</span>}
           {props.customError.userError && <span className="text-danger">{props.customError.userError}</span>}
           {props.customError.limitError && <span className="text-danger">{props.customError.limitError}</span>}        
        </div>
        <button type="submit" className="btn custom-button mt-3 w-100" data-testid="forgot-pwd">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordEmailComponent;
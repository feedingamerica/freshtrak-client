import React ,{useRef}from "react";
import { useForm } from "react-hook-form";


const ResetPasswordFormComponent = (props) => {
  const { register, handleSubmit, errors ,watch} = useForm();
  const newpassword = useRef({});
  newpassword.current = watch("newpassword", "");
  const onSubmit = async (resetData) => {
    props.onResetPassword(resetData);
  };
   
  return (
    <div className="mt-4 pb-3" data-testid="reset-password-form">
      <p className="font-weight-bold text-center">Reset password !</p>
      <p className="small text-center">The verification code is send to {props.destinationEmail}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Verification Code</label>
          <input type="text" className="form-control"
             name="code"
             id="code"
             autoComplete="off"
             data-testid="code"
             ref={register({ required: true })}
          />
          {errors.code && <span className="text-danger">This field is required</span>}
          {props.customError && props.customError.codeError && !errors.code && <span className="text-danger">{props.customError.codeError}</span>}
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" className="form-control" 
             name="newpassword"
             id="newpassword"
             autoComplete="off"
             data-testid="newpassword"
             ref={register({ required: true })}
          />
          {errors.newpassword && <span className="text-danger">This field is required</span>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="text" className="form-control" 
             name="confirmpassword"
             id="confirmpassword"
             autoComplete="off"
             data-testid="confirmpassword"
             ref={register({ 
          validate: value =>
            value === newpassword.current || "The passwords do not match"
         })}
          />
          
           {errors.confirmpassword && <span className="text-danger">{errors.confirmpassword.message}</span>}
           {props.customError && props.customError.passwordError && !errors.confirmpassword && <span className="text-danger">{props.customError.passwordError}</span>}
           {props.customError && props.customError.limitError && !errors.confirmpassword && <span className="text-danger">{props.customError.limitError}</span>}
        </div>
        <button type="submit" className="btn custom-button mt-3 w-100" data-testid="reset-password">
          Reset Password
        </button>
      </form>
        
    </div>
    
  );
};
export default ResetPasswordFormComponent;
/*  This Component is having a static form as of now.
Logic and testing codes will be written after first Code Review.
*/
import React,{useState} from "react";
import useForm from '../../Utils/UseForm';

const ChangePasswordComponent =React.forwardRef((props, ref)=> {
    
  const [passwordForm,setPasswordForm] = useState({password_current:'',password_new:'',password_confirm:''});

  const buildPasswordFormData = (event)=>{
    setPasswordForm({...passwordForm,[event.target.name] : event.target.value});
    }


    const { errors, handleErrors } =
    useForm(props, {
        'password_current' : ['required'],
        'password_new' : ['required'],
        'password_confirm' : ['required']
    }, ()=>{});

  
    React.useImperativeHandle(ref, () => ({

      getCurrentData(){
          return passwordForm
      },
      triggerErrors(){
          return handleErrors(passwordForm);
      }
  }));

  return (
    <React.Fragment>
      <div className="form-fields pb-50">
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            className="form-control"
            onChange={buildPasswordFormData}
            onBlur={handleErrors}
            name="password_current"
            id="password_current"
          /> { errors.password_current? <span className="validationError">{errors.password_current}</span>:''}
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            onChange={buildPasswordFormData}
            onBlur={handleErrors}
            name="password_new"
            id="password_new"
          />{ errors.password_new? <span className="validationError">{errors.password_new}</span>:''}
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            onChange={buildPasswordFormData}
            onBlur={handleErrors}
            name="password_confirm"
            id="password_confirm"
          />{ errors.password_confirm? <span className="validationError">{errors.password_confirm}</span>:''}
        </div>
      </div>
    </React.Fragment>
  );
});

export default ChangePasswordComponent;

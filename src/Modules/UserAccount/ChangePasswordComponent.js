
import React,{useState} from "react";
import useForm from '../../Utils/UseForm';

const ChangePasswordComponent =React.forwardRef((props, ref)=> {
    
    const [passwordForm,setPasswordForm] = useState({password_current:'',password_new:'',password_confirm:''});
    const [passwordFormErrors, setFormErrors] = useState({passwordMismatch:false,passwordSame:false});
    const buildPasswordFormData = (event)=>{
        setPasswordForm({...passwordForm,[event.target.name] : event.target.value});
    }

    const { errors, handleErrors } =
        useForm(props, {
        'password_current' : ['required'],
        'password_new' : ['required'],
        'password_confirm' : ['required']
        }, ()=>{});

    const checkPasswordFields = (e)=>{
        let {password_current,password_new,password_confirm} = passwordForm;

        // logic for showing password mismatch and same password errors. 
        // Somehow, writing else condition is not triggering the error message.
        // Therefore writing as separate if statements.

        if (password_current!=='' && password_new!=='' && password_current == password_new) setFormErrors(passwordFormErrors=>({...passwordFormErrors,passwordSame:true}));

        if (password_confirm!=='' && password_new!=='' && password_new != password_confirm) setFormErrors(passwordFormErrors=>({...passwordFormErrors,passwordMismatch:true}));

        if (password_current!=='' && password_new!=='' && password_current != password_new) setFormErrors(passwordFormErrors=>({...passwordFormErrors,passwordSame:false}));

        if (password_confirm!=='' && password_new!=='' && password_new == password_confirm) setFormErrors(passwordFormErrors=>({...passwordFormErrors,passwordMismatch:false}));
        handleErrors(e) 
    }

    React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return passwordForm
        },
        getPasswordCheckResult(){
            return !passwordFormErrors.passwordSame && !passwordFormErrors.passwordMismatch? false:true
        },
        triggerErrors(){
            return handleErrors(passwordForm);
        }
    }));

return (
    <React.Fragment>
        <div className="form-fields pb-50" data-testid="password-form">
            <div className="form-group" data-testid="password-current">
                <label>Current Password</label>
                <input
                type="password"
                className="form-control"
                onChange={buildPasswordFormData}
                onBlur={checkPasswordFields}
                name="password_current"
                id="password_current"
                /> { errors.password_current? <span className="validationError">{errors.password_current}</span>:''}

            </div>
            <div className="form-group" data-testid="password-new">
                <label>New Password</label>
                <input
                type="password"
                className="form-control"
                onChange={buildPasswordFormData}
                onBlur={checkPasswordFields}
                name="password_new"
                id="password_new"
                />{ errors.password_new? <span className="validationError">{errors.password_new}</span>:''}
                {  !errors.password_new && passwordFormErrors.passwordSame &&(<span className="validationError">Cannot use current password as the new password</span>)}
            </div>
            <div className="form-group" data-testid="password-confirm">
                <label>Confirm New Password</label>
                <input
                type="password"
                className="form-control"
                onChange={buildPasswordFormData}
                onBlur={checkPasswordFields}
                name="password_confirm"
                id="password_confirm"
                />{ errors.password_confirm? <span className="validationError">{errors.password_confirm}</span>:''}
                {  !errors.password_confirm && passwordFormErrors.passwordMismatch &&(<span className="validationError">Password must be same</span>)}
            </div>
        </div>
    </React.Fragment>
    );
});

export default ChangePasswordComponent;

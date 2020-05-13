import React from 'react';
import useForm from '../../Utils/UseForm';
const PasswordRegistrationFormComponent= React.forwardRef((props, ref)=> {
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordFieldError, setPasswordFieldError] = React.useState(false);
    const [passwordConfirmFieldError, setPasswordConfirmFieldError] = React.useState(false);
    const [isChanged, setIsChanged] = React.useState('');
    const [passwordStatus, setPasswordStatus] = React.useState(false);
    let data,childFamilyData ='';
    const buildForm = (event) => {
        event.preventDefault();
        let name = event.target.name;
        setIsChanged(name)
        switch (name) {
            case 'password':
                setPassword(event.target.value);
                break;
            case 'passwordConfirm':
                setPasswordConfirm(event.target.value);
                break;
            default:
                break;
        }
    };
    const handleChange = () => {
        data = {
            passwordData: {
                password: password
            }
        };props.onSelectedChild(data);
    };
    React.useEffect(() => {
        handleChange();
    }, [isChanged]);
    React.useEffect(() => {
        passwordCheckFunction();
    }, [passwordStatus]);
    const passwordCheckFunction = () => {
        let  passwordData = {
            passwordStatus:passwordStatus
        }; props.getPasswordStatus(passwordData);
    };
    const dataToParent = () => {
        props.onSelectedChild(childFamilyData);
    };
    const { errors, handleErrors } =
        useForm(props, {
            'password' : ['required']
        }, dataToParent);
    React.useImperativeHandle(ref, () => ({
        triggerErrors(){
            handleChange();
            return handleErrors(data.passwordData);
        }}));
    const passwordCheck=()=>{
        if (password !== '' && passwordConfirm !==''&& passwordConfirm===password){
            setPasswordError(false)
            setPasswordConfirmFieldError(false)
            setPasswordStatus(true)
            setPasswordFieldError(false)
        } else if ( password === ''&& passwordConfirm ==='') {
            setPasswordError(true)
            setPasswordConfirmFieldError(true)
            setPasswordStatus(false)
            setPasswordFieldError(true)
        }else if ( password === ''){
            setPasswordError(true)
            setPasswordConfirmFieldError(false)
            setPasswordStatus(false)
            setPasswordFieldError(true)
        }else if(passwordConfirm ===''){
            setPasswordError(false)
            setPasswordConfirmFieldError(true)
            setPasswordStatus(false)
            setPasswordFieldError(true)
        }else if (password!==passwordConfirm){
            setPasswordFieldError(true)
            setPasswordError(false)
            setPasswordConfirmFieldError(false)
            setPasswordStatus(false)
        }
    }
    return (
        <div className="form-fields pt-50" data-testid="password-form">
            <div className="form-title">
                Create FreshTrak Account
            </div>
            <div className="form-text mb-2">
                Input a password to create a FreshTrak account and easily register with one click in the future.
            </div>
            <div className="form-group" >
                <label>Password</label>
                <input type="password" className="form-control" onChange={buildForm} onBlur={passwordCheck} name="password" id="password" required/>
                <div data-testid="password"> {passwordError && (
                    <span className="validationError">This field is required</span>
                )}
                </div>
            </div>
            <div className="form-group" >
                <label>Confirm Password</label>
                <input type="password" className="form-control" onChange={buildForm} onBlur={passwordCheck} name="passwordConfirm" id="passwordConfirm" />
                <div data-testid = "password-confirm"> {passwordConfirmFieldError && (
                    <span className="validationError">This field is required</span>
                )}
                </div>
            </div>
            <div data-testid="pwdSameError">
                {passwordFieldError &&(
                    <span className="validationError"  >Password must be same</span>
                )}
            </div>
        </div>
    )
});
export default PasswordRegistrationFormComponent;
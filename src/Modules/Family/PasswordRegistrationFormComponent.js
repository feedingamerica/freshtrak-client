import React from 'react';
import useForm from '../../Utils/UseForm';

const PasswordRegistrationFormComponent= React.forwardRef((props, ref)=> {

    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordFieldError, setPasswordFieldError] = React.useState(false);
    const [passwordConfirmFieldError, setPasswordConfirmFieldError] = React.useState(false);
    let data,childFamilyData ='';

    const buildForm = (event) => {
        event.preventDefault();
        let name = event.target.name;
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
                password: password,
            }
        };props.onSelectedChild(data);
    };
    React.useEffect(() => {
        handleChange();
    }, [password,passwordConfirm]);

    const dataToParent = () => {
        props.onSelectedChild(childFamilyData);
    };

    const { errors, handleErrors } =
        useForm(props, {
            'password' : ['required'],
            'passwordConfirm' : ['required'],
        }, dataToParent);

    React.useImperativeHandle(ref, () => ({
        triggerErrors(){
            handleChange();
            return handleErrors(data.passwordData);
        }}));

    const passwordCheck=()=>{

        if (password !== '' && passwordConfirm !==''&& passwordConfirm===password){
            setPasswordError(false)
        }
        else if ( password == ''){
            setPasswordError(true)
        }else if(passwordConfirm ==''){
            setPasswordError(true)
        }else if (password!=passwordConfirm){
            setPasswordError(true)
        }
    }

    return (
        <div className="form-fields pt-50">
            <div className="form-title">
                Create FresTrak Account
            </div>
            <div className="form-text mb-2">
                Input a password to create a FreshTrak account and easily register with one click in the future.
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" onChange={buildForm} onBlur={passwordCheck} name="password" id="password" required/>
                <div> {passwordFieldError && (
                    <span className="validationError"> Required</span>
                )}
                </div>
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" onChange={buildForm} onBlur={passwordCheck} name="passwordConfirm" id="passwordConfirm" required/>

                <div> {passwordConfirmFieldError && (
                    <span className="validationError">Required</span>
                )}
                </div>
            </div>

            {passwordError &&(
                <div>
                   <span className="validationError" >Password must be same </span>
                </div>
            )}
        </div>
    )
});
export default PasswordRegistrationFormComponent;

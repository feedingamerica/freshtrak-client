import React from 'react';
import useForm from '../../Utils/UseForm';

const PasswordRegistrationFormComponent= React.forwardRef((props, ref)=> {

    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [passwordFieldError, setPasswordFieldError] = React.useState(false);
    const [passwordStatus, setPasswordStatus] = React.useState(false);
    const [childFamilyData, setChildFamilyData] = React.useState({});
    let data={};

    const buildForm = (event) => {
        event.preventDefault();
        let name = event.target.name;
        switch (name) {
            case 'password':
                setPassword(event.target.value);
                break;
            case 'password_confirm':
                setPasswordConfirm(event.target.value);
                break;
            default:
                break;
        }
    };

    const buildChildData = () => {
        data = {
            passwordData: {
                password: password
            }
        };
        setChildFamilyData(data);
    };
  
    React.useEffect(() => {
        passwordCheckFunction();
    }, [passwordStatus]);

    const passwordCheckFunction = () => {
        let  passwordData = {
            passwordStatus:passwordStatus
            }; 
        props.getPasswordStatus(passwordData);
     };

    
    const { errors, handleErrors } =
        useForm(props, {
            'password' : ['required']
        }, ()=>buildChildData());

    React.useImperativeHandle(ref, () => ({
        getCurrentData(){
            return childFamilyData
        },
        triggerErrors(){
            if(!childFamilyData['passwordData']) {buildChildData()};
            return handleErrors(childFamilyData['passwordData']);
        }}));

    const passwordCheck=(e)=>{
        if (password !== '' && passwordConfirm !==''&& passwordConfirm===password){
            setPasswordStatus(true)
            setPasswordFieldError(false)
        } else if ( password === ''&& passwordConfirm ==='') {
            setPasswordStatus(false)
            setPasswordFieldError(true)
        }else if ( password === '' || passwordConfirm ===''){
            setPasswordStatus(false)
            setPasswordFieldError(true)
        }else if (password!==passwordConfirm){
            setPasswordFieldError(true)
            setPasswordStatus(false)
        }
        handleErrors(e);
    }

    return (
        <div className="form-fields pt-50">
            <div className="form-title">
                Create FreshTrak Account
            </div>
            <div className="form-text mb-2">
                Input a password to create a FreshTrak account and easily register with one click in the future.
            </div>
            <div className="form-group" data-testid="password">
                <label>Password</label>

                <input type="password" className="form-control" onChange={buildForm} onBlur={passwordCheck} name="password" id="password" required/>
                {errors.password && (
                    <span className="validationError">{errors.password}</span>
                )}
            </div>

            <div className="form-group" data-testid="password-confirm">
                <label>Confirm Password</label>
                <input type="password" className="form-control" onChange={buildForm} onBlur={passwordCheck} name="password_confirm" id="passwordConfirm" />
                 {errors.password && (
                    <span className="validationError">{errors.password}</span>
                )}  
                {!errors.password && passwordFieldError &&(
                   <span className="validationError">Password must be same</span>
                )}              
            </div>               
        </div>
    )
});
export default PasswordRegistrationFormComponent;

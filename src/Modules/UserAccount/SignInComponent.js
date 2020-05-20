/* 
* Sign in Component
*/
import React, {useState} from "react";
import useForm from '../../Utils/UseForm';
import ButtonComponent from '../General/ButtonComponent';
import {useHistory} from 'react-router-dom';

const SignInComponent = ()=> {
    const [signInData,setSignInData] = useState({username:'',password:''});
    
    let history = useHistory();

    const handleSubmit = async() => {   
        /*let isError = await handleErrors(signInData);
        if (!isError) {
            localStorage.setItem("isLoggedIn", true);
            window.location.reload();
        }*/
    };

    // binding data to state
    const buildSignInFormData = (event)=>{
        setSignInData({...signInData,[event.target.name] : event.target.value});
    }

    const { errors, handleErrors } =
        useForm({}, {
                'username' : ['required','is_address'],
                'password' : ['required']
            }, ()=>{});

    /*const handleForgotPassword = ()=>{
        console.log('basil');
    }
    const handleCancel = ()=> {
        history.push('/');
    }*/

    return (
        <div className="form-fields sign-in-form" data-testid='signin-form'>
            <div className="form-title">
                <h1>Sign In</h1>
            </div>
            <div className="mb-2">
                <div>Have you previously registered through FreshTrak?</div>
                    <div className="small-title">
                        Input your email address and the password you entered when you created
                        your account.
                    </div>
                </div>
                <div className="form-group" data-testid="username">
                    <label>Username or Email Address</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={buildSignInFormData}
                        onBlur={handleErrors}
                        name="username"
                        id="username"
                    />
                    {errors.username && (
                        <span className="validationError" >{errors.username}</span>
                    )}
                </div>
                <div className="form-group" data-testid="password">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={buildSignInFormData}
                        onBlur={handleErrors}
                        name="password"
                        id="password"
                    />
                    {errors.password && (
                        <span className="validationError" >{errors.password}</span>
                    )}
                </div>
            <div>
                <span className="pointer" onClick={()=>{}}>Forgot Password?</span>
            </div>
            <div className="button-wrap d-flex w-100 mt-3">
                <ButtonComponent type ='button' data-testid="signin" name="sign_in" dataid= 'signin' id="sign-in" value="Submit" className = 'btn custom-button flex-grow-1' onClickfunction={handleSubmit} />
                <ButtonComponent type ='button' data-testid="cancel" name="cancel" dataid= 'cancel' id="cancel" value="Cancel" className = 'btn default-button flex-grow-1 ml-2' onClickfunction={()=>{}}/>
            </div>
        </div>
    );
};
export default SignInComponent;

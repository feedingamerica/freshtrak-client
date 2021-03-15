import React, {useState} from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoginLogo from "../../Assets/img/login-logo.png";
import SignInDetails from "./SignInDetailsComponent";
import SignUpDetails from "./SignUpDetailsComponent";
import ForgotPasswordContainer from "./ForgotPassword/ForgotPasswordContainer";
import SignInConfirmComponent from "./SignInConfirmComponent";
import SignUpConfirmComponent from './SignUpConfirmComponent';
import {ErrorHandler} from "../../Utils/ErrorHandler";
import {SignUp, SignUpConfirm,ResendConfirmCode, SignIn,ConfirmSignIn} from "../../Utils/CognitoHandler";


const UserBlockContainer = (props) => {

  const [mode, setMode] = useState('form');
  const [username, setUserName] = useState('');
  const [customError,setCustomError] = useState({});
  const [user,setUser] = useState({});
  const [destinationMedium, setDestinationMedium] = useState('');
  const [mfaType, setMfaType] = useState('');
  const [dialcode,setDialCode] = useState('+91');

  const onSignUp = async (signupData) => {
    let phone_number = onPhoneNumberFormat(signupData.phonenumber);
    let params = {
        username: signupData.email,
        password: signupData.password,
        attributes: {
            email: signupData.email,
            phone_number: phone_number,
        }
     };  
     await SignUp(params).then(res => {
       let data = res.data;    
       if(res.status){
          setDestinationMedium(data.codeDeliveryDetails.Destination);
          setUserName(data.user.username);
          setMode('signupconfirm');
       } else {
          let errorValue =  ErrorHandler(data);
          setCustomError(errorValue);
       }
     })   
  }
  
  const onConfirm = async (confirmData) => {
    let code = confirmData.code;
    await SignUpConfirm(username,code).then(res => {
      let data = res.data;
      if(res.status) {
        setMode('form');
      } else {
        let errorValue =  ErrorHandler(data);
        setCustomError(errorValue);
      }
    })
  }

  const onResendConfirmCode = async ()=> {
      await ResendConfirmCode(username).then(res => {
        let data = res.data;
        if(!res.status){
          let errorValue =  ErrorHandler(data);
          setCustomError(errorValue);
        }
      })
  }
  
  const onSignIn = async (signinData) => {
    await SignIn(signinData).then(res => {
      let data = res.data;
      if(res.status){
          if (data.challengeName === 'SMS_MFA' || data.challengeName === 'SOFTWARE_TOKEN_MFA') {               
            setUser(data);
            setDestinationMedium(data.challengeParam.CODE_DELIVERY_DESTINATION);
            setMfaType(data.challengeName);
            setMode('signinconfirm');
          } else {
            localStorage.setItem('isLoggedIn', true);         
            props.handleClose();
          }
      } else {
          let errorValue =  ErrorHandler(data);
          setCustomError(errorValue);
      }
    })
  }

  const onForgotPassword = async() => {
    setMode('forgotpassword')
  }

  const onResetNewPassword = async() =>{
    setMode('form')
  }
  
  const onConfirmPhone = async (confirmCode) => {
    let code = confirmCode.code;
    await ConfirmSignIn(user,code,mfaType).then(res => {
      let data = res.data;
      if(res.status){
        localStorage.setItem('isLoggedIn', true);  
        props.handleClose();  
      } else {
        let errorValue =  ErrorHandler(data);
        setCustomError(errorValue);
      }
    })
  }

  const onPhoneNumberFormat = (phone_number) => {
    return `${dialcode}${phone_number.replace(/[-()\s]/g, '')}`;
  }
  
  const renderFrom = () => {
    switch(mode) {

            case "form" : return (<Tabs defaultActiveKey="signin" >
                                    <Tab eventKey="signin" data-test-id="signin-form" title="Sign In">
                                      <SignInDetails onSignIn={onSignIn} onForgotPassword = {onForgotPassword} customError={customError} />
                                    </Tab>
                                    <Tab eventKey="signup" data-testid="signup-form" title="Sign Up">
                                      <SignUpDetails onSignUp={onSignUp} customError={customError}/>
                                    </Tab>
                                 </Tabs>
                               )
          case  "signupconfirm" : return (<div>
                                    <SignUpConfirmComponent onConfirm={onConfirm} onResendConfirmCode ={onResendConfirmCode} destinationMedium= {destinationMedium} customError={customError}/>
                                    </div>);
          case "forgotpassword" : return (<div>
                                             <ForgotPasswordContainer onResetNewPassword={onResetNewPassword}/>
                                           </div>
                                          );

          case "signinconfirm"  : return (<div>
                                    <SignInConfirmComponent onConfirmPhone={onConfirmPhone} destinationMedium= {destinationMedium} customError={customError}/>
                                    </div>);
          default : return (<Tabs defaultActiveKey="signin" >
                                    <Tab eventKey="signin" title="Sign In">
                                      <SignInDetails onSignIn={onSignIn} onForgotPassword = {onForgotPassword} customError={customError}/>
                                    </Tab>
                                    <Tab eventKey="signup" title="Sign Up">
                                      <SignUpDetails onSignUp={onSignUp} customError={customError}/>
                                    </Tab>
                                 </Tabs>
                               )

          } 
  }
  return (
    <div>

    
      <div className="w-100 login-tab-section">
        <div className="login-logo d-flex justify-content-center">
          <img src={LoginLogo} />
        </div>   
        { 
          renderFrom()

        }
      </div>
      </div>
  );
};
export default UserBlockContainer;

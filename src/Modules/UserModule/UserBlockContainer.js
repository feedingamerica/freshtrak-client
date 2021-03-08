import React, {useState} from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import LoginLogo from "../../Assets/img/login-logo.png";
import SignInDetails from "../UserModule/SignInDetailsComponent";
import SignUpDetails from "../UserModule/SignUpDetailsComponent";
import ForgotPasswordContainer from "../UserModule/ForgotPassword/ForgotPasswordContainer";
import SignInConfirmComponent from "../UserModule/SignInConfirmComponent";

import CodeVerificationModalComponent from '../General/CodeVerificationModalComponent';
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports";
import {ErrorHandler} from "../../Utils/ErrorHandler";
Auth.configure(awsExports);

const UserBlockContainer = (props) => {
  const [mode, setMode] = useState('form');
  const [username, setUserName] = useState('');
  const [customError,setCustomError] = useState({});
  const [user,setUser] = useState({});
  const [destinationMedium, setDestinationMedium] = useState('');
  const [mfaType, setMfaType] = useState('');
  const [dialcode,setDialCode] = useState('+91');
  const onSignUp = async (signupData)=>{
    let status = false, data = {},err; 
    let phone_number = onPhoneNumberFormat(signupData.phonenumber);
    let params = {
        username: signupData.email,
        password: signupData.password,
        attributes: {
            email: signupData.email,
            phone_number: phone_number,
        }
     };      
     await Auth.signUp(params)
            .then(res => { 
                status = true; 
                data = res;
                setDestinationMedium(data.codeDeliveryDetails.Destination);
                setUserName(data.user.username);
                setMode('signupconfirm');
            })
            .catch(err => { 
               let errorValue =  ErrorHandler(err);
               setCustomError(errorValue);
            }); 
  }
  
  const onConfirm = async (confirmData)=>{
    let code = confirmData.code, status = false, data = {}; 
    await Auth.confirmSignUp(username, code)
          .then(res => {
            status = true;
            data = res;
            setMode('form');
          }).catch(err => {
            let errorValue =  ErrorHandler(err);
            setCustomError(errorValue);
          });
    
  }
  const onResendConfirmCode = async ()=>{
      let status = false, data = {}; 
      await Auth.resendSignUp(username)
          .then(res => {
            status = true;
            data = res;
            console.log(data);
          }).catch(err=>{
            let errorValue =  ErrorHandler(err);
            setCustomError(errorValue);
          });
  }
  const onSignIn = async (signinData)=> {
    let status = false, data = {}; 
    let username = signinData.username;
    let password = signinData.password;
    await Auth.signIn(username, password)
          .then(res =>{
            status = true;
            data = res;
             if (data.challengeName === 'SMS_MFA' || data.challengeName === 'SOFTWARE_TOKEN_MFA') {               
                setUser(data);
                setDestinationMedium(data.challengeParam.CODE_DELIVERY_DESTINATION);
                setMfaType(data.challengeName);
                setMode('signinconfirm');
             } else {
                localStorage.setItem('isLoggedIn', true);         
                props.handleClose();
             }
            
          }).catch(err => {
            let errorValue =  ErrorHandler(err);
            setCustomError(errorValue);
          });
  }

  const onForgotPassword = async() => {
    setMode('forgotpassword')
  }

  const onResetNewPassword = async() =>{
    setMode('form')
  }
  
  const onConfirmPhone = async (confirmCode) => {
    let code = confirmCode.code;
    let status=false,data={};

    await Auth.confirmSignIn(user,code,mfaType)
          .then(res => {
            status = true;
            data = res;
            localStorage.setItem('isLoggedIn', true);         
            props.handleClose();
          }).catch(err=>{
            let errorValue =  ErrorHandler(err);
            setCustomError(errorValue);
          });
  }
  const onPhoneNumberFormat = (phone_number) => {
    return `${dialcode}${phone_number.replace(/[-()\s]/g, '')}`;
  }
 
  const renderFrom = () => {
    switch(mode) {

            case "form" : return (<Tabs defaultActiveKey="signin" >
                                    <Tab eventKey="signin" title="Sign In">
                                      <SignInDetails onSignIn={onSignIn} onForgotPassword = {onForgotPassword} customError={customError}/>
                                    </Tab>
                                    <Tab eventKey="signup" title="Sign Up">
                                      <SignUpDetails onSignUp={onSignUp} customError={customError}/>
                                    </Tab>
                                 </Tabs>
                               )
          case  "signupconfirm" : return (<div>
                                    <CodeVerificationModalComponent onConfirm={onConfirm} onResendConfirmCode ={onResendConfirmCode} destinationMedium= {destinationMedium} customError={customError}/>
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
      <div className="w-100 login-tab-section">
        <div className="login-logo d-flex justify-content-center">
          <img src={LoginLogo} />
        </div>   
        { 
          renderFrom()

        }
      </div>
  );
};
export default UserBlockContainer;

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


import { useSelector, useDispatch } from 'react-redux';
import { selectEvent } from '../../Store/Events/eventSlice';
import {useHistory } from 'react-router-dom';
import { RENDER_URL,API_URL } from '../../Utils/Urls';
import { setLoggedIn } from '../../Store/loggedInSlice';
import SpinnerComponent from "../General/SpinnerComponent";


const UserBlockContainer = (props) => {
  const history = useHistory();
  const [mode, setMode] = useState('form');
  const [username, setUserName] = useState('');
  const [customError,setCustomError] = useState({});
  const [user,setUser] = useState({});
  const [destinationMedium, setDestinationMedium] = useState('');
  const [mfaType, setMfaType] = useState('');
  const [dialcode,setDialCode] = useState('+91');
  const event = useSelector(selectEvent);
  const [selectedEvent, setSelectedEvent] = useState(event);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const onSignUp = async (signupData) => {
    setLoading(true);
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
      setLoading(false);
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
    setLoading(true);
    let code = confirmData.code;
    let authtoken = localStorage.getItem("authToken");
    await SignUpConfirm(username,code).then(res => {
      setLoading(false);
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
    setLoading(true);
      await ResendConfirmCode(username).then(res => {
        setLoading(false);
        let data = res.data;
        if(!res.status){
          let errorValue =  ErrorHandler(data);
          setCustomError(errorValue);
        }
      })
  }
  
  const onSignIn = async (signinData) => {
    setLoading(true);
    await SignIn(signinData).then(res => {
      setLoading(false);
      let data = res.data;
      if(res.status){
          if (data.challengeName === 'SMS_MFA' || data.challengeName === 'SOFTWARE_TOKEN_MFA') {               
            setUser(data);
            setDestinationMedium(data.challengeParam.CODE_DELIVERY_DESTINATION);
            setMfaType(data.challengeName);
            setMode('signinconfirm');
          } else {
            eventCheck(data)
          }
      } else {
          let errorValue =  ErrorHandler(data);
          setCustomError(errorValue);
      }
    })
  }


  const onForgotPassword = async() => {
    setLoading(true);
    setMode('forgotpassword')
    setLoading(false);
  }

  const onResetNewPassword = async() =>{
    setLoading(true);
    setCustomError({...customError,userError : null})
    setMode('form')
    setLoading(false);
    
  }
  
  const onConfirmPhone = async (confirmCode) => {
    setLoading(true);
    let code = confirmCode.code;
    await ConfirmSignIn(user,code,mfaType).then(res => {
      setLoading(false);
      let data = res.data;
      if(res.status){
        eventCheck(user)
      } else {
        let errorValue =  ErrorHandler(data);
        setCustomError(errorValue);
      }
    })
  }

  const onPhoneNumberFormat = (phone_number) => {
    return `${dialcode}${phone_number.replace(/[-()\s]/g, '')}`;
  }
  const handleClose=()=>{
    props.handleClose()
  }

  const eventCheck = (data) => {
    setLoading(true);
    localStorage.setItem('isLoggedIn', true);  
    localStorage.setItem('userType', 0);
    dispatch(setLoggedIn(localStorage.getItem("isLoggedIn")))
    let token_value = data.signInUserSession.idToken.jwtToken;
    localStorage.setItem('authToken', token_value);
    props.handleClose();
    if(selectedEvent && selectedEvent.id){
      setLoading(false);
      history.push(`${RENDER_URL.REGISTRATION_FORM_URL}/${selectedEvent.id}`);
    }else{
      setLoading(false);
    }
            
    
  }

  const renderFrom = () => {
    switch(mode) {

            case "form" : return (<Tabs defaultActiveKey="signin" >
                                    <Tab eventKey="signin" data-testid="signin-form" title="Sign In">
                                      {isLoading && <SpinnerComponent/>}
                                      <SignInDetails handleClose={handleClose} 
                                      onSignIn={onSignIn} onForgotPassword = {onForgotPassword} 
                                      customError={customError}/>
                                    </Tab>
                                    <Tab eventKey="signup" data-testid="signup-form" title="Sign Up">
                                      {isLoading && <SpinnerComponent/>}
                                      <SignUpDetails handleClose={handleClose} onSignUp={onSignUp} customError={customError}/>
                                    </Tab>
                                 </Tabs>
                               )
          case  "signupconfirm" : return (<div>
                                    {isLoading && <SpinnerComponent/>}
                                    <SignUpConfirmComponent handleClose={handleClose} 
                                    onConfirm={onConfirm} 
                                    onResendConfirmCode ={onResendConfirmCode} 
                                    destinationMedium= {destinationMedium} 
                                    customError={customError}/>
                                    </div>);
          case "forgotpassword" : return (<div>
                                            {isLoading && <SpinnerComponent/>}
                                             <ForgotPasswordContainer 
                                             handleClose={handleClose} 
                                             onResetNewPassword={onResetNewPassword}/>
                                           </div>
                                          );

          case "signinconfirm"  : return (<div>
                                    {isLoading && <SpinnerComponent/>}
                                    <SignInConfirmComponent 
                                    handleClose={handleClose} 
                                    onConfirmPhone={onConfirmPhone} 
                                    destinationMedium= {destinationMedium}
                                     customError={customError}/>
                                    </div>);
          default : return (<Tabs defaultActiveKey="signin" >
                                    <Tab eventKey="signin" title="Sign In">
                                     {isLoading && <SpinnerComponent/>}
                                      <SignInDetails 
                                      handleClose={handleClose} 
                                      onSignIn={onSignIn} 
                                      onForgotPassword = {onForgotPassword} 
                                      customError={customError}/>
                                    </Tab>
                                    <Tab eventKey="signup" title="Sign Up">
                                      {isLoading && <SpinnerComponent/>}
                                      <SignUpDetails 
                                      handleClose={handleClose}
                                       onSignUp={onSignUp} 
                                       customError={customError}/>
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

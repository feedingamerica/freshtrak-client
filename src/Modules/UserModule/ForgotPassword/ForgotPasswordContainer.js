import React,{useState} from 'react';
import ForgotPasswordEmailForm from './ForgotPasswordEmailComponent';
import ResetPasswordFormComponent from './ResetPasswordFormComponent';
import {ErrorHandler} from "../../../Utils/ErrorHandler";
import {ForgotPassword, ResetPassword} from "../../../Utils/CognitoHandler";


const ForgotPasswordContainer = (props) => {
  const [show, setShow] = useState(false);
  const [username,setUserName] = useState('');
  const [destinationemail,setDestinationEmail] = useState('');
  const [customError,setCustomError] = useState({});

  const onSendEmail = async(user) => {
      let username = user.username;;
      await ForgotPassword(username).then(res => {
        let data = res.data;
        if(res.status){
          setUserName(username);
          setDestinationEmail(data.CodeDeliveryDetails.Destination);
          setShow(true);
        } else {
          let errorValue = ErrorHandler(data);     
          setCustomError(errorValue);
          console.log("errorValue in onSendEmail else is >>",errorValue)
        }
      });
  }

  const onResetPassword = async (resetData)=> {
    setCustomError(null);//newly added
    await ResetPassword(username,resetData).then(res=>{
      
      let data = res.data;
      if(res.status){
        props.onResetNewPassword();
        
      } else {
        let errorValue = ErrorHandler(data);     
        setCustomError(errorValue);
        console.log("errorValue in onResetPassword is >>",errorValue)
      }
    })    
  }
  return (
    <div>
        {show ?
           <ResetPasswordFormComponent onResetPassword={onResetPassword} destinationEmail= {destinationemail} customError={customError}/>:   
          <ForgotPasswordEmailForm  onSendEmail = {onSendEmail} customError={customError}/>  
        }    
    </div>
  )
}

export default ForgotPasswordContainer;
  
import React,{useState} from 'react';
import ForgotPasswordEmailForm from './ForgotPasswordEmailComponent';
import ResetPasswordFormComponent from './ResetPasswordFormComponent';
import { Auth } from 'aws-amplify';
import awsExports from "../../../aws-exports";
Auth.configure(awsExports);

const ForgotPasswordContainer = (props) => {
  const [show, setShow] = useState(false);
  const [username,setUserName] = useState('');
  const [destinationemail,setDestinationEmail] = useState('');
  const onSendEmail = (user) => {
      let username = user.username, status = false, data = {};
      Auth.forgotPassword(username)
          .then(res =>{
            status = true;
            data = res;
            setUserName(username);
            setDestinationEmail(data.CodeDeliveryDetails.Destination);
            setShow(true);
          }).catch(err => {
            status =false;
            data = err;            
          });
  }
  const onResetPassword = async (resetData)=> {
    let status = false, data = {};
    let code = resetData.code;
    let new_password = resetData.newpassword
    Auth.forgotPasswordSubmit(username, code, new_password)
          .then(res => {
            props.onResetNewPassword();
          }).catch(err => {
            status =false;
            data = err;            
          });
    
  }
  return (
    <div>
        {show ?
           <ResetPasswordFormComponent onResetPassword={onResetPassword} destinationEmail= {destinationemail}/>:   
          <ForgotPasswordEmailForm  onSendEmail = {onSendEmail}/>  
        }    
    </div>
  )
}

export default ForgotPasswordContainer;
  
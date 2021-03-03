import React,{useState} from 'react';
import ForgotPasswordEmailForm from './ForgotPasswordEmailComponent';
import ResetPasswordFormComponent from './ResetPasswordFormComponent';
const ForgotPasswordContainer = () => {
  const [show, setShow] = useState(false)
  const onSendEmail = (data) => {
      setShow(true)
  }

  return (
    <div>
        {show ?
           <ResetPasswordFormComponent/>:   
          <ForgotPasswordEmailForm  onSendEmail = {onSendEmail}/>  
        }    
    </div>
  )
}

export default ForgotPasswordContainer;
  
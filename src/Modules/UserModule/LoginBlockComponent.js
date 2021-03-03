import React, {useState} from "react";
//import { TabView, TabPanel } from "primereact/tabview";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import LoginDetails from "../UserModule/LoginDetailsComponent";
import SignUpDetails from "../UserModule/SignUpDetailsComponent"
import LoginLogo from "../../Assets/img/login-logo.png"
import CodeVerificationModalComponent from '../General/CodeVerificationModalComponent';
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports";
Auth.configure(awsExports);

const LoginBlockComponent = (props) => {
  const [showCode, setShowCode] = useState(false);
  const [username, setUserName] = useState('');
  const onSignUp = async (signupData)=>{
    let status = false, data = {}; 
   
        let params = {
            username: signupData.email,
            password: signupData.password,
            attributes: {
                email: signupData.email,
                phone_number: signupData.phonenumber,
            }
         };         
     await Auth.signUp(params)
            .then(res => { 
                status = true; 
                data = res;
                setUserName(data.user.username);
                setShowCode(true)
            })
            .catch(err => { 
                status = false;
                data = err;
                setShowCode(true)
            });   
            //return {status, data};   
  
  }
  const onConfirm = async (confirmData)=>{
    let code = confirmData.code, status = false, data = {}; 
    await Auth.confirmSignUp(username, code)
          .then(res => {
            status = true;
            data = res;
            console.log(data);
          }).catch(err=>{
            status =false;
            data = err;
            console.log('data',err);
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
            status =false;
            data = err;
            console.log('data',err);
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
            console.log(data);   
            localStorage.setItem('isLoggedIn', true);         
            props.handleClose();
          }).catch(err=>{
            status =false;
            data = err;
            console.log('data',err);
          });
  }
  return (
    <div className="w-100 login-tab-section">
      <div className="login-logo d-flex justify-content-center">
        <img src={LoginLogo} />
      </div>   
      {showCode ? <div>
           <CodeVerificationModalComponent onConfirm={onConfirm} onResendConfirmCode ={onResendConfirmCode}/>
        </div> :   
      <Tabs defaultActiveKey="signin" >
        <Tab eventKey="signin" title="Sign In">
          <LoginDetails onSignIn={onSignIn}/>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
         <SignUpDetails onSignUp={onSignUp}/>
        </Tab>
      </Tabs>
      }
    </div>
  );
};
export default LoginBlockComponent;

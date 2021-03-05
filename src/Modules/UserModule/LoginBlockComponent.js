// import React, {useState} from "react";
// //import { TabView, TabPanel } from "primereact/tabview";
// import Tabs from 'react-bootstrap/Tabs';
// import Tab from 'react-bootstrap/Tab'
// import LoginDetails from "../UserModule/loginDetailsComponent";
// import SignUpDetails from "../UserModule/SignUpDetailsComponent"
// import LoginLogo from "../../Assets/img/login-logo.png"
// import CodeVerificationModalComponent from '../General/CodeVerificationModalComponent';
// import { Auth } from 'aws-amplify';
// import awsExports from "../../aws-exports";
// Auth.configure(awsExports);
// const LoginBlockComponent = (props) => {
//   const [showCode, setShowCode] = useState(false);
//   const [username, setUserName] = useState('');
//   const onSignUp = async (signupData)=>{
//     let status = false, data = {}; 
   
//         let params = {
//             username: signupData.email,
//             password: signupData.password,
//             attributes: {
//                 email: signupData.email,
//                 phone_number: signupData.phonenumber,
//             }
//          };         
//      await Auth.signUp(params)
//             .then(res => { 
//               console.log('basil');
//                 status = true; 
//                 data = res;
//                 setUserName(data.user.username);
//                 setShowCode(true)
//             })
//             .catch(err => { 
//                 status = false;
//                 data = err;
//             });   
//             //return {status, data};   
  
//   }
//   const onConfirm = async (confirmData)=>{
//     try {
//       let code = confirmData.code
//       await Auth.confirmSignUp(username, code);
//     } catch (error) {
//         console.log('error confirming sign up', error);
//     }
//   }
//   return (
//     <div className="w-100 login-tab-section">
//       <div className="login-logo d-flex justify-content-center">
//         <img src={LoginLogo} />
//       </div>   
//       {showCode ? <div>
//            <CodeVerificationModalComponent onConfirm={onConfirm}/>
//         </div> :   
//       <Tabs defaultActiveKey="signin" >
//         <Tab eventKey="signin" title="Sign In">
//           <LoginDetails/>
//         </Tab>
//         <Tab eventKey="signup" title="Sign Up">
//           <SignUpDetails onSignUp={onSignUp}/>
//         </Tab>
//       </Tabs>
//       }
//     </div>
//   );
// };
// export default LoginBlockComponent;

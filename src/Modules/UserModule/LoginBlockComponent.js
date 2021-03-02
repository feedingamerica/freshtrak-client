import React from "react";
//import { TabView, TabPanel } from "primereact/tabview";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import LoginDetails from "../UserModule/loginDetailsComponent";
import SignUpDetails from "../UserModule/SignUpDetailsComponent"

const LoginBlockComponent = () => {
  return (
    <div className="w-100">
      <Tabs defaultActiveKey="signin" >
        <Tab eventKey="signin" title="Sign In">
          <LoginDetails/>
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <SignUpDetails/>
        </Tab>
      </Tabs>
    </div>
  );
};
export default LoginBlockComponent;

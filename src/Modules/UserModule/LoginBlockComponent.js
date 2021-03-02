import React from "react";
//import { TabView, TabPanel } from "primereact/tabview";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import LoginDetails from "../UserModule/loginDetailsComponent";
import SignUpDetails from "../UserModule/SignUpDetailsComponent"
import LoginLogo from "../../Assets/img/login-logo.png"

const LoginBlockComponent = () => {
  return (
    <div className="w-100 login-tab-section">
      <div className="login-logo d-flex justify-content-center">
        <img src={LoginLogo} />
      </div>
      {/* <TabView>
        <TabPanel header="Log In">
          <LoginDetails/>
        </TabPanel>
        <TabPanel header="Sign Up">
          <SignUpDetails/>
        </TabPanel>
      </TabView> */}
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

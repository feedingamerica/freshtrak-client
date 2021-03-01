import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import LoginDetails from "../UserModule/loginDetailsComponent";
import SignUpDetails from "../UserModule/SignUpDetailsComponent"

const LoginBlockComponent = () => {
  return (
    <div className="w-100">
      <TabView>
        <TabPanel header="Log In">
          <LoginDetails/>
        </TabPanel>
        <TabPanel header="Sign Up">
          <SignUpDetails/>
        </TabPanel>
      </TabView>
    </div>
  );
};
export default LoginBlockComponent;

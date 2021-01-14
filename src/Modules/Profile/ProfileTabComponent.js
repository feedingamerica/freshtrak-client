import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import TabContainer from "react-bootstrap/TabContainer";
import SummaryTabComponent from "../Profile/SummaryTabComponent"
import MemoryTabComponent from "../Profile/MemoryTabComponent"
import AccountTabComponent from "../Profile/AccountTabComponent"
const ProfileTabComponent = () => {
  return (
    <>
      <Tabs defaultActiveKey="summary">
        <Tab eventKey="summary" title="Summary">
          <TabContainer>
            <SummaryTabComponent/>
          </TabContainer>
        </Tab>
        <Tab eventKey="messages" title="Messages">
          <TabContainer>
            <MemoryTabComponent/>
          </TabContainer>
        </Tab>
        <Tab eventKey="account" title="Account">
          <TabContainer>
            <AccountTabComponent/>
          </TabContainer>
        </Tab>
      </Tabs>
    </>
  );
};

export default ProfileTabComponent;

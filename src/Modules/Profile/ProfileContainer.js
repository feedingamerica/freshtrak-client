import React from "react";
import ProfileComponent from "../Profile/ProfileComponent";
import ProfileTabComponent from "../Profile/ProfileTabComponent";
import TakeTheAssessmentComponent from "../General/TakeTheAssessmentComponent";

const ProfileContainer = () => {
  return (
    <div>
      <div className="container pt-100 pb-50">
      <ProfileComponent />
    </div>
    <div className="profile-tabs-wrapper">
      <ProfileTabComponent/>
    </div>
    <div className="assessment-section">
      <TakeTheAssessmentComponent/>
    </div>
    </div>
  );
};
export default ProfileContainer;

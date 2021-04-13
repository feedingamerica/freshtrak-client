import React from 'react';
import YourInformationContainer from '../Profile/YourInformation/YourInformationContainer'
import HouseHoldMembersContainer from '../Profile/HouseHoldMembersContainer'

const AccountTabComponent = (props) => {
  return(
    <div className="container">
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-12">
          <h3 className="section-title font-weight-bold mb-3">Your Information</h3>
          <YourInformationContainer onRefresh={()=>props.onRefresh()}/>
        </div>
        <div className="col-xl-6 col-lg-6 col-12">
        <h3 className="section-title font-weight-bold mb-3">Household Members</h3>
          <HouseHoldMembersContainer/>
        </div>
      </div>
    </div>
  )
}
export default AccountTabComponent
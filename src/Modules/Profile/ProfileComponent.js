import React from 'react';

const ProfileComponent = (props) =>{

  const toTitleCase =(str)=> 
  {
     if(str) return str.split(/\s+/).map( s => s.charAt( 0 ).toUpperCase() + s.substring(1).toLowerCase() ).join( " " );
  }

  return(
    <div className="d-flex flex-column align-items-center pt-4 profile-page-wrapper">
      <div className="profile-initial-wrapper">
          <div className="profile-initial">{props && props.data && props.data.first_name && props.data.first_name.charAt(0)}{props.data.last_name.charAt(0)}</div>
      </div>
      <div className="profile-name font-weight-bold mt-2 pb-1">{props.data.first_name ? toTitleCase(props.data.first_name) : ""} {props.data.middle_name ? toTitleCase(props.data.middle_name): ""} {props.data.last_name ? toTitleCase(props.data.last_name) : ""}</div>
      <div className="profile-role">Head of Household</div>
    </div>
  )
}
export default ProfileComponent;
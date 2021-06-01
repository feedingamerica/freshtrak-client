import React from "react";
import editIcon from "../../../Assets/img/edit.png";
import moment from 'moment';

const InformationComponent = (props) => {
  const toTitleCase =(str)=> 
  {
     if(str) return str.split(/\s+/).map( s => s.charAt( 0 ).toUpperCase() + s.substring(1).toLowerCase() ).join( " " );
  }

  const decodeRaceAndEthnicity=(code)=>{
        switch(code){
        case "W" : return "White";
        case "HLS" : return "Hispanic, Latino, or Spanish";
        case "BAA" : return "Black or African American";
        case "A" : return "Asian";
        case "AIAN" : return "American Indian or Alaska Native";
        case "MENA" : return "Middle Eastern or North African";
        case "NHOP" : return "Native Hawaiian or Other Pacific Islander";
        case "OTHER" : return "Some other race or ethnicity";
        case "DK" : return "Don’t know";
        case "PNTA" : return "Prefer Not To Answer";
        case "DA" : return "Didn't Ask";
        default:return null;


        }
          }

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Information</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img alt="editicon" src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50">{props && props.data && props.data.first_name ? toTitleCase(props.data.first_name) : ""} {props && props.data && props.data.middle_name ? toTitleCase(props.data.middle_name) : ""} {props && props.data && props.data.last_name ? toTitleCase(props.data.last_name): ""}</div>
      </div>
      <div className="d-flex">
        
       { props && props.data && props.data.dob ? <div className="w-50">
          {props.data.dob}, {moment().diff(props.data.dob, 'years',false)}
          </div>:null}

        <div></div>
      </div>
      <div className="d-flex">
        {props && props.data && props.data.race ? <div className="w-50">{decodeRaceAndEthnicity(props.data.race)}</div> : null}
        <div></div>
      </div>
      <div className="d-flex">
        {props && props.data && props.data.ethnicity ? <div className="w-50">{decodeRaceAndEthnicity(props.data.ethnicity)}</div> : null}
        <div></div>
      </div>
      <div className="d-flex">
        {props && props.data && props.data.gender ? <div className="w-50">{props.data.gender}</div> : null}
        <div></div>
      </div>
    </div>
  );
};
export default InformationComponent;

import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const LanguagePreferenceComponent = () =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Language Preference</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} onClick={()=>console.log("lang pref clicked")}/>
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>English</div>
      </div>
      
    </div>
  )
}
export default LanguagePreferenceComponent;
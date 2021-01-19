import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const AddressComponent = () =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Address</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} />
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>1223 Cincinnati Rd.</div>
        <div>Unit 304</div>
        <div>Hilliard, Ohio 43026</div>
      </div>
      
    </div>
  )
}
export default AddressComponent;
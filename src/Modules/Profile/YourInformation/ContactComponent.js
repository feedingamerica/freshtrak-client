import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const ContactComponent = () =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Contact</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} />
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>jneeley@gmail.com (preferred)</div>
        <div>614-123-4567</div>
      </div>
      
    </div>
  )
}
export default ContactComponent;
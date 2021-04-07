import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const ContactComponent = (props) =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Contact</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>{props.data.email}</div>
        <div>{props.data.phone}</div>
      </div>
      
    </div>
  )
}
export default ContactComponent;
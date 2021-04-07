import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const AddressComponent = (props) =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Address</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>{props.data.address1}</div>
        {props.data.address2 !== null ? <div>{props.data.address2}</div> : null}
        <div>{props.data.city}</div>
        <div>{props.data.state}, {props.data.zipcode}</div>
      </div>
      
    </div>
  )
}
export default AddressComponent;
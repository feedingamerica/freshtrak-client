import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const AddressComponent = (props) =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Address</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img alt="editicon" src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        {props && props.data && props.data.line_1 ? <div>{props.data.line_1}</div>: null }
        {props && props.data && props.data.line_2 !== null ? <div>{props.data.line_2}</div> : null}
        {props && props.data && props.data.city ? <div>{props.data.city}</div>: null}
        {props && props.data && props.data.state && props.data.zip_code ? <div>{props.data.state}, {props.data.zip_code}</div>:null}
      </div>
      
    </div>
  )
}
export default AddressComponent;
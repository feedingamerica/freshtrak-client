import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const EmailComponent = (props) =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Email</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img alt="editicon" src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>

      {props.emails.map((value, index) =>{
      return <div key={index} className="d-flex flex-column"> 
      {value.email ?<div>{value.email}</div> : null}
      </div>}
      )
      }
      
      {/* 
      <div className="d-flex flex-column">
        {props && props.data && props.data.email ? <div>{props.data.email}</div> : null}
      </div>
       */}
    </div>
  )
}
export default EmailComponent;
import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const VehiclesComponent = (props) =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Vehicles</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>{props.data.vehicle_number == "" ? "N/A" : props.data.vehicle_number}</div>
      </div>
      
    </div>
  )
}
export default VehiclesComponent;
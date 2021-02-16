import React from 'react';
import editIcon from "../../../Assets/img/edit.png";

const VehiclesComponent = () =>{
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Vehicles</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} onClick={()=>console.log("vehicle clicked")}/>
          </span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>N/A</div>
      </div>
      
    </div>
  )
}
export default VehiclesComponent;
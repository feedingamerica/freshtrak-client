import React from "react";
import editIcon from "../../../Assets/img/edit.png";
import { useForm } from 'react-hook-form';
import { propTypes } from "react-bootstrap/esm/Image";

const InformationComponent = (props) => {
  console.log("props in info comp is>>",props)
  return (
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Information</div>
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>
      <div className="d-flex">
        <div className="w-50">Julie Neeley</div>
      </div>
      <div className="d-flex">
        <div className="w-50">Date of Birth Age</div>
        <div></div>
      </div>
      <div className="d-flex">
        <div className="w-50">Race</div>
        <div></div>
      </div>
      <div className="d-flex">
        <div className="w-50">Ethnicity</div>
        <div></div>
      </div>
      <div className="d-flex">
        <div className="w-50">Gender</div>
        <div></div>
      </div>
    </div>
  );
};
export default InformationComponent;

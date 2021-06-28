import React from 'react';
//import React,{ useState } from 'react';
import editIcon from "../../../Assets/img/edit.png";

const PhoneComponent = (props) =>{
//   const [checked, setChecked] = useState(false);
 
//   const setCheck =()=>{
//   setChecked(!checked)
//  }
  return(
    <div className="card p-3 mb-3">
      <div className="d-flex">
        <div className="card-title flex-grow-1">Phone</div>
        {/* <div className="card-title flex-grow-1">
        <input type="checkbox"
          id="checkbox"
          value={checked}
          checked={checked}
          onChange={(e)=>setCheck(e)}
          name="checkbox" 
          />
        </div> */}
                                    
        <div className="edit-icon ml-1">
          <span className="edit-icon">
            <img alt="editicon" src={editIcon} onClick={()=>props.onEditClick()}/>
          </span>
        </div>
      </div>

      {props && props.phones && props.phones.map((value, index) =>{
      return <div key={index} className="d-flex mb-2"> 
      {value.phone ?<div>{value.phone}</div> : null}
      {value.is_primary ?<span className="badge badge-success ml-1">Primary</span> : null}
      </div> }
      )
      }
         
       
      {/* {!checked && <div  className="d-flex flex-column"> 
      {props && props.data && props.data.phone ?<div>{props.data.phone}</div> : null}
      </div>
       } */}
    </div>
  )
}
export default PhoneComponent;
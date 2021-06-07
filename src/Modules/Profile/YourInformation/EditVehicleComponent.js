import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { API_URL } from '../../../Utils/Urls';
import axios from 'axios';


const EditVehicleComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [vehicle, setVehicle] = useState(null)

  useEffect(()=>{
    if (vehicle == null ) {
      setVehicleDetails()
    }
  })

  const setVehicleDetails=()=>{
    let VehicleDetails = { ...props.vehicleData }
    setVehicle(VehicleDetails.vehicle_number)
  }




  const onSubmit = (data) => {
    props.tabClose()
    updateVehicleData(data)
  }

  const updateVehicleData = async (data) =>{
    let param = {"user":{license_plate : data.vehicle}}
    const authToken = localStorage.getItem('authToken');
      try {
        await axios.put(API_URL.UPDATE_INFORMATION, param,
          { headers: { Authorization: `${authToken}` } }
        );
        props.refreshMainTab()
      } catch (e) {
        console.log("error occured >",e)
        
  }
}



  return (
    
    <div> <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">



        </div>


              <div className="form-group">
                  <input
                    type="vehicle"
                    className= {`form-control ${errors.vehicle && 'invalid'}`}
                    name="vehicle"
                    id="vehicle"
                    value={vehicle ? vehicle : ''}
                    onChange={(e)=>setVehicle(e.target.value)}
                    ref={register({ required: true })}
                  />
                  {errors.vehicle && <span className="text-danger">This field is required</span>}
                </div>

        <div>
            <button
                value="save"
                type="submit"
                className="btn complete-button w-100"
                name="save"
                data-testid="save"
            >Save</button>
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose}>Cancel</span>
        </div>
    </form></div>)

}

export default EditVehicleComponent;
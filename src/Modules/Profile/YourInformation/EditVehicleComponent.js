import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { API_URL } from '../../../Utils/Urls';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../../Store/userSlice';
import SpinnerComponent from '../../General/SpinnerComponent';


const EditVehicleComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const dispatch = useDispatch();

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
    setLoading(true)
    updateVehicleData(data)
  }

  const updateVehicleData = async (data) =>{
    let param = {"user":{license_plate : data.vehicle}}
    let updatedUser = {
      ...user,
      license_plate : data.vehicle
  }

    const authToken = localStorage.getItem('authToken');
      try {
        await axios.put(API_URL.UPDATE_INFORMATION, param,
          { headers: { Authorization: `${authToken}` } }
        );
        setUser(updatedUser);
        dispatch(setCurrentUser(updatedUser));
        props.refreshMainTab()
        setLoading(false)
        props.tabClose()
      } catch (e) {
        setLoading(false)
        props.tabClose()
        
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
        <div className="mt-3">
        {isLoading && <SpinnerComponent />}
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose}>Cancel</span>
        </div>
    </form></div>)

}

export default EditVehicleComponent;
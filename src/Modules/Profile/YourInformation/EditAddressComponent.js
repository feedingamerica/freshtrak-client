
import React, { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from "../../General/AddressComponent";
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
import SpinnerComponent from '../../General/SpinnerComponent';
import { setCurrentUser,selectUser } from '../../../Store/userSlice';
import { useSelector, useDispatch } from 'react-redux';


const EditAddressComponent = (props) => {
    const { register, handleSubmit, errors, setValue, watch } = useForm();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [address, setAddress] = useState({});
    const currentUser = useSelector(selectUser);
    const [user, setUser] = useState(currentUser);

    useEffect(() => {
        if(address == null || ((address !== undefined && address!== null) && 
         (Object.keys(address).length === 0))) {
          getAddressDetails()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[address])

      const getAddressDetails=()=>{
        let data = {...props.addressData};
        setAddress(data)
        setUser(data)
      }


    const onSubmit = (data) => {
        updateAddress(data,address.id)
    }
    const updateAddress=async(data,id)=>{
        setLoading(true)
        const {UPDATE_ADDRESS}= API_URL;
        let URL = `${UPDATE_ADDRESS}/${id}`
        let param = {
            "address" : {
                line_1 : data.line_1,
                line_2 : data.line_2,
                city : data.city,
                state : data.state_code,
                zip_code : data.zip_code
            }
            
          }
          let updatedUser = {
                ...user,
                id: data.id,
                line_1 : data.line_1,
                line_2 : data.line_2,
                city : data.city,
                state : data.state_code,
                zip_code : data.zip_code
            
          }

          const authToken = localStorage.getItem('authToken');
        try {
            //API_URL.UPDATE_INFORMATION
          await axios.post(URL, param,
            { headers: { Authorization: `${authToken}` } }
          );
          setLoading(false)
          dispatch(setCurrentUser(updatedUser));
          props.refreshMainTab()
          props.tabClose()
        } catch (e) {
        setLoading(false)
        props.tabClose()
    }
    }


    return (<div> <form onSubmit={handleSubmit(onSubmit)}>
        <AddressComponent
            register={register}
            errors={errors}
            addressData={props.addressData}
            //states={props.contactFormData.states}
            setValue={setValue}
            watch={watch}
            //callback={()=>}
        />
        <div>
            <button
                value="save"
                type="submit"
                className="btn complete-button w-100"
                name="save"
            >Save</button>
        </div>
        <div className="mt-3 mb-3">
        {isLoading && <SpinnerComponent></SpinnerComponent>}
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose} >Cancel</span>
        </div>
    </form></div>)
}
export default EditAddressComponent

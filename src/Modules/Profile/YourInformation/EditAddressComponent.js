
import React from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from "../../General/AddressComponent";
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
const EditAddressComponent = (props) => {

    const { register, handleSubmit, errors, setValue, watch } = useForm();

    const onSubmit = (data) => {
        props.tabClose()
        updateAddress(data)
    }
    const updateAddress=async(data)=>{
        let param = {
            "user" : {
                address_line_1 : data.address_line_1,
                address_line_2 : data.address_line_2,
                city : data.city,
                state : data.state_code,
                zip_code : data.zip_code
            }
            
          }

          const authToken = localStorage.getItem('authToken');
        try {
          await axios.put(API_URL.UPDATE_INFORMATION, param,
            { headers: { Authorization: `${authToken}` } }
          );
          props.refreshMainTab()
        } catch (e) {
          console.log("error occured IN EDIT ADDRESS >",e)
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
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose} >Cancel</span>
        </div>
    </form></div>)
}
export default EditAddressComponent

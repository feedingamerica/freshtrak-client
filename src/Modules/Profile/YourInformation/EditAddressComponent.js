
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from "../../General/AddressComponent";
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
import SpinnerComponent from '../../General/SpinnerComponent';


const EditAddressComponent = (props) => {
    const { register, handleSubmit, errors, setValue, watch } = useForm();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = (data) => {
        updateAddress(data)
    }
    const updateAddress=async(data)=>{
        setLoading(true)
        const {UPDATE_ADDRESS}= API_URL;
        let param = {
            "address" : {
                line_1 : data.line_1,
                line_2 : data.line_2,
                city : data.city,
                state : data.state_code,
                zip_code : data.zip_code
            }
            
          }

          const authToken = localStorage.getItem('authToken');
        try {
            //API_URL.UPDATE_INFORMATION
          await axios.post(UPDATE_ADDRESS, param,
            { headers: { Authorization: `${authToken}` } }
          );
          setLoading(false)
          props.refreshMainTab()
          props.tabClose()
        } catch (e) {
        setLoading(false)
        props.tabClose()
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
        <div className="mt-3 mb-3">
        {isLoading && <SpinnerComponent></SpinnerComponent>}
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose} >Cancel</span>
        </div>
    </form></div>)
}
export default EditAddressComponent

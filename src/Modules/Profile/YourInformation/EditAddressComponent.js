
import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from "../../General/AddressComponent";
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../../Store/userSlice';
import SpinnerComponent from '../../General/SpinnerComponent';


const EditAddressComponent = (props) => {

    const { register, handleSubmit, errors, setValue, watch } = useForm();
    const [isLoading, setLoading] = useState(false);
    const currentUser = useSelector(selectUser);
    const [user, setUser] = useState(currentUser);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        updateAddress(data)
    }
    const updateAddress = async(data)=>{
        setLoading(true)
        let param = {
            "user" : {
                address_line_1 : data.address_line_1,
                address_line_2 : data.address_line_2,
                city : data.city,
                state : data.state_code,
                zip_code : data.zip_code
            }
            
          }
          let updatedUser = {
                ...user,
                address_line_1 : data.address_line_1,
                address_line_2 : data.address_line_2,
                city : data.city,
                state : data.state_code,
                zip_code : data.zip_code

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
          console.log("error occured IN EDIT ADDRESS >",e)
    }
    }


    return (<div> 
        
        <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mt-3">
        {isLoading && <SpinnerComponent />}
        </div>
        
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose} >Cancel</span>
        </div>
    </form></div>)
}
export default EditAddressComponent

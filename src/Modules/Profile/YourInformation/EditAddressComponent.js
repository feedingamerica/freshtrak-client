
import React from 'react';
import { useForm } from "react-hook-form";
import AddressComponent from "../../General/AddressComponent";
const EditAddressComponent = (props) => {

    const { register, handleSubmit, errors, setValue, watch } = useForm();

    const onSubmit = (data) => {
        console.log("close clicked")
        // let saveParams = {
        //     familyAddressData: {
        //         ...data
        //     }
        // }
        // saveContactAddress({
        //     saveParams,
        //     family_id: props.family_id
        // }).then(res => {
        //     if (res.data.content) {
        //         props.tabClose()
        //         props.loadProfileData(props.resetData);
        //     }
        // }).catch(er => console.log(er))
    }


    return (<div> <form onSubmit={handleSubmit(onSubmit)}>
        <AddressComponent
            register={register}
            errors={errors}
            addressData={props.addressData}
            //states={props.contactFormData.states}
            setValue={setValue}
            watch={watch}
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

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import PhoneComponent from '../../General/PhoneComponent';
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';


const EditContactComponent = (props) => {
  const { register, handleSubmit, errors,setValue,watch } = useForm();
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)

  useEffect(()=>{
    if (email == null && phone == null) {
      setContactDetails()
    }
  })

  const setContactDetails=()=>{
    let ContactDetails = { ...props.contactData }
    setEmail(ContactDetails.email)
    setPhone(ContactDetails.phone)
  }




  const onSubmit = (data) => {
    props.tabClose()
    postData(data)
  }

  const postData = async (data) =>{
    let param = {"user":
    {
      email : (data.email== null || data.email== "" || data.email== undefined ? email : data.email),
      phone : (data.phone == null || data.phone== "" || data.phone== undefined ? phone : data.phone)
    }
  }
    const authToken = localStorage.getItem('authToken');
    try {
      const resp = await axios.put(API_URL.UPDATE_INFORMATION, param,
        { headers: { Authorization: `${authToken}` } }
      );
      props.refreshMainTab()
    } catch (e) {
}
}

  const onPhoneChange = (e) => {
    const number = e.target.value;
    let phoneNumber = number.replace(/[^0-9]/ig, "");
    if (phoneNumber.length > 10) {
        phoneNumber = phoneNumber.substring(0, 10)
        const num = `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3, 6)}-${phoneNumber.substring(6, phoneNumber.length)}`;
        setPhone(num)
    }
    else {
        setPhone(e.target.value)
    }
}
  return (
    
    <div> <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">



        </div>


              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className= {`form-control ${errors.email && 'invalid'}`}
                    name="email"
                    id="email"
                    value={email ? email : ""}
                    onChange={(e)=>setEmail(e.target.value)}
                    ref={register({ required: true })}
                  />
                  <small className="text-muted">
                    No Email? <a href="https://support.google.com/mail/answer/56256" target="_blank" rel="noopener noreferrer">Get one free from Google.</a>
                  </small><br />
                  {errors.email && <span className="text-danger">This field is required</span>}
                </div>







       

        <div className="form-group">
            <label htmlFor="phone">Phone Number (Mobile Preferred)</label>
            <PhoneComponent
              type="text"
              className= {`form-control ${errors.phone && 'invalid'}`}
              name="phone"
              placeholder="(xxx) xxx-xxxx"
              id="phone"
              value={phone}
              onChange={(e)=>onPhoneChange(e)}
              register={register}
            />
            {/* {errors.phone && (
              <span className="text-danger">
                This field is required. If you have no phone check "No Phone
                Available".
              </span>
            )} */}
          </div>

        <div>
            <button
                value="save"
                type="submit"
                className="btn complete-button w-100"
                name="save"
            >Save</button>
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose}>Cancel</span>
        </div>
    </form></div>)

}

export default EditContactComponent;
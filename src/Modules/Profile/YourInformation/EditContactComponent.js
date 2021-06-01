import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import PhoneComponent from '../../General/PhoneComponent';
import axios from 'axios';
import { API_URL } from '../../../Utils/Urls';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrentUser, selectUser } from '../../../Store/userSlice';
import SpinnerComponent from '../../General/SpinnerComponent';


const EditContactComponent = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const currentUser = useSelector(selectUser);
  const [user, setUser] = useState(currentUser);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
    setLoading(true)
    postData(data)
  }

  const postData = async (data) =>{
    let param = {"user":
    {
      email : (data.email ? data.email: email),
      phone : (data.phone ? data.phone : phone)
    }
  }
  let updatedUser = {
    ...user,
    email : (data.email ? data.email: email),
    phone : (data.phone ? data.phone : phone)
    

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
        <div className="mt-3">
        {isLoading && <SpinnerComponent />}
        </div>
        <div className="mt-3 text-center">
            <span className="text-purple font-weight-bold" onClick={props.tabClose}>Cancel</span>
        </div>
    </form></div>)

}

export default EditContactComponent;